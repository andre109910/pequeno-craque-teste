import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const ASSETS_DIR = './src/assets';
const BACKUP_DIR = './src/assets/backup';

// Imagens grandes que precisam ser comprimidas
const LARGE_IMAGES = [
  'pai-filho-quintal.png',
  'apoio-pai-filho.png',
  'pai-arquibancada.png',
  'treino-quintal.png'
];

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size / (1024 * 1024); // MB
}

async function optimizeImage(inputPath) {
  try {
    const originalSize = await getFileSize(inputPath);
    const tempPath = inputPath + '.tmp';
    
    // Comprimir PNG mantendo qualidade visual
    await sharp(inputPath)
      .png({
        quality: 85,
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .resize(null, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFile(tempPath);
    
    // Substituir original pelo otimizado
    const { rename } = await import('fs/promises');
    await rename(tempPath, inputPath);
    
    const newSize = await getFileSize(inputPath);
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${inputPath.split(/[/\\]/).pop()}`);
    console.log(`  ${originalSize.toFixed(2)} MB → ${newSize.toFixed(2)} MB (${reduction}% redução)`);
    
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`✗ Erro ao comprimir ${inputPath}:`, error.message);
    // Limpar arquivo temporário se existir
    const { unlink } = await import('fs/promises');
    try {
      await unlink(inputPath + '.tmp');
    } catch {}
    return null;
  }
}

async function main() {
  console.log('🚀 Iniciando otimização de imagens...\n');
  
  // Criar backup se não existir
  if (!existsSync(BACKUP_DIR)) {
    const { mkdir } = await import('fs/promises');
    await mkdir(BACKUP_DIR, { recursive: true });
    console.log('📁 Pasta de backup criada\n');
  }
  
  let totalOriginal = 0;
  let totalNew = 0;
  
  for (const imageName of LARGE_IMAGES) {
    const inputPath = join(ASSETS_DIR, imageName);
    
    if (!existsSync(inputPath)) {
      console.log(`⚠️  Arquivo não encontrado: ${imageName}`);
      continue;
    }
    
    // Criar backup
    const backupPath = join(BACKUP_DIR, imageName);
    const { copyFile } = await import('fs/promises');
    await copyFile(inputPath, backupPath);
    
    // Otimizar imagem (sobrescrever original)
    const result = await optimizeImage(inputPath);
    
    if (result) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
    }
    
    console.log('');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 Total: ${totalOriginal.toFixed(2)} MB → ${totalNew.toFixed(2)} MB`);
  console.log(`💾 Economia: ${(totalOriginal - totalNew).toFixed(2)} MB (${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)}%)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n✅ Otimização concluída!');
  console.log(`📦 Backups salvos em: ${BACKUP_DIR}`);
}

main().catch(console.error);

