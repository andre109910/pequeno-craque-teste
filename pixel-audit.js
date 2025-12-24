#!/usr/bin/env node

/**
 * Pixel Audit - varre o projeto e aponta possíveis causas de eventos duplicados
 * Uso:
 *   node pixel-audit.js
 *   node pixel-audit.js --path .
 */

const fs = require("fs");
const path = require("path");

const argv = process.argv.slice(2);
const rootArgIndex = argv.indexOf("--path");
const ROOT = rootArgIndex >= 0 ? (argv[rootArgIndex + 1] || ".") : ".";

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  ".vercel",
  ".turbo",
  ".cache",
  "out",
  "coverage",
]);

const EXT_ALLOW = new Set([
  ".js", ".jsx", ".ts", ".tsx",
  ".html", ".htm", ".css",
  ".json", ".md",
  ".vue", ".svelte",
]);

const PATTERNS = [
  { name: "FBQ base / calls", re: /\bfbq\s*\(/g },
  { name: "InitiateCheckout", re: /InitiateCheckout/g },
  { name: "Purchase", re: /\bPurchase\b/g },
  { name: "Meta Pixel loader (fbevents.js)", re: /fbevents\.js/g },
  { name: "Facebook tracking endpoint (/tr)", re: /facebook\.com\/tr/g },
  { name: "GTM snippet", re: /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]+/g },
  { name: "UTMify", re: /utmify\.com\.br|cdn\.utmify\.com\.br|pixelId\s*=|window\.pixelId/g },
  { name: "EventSetupTool / Meta tool", re: /event_setup_tool|eventSetupTool|fb_event_setup/g },
  { name: "AddEventListener click", re: /addEventListener\s*\(\s*["']click["']/g },
  { name: "onClick handler", re: /\bonClick\b/g },
  { name: "useEffect", re: /\buseEffect\b/g },
];

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return EXT_ALLOW.has(ext);
}

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!IGNORE_DIRS.has(e.name)) walk(full, out);
    } else {
      if (isTextFile(full)) out.push(full);
    }
  }
  return out;
}

function readLinesSafe(fp) {
  try {
    const buf = fs.readFileSync(fp);
    // se tiver muito binário, pula
    const text = buf.toString("utf8");
    if (text.includes("\u0000")) return null;
    return text.split(/\r?\n/);
  } catch {
    return null;
  }
}

function highlight(line, idx, len) {
  const start = Math.max(0, idx - 40);
  const end = Math.min(line.length, idx + len + 40);
  const snippet = line.slice(start, end);
  return snippet.replace(/\t/g, "  ");
}

function main() {
  const absRoot = path.resolve(process.cwd(), ROOT);
  if (!fs.existsSync(absRoot)) {
    console.error(`❌ Pasta não encontrada: ${absRoot}`);
    process.exit(1);
  }

  const files = walk(absRoot);
  console.log(`🔎 Pixel Audit: varrendo ${files.length} arquivos em: ${absRoot}\n`);

  const findings = [];
  const pixelIds = new Map(); // pixelId -> occurrences

  for (const fp of files) {
    const lines = readLinesSafe(fp);
    if (!lines) continue;

    // caça pixelId numérico (Meta Pixel ID geralmente 15-16+ dígitos)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const m = line.match(/\b(\d{12,20})\b/); // heurística
      if (m && /pixel|fb|meta|fbevents|utmify/i.test(line)) {
        const id = m[1];
        if (!pixelIds.has(id)) pixelIds.set(id, []);
        pixelIds.get(id).push({ fp, line: i + 1, text: line.trim() });
      }
    }

    for (const p of PATTERNS) {
      let match;
      while ((match = p.re.exec(lines.join("\n"))) !== null) {
        // converter índice global para linha/col
        const all = lines.join("\n");
        const before = all.slice(0, match.index);
        const lineNo = before.split("\n").length; // 1-based
        const col = match.index - before.lastIndexOf("\n") - 1;

        const lineText = lines[lineNo - 1] ?? "";
        findings.push({
          type: p.name,
          fp,
          line: lineNo,
          col,
          snippet: highlight(lineText, Math.max(0, col), match[0].length),
        });
      }
    }
  }

  // imprime achados por tipo
  const byType = new Map();
  for (const f of findings) {
    if (!byType.has(f.type)) byType.set(f.type, []);
    byType.get(f.type).push(f);
  }

  for (const [type, list] of byType.entries()) {
    console.log(`\n=== ${type} (${list.length}) ===`);
    // limita spam, mas mostra bastante
    const show = list.slice(0, 80);
    for (const f of show) {
      const rel = path.relative(absRoot, f.fp);
      console.log(`- ${rel}:${f.line}:${f.col}  ${f.snippet}`);
    }
    if (list.length > show.length) {
      console.log(`... +${list.length - show.length} ocorrências (muito arquivo)`);
    }
  }

  // suspeita de duplicidade do mesmo Pixel ID em múltiplos lugares
  console.log(`\n\n=== Possíveis Pixel IDs encontrados (heurística) ===`);
  const idsSorted = [...pixelIds.entries()].sort((a, b) => b[1].length - a[1].length);
  if (idsSorted.length === 0) {
    console.log("Nenhum pixelId óbvio encontrado por heurística.");
  } else {
    for (const [id, occ] of idsSorted.slice(0, 10)) {
      console.log(`\nPixelID ${id} → ${occ.length} ocorrência(s)`);
      for (const o of occ.slice(0, 10)) {
        const rel = path.relative(absRoot, o.fp);
        console.log(`  - ${o.fp}:${o.line}  ${o.text}`);
      }
      if (occ.length > 10) console.log(`  ... +${occ.length - 10} ocorrência(s)`);
    }
  }

  console.log(`\n✅ Fim. Próximo passo: me mande o bloco "InitiateCheckout" e os arquivos onde aparece fbq('track', ...)`);
}

main();

