import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const ASSETS_DIR = './src/assets';

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size / 1024; // KB
}

async function convertToWebP(inputPath) {
  try {
    const { name, ext } = parse(inputPath);
    
    // Pular se não for PNG
    if (ext.toLowerCase() !== '.png') {
      return null;
    }
    
    const outputPath = join(ASSETS_DIR, `${name}.webp`);
    
    // Pular se WebP já existir
    if (existsSync(outputPath)) {
      console.log(`⏭️  ${name}.webp já existe`);
      return null;
    }
    
    const originalSize = await getFileSize(inputPath);
    
    // Converter para WebP com alta qualidade
    await sharp(inputPath)
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);
    
    const newSize = await getFileSize(outputPath);
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${name}.png → ${name}.webp`);
    console.log(`  ${originalSize.toFixed(1)} KB → ${newSize.toFixed(1)} KB (${reduction}% redução)`);
    
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`✗ Erro ao converter ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Convertendo imagens PNG para WebP...\n');
  
  const files = await readdir(ASSETS_DIR);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));
  
  let totalOriginal = 0;
  let totalNew = 0;
  let converted = 0;
  
  for (const file of pngFiles) {
    const inputPath = join(ASSETS_DIR, file);
    const result = await convertToWebP(inputPath);
    
    if (result) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      converted++;
    }
    
    console.log('');
  }
  
  if (converted > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Total: ${totalOriginal.toFixed(1)} KB → ${totalNew.toFixed(1)} KB`);
    console.log(`💾 Economia: ${(totalOriginal - totalNew).toFixed(1)} KB (${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)}%)`);
    console.log(`📁 ${converted} imagens convertidas`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
  
  console.log('\n✅ Conversão concluída!');
}

main().catch(console.error);

