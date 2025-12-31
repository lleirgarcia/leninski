import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const QUALITY = 85; // JPEG quality (1-100)
const PNG_QUALITY = 90; // PNG quality (1-100)

// Recursively find all image files
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findImages(filePath, fileList);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Compress a single image
async function compressImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    let outputBuffer;
    
    if (ext === '.png') {
      // Compress PNG
      outputBuffer = await sharp(inputPath)
        .png({ 
          quality: PNG_QUALITY,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Compress JPEG
      outputBuffer = await sharp(inputPath)
        .jpeg({ 
          quality: QUALITY,
          mozjpeg: true
        })
        .toBuffer();
    }
    
    const newSize = outputBuffer.length;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    // Only overwrite if we actually saved space
    if (newSize < originalSize) {
      fs.writeFileSync(inputPath, outputBuffer);
      console.log(`✓ ${path.relative(PUBLIC_DIR, inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% saved)`);
      return { saved: true, originalSize, newSize };
    } else {
      console.log(`- ${path.relative(PUBLIC_DIR, inputPath)}: Already optimized`);
      return { saved: false, originalSize, newSize: originalSize };
    }
  } catch (error) {
    console.error(`✗ Error compressing ${inputPath}:`, error.message);
    return { saved: false, error: true };
  }
}

// Main function
async function main() {
  console.log('🖼️  Starting image compression...\n');
  
  const images = findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to compress\n`);
  
  let totalOriginal = 0;
  let totalNew = 0;
  let compressed = 0;
  
  // Process images in batches to avoid memory issues
  const batchSize = 5;
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(compressImage));
    
    results.forEach(result => {
      if (result.saved) {
        totalOriginal += result.originalSize;
        totalNew += result.newSize;
        compressed++;
      } else if (!result.error) {
        totalOriginal += result.originalSize;
        totalNew += result.originalSize;
      }
    });
  }
  
  const totalSavings = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
  const totalSavedMB = ((totalOriginal - totalNew) / 1024 / 1024).toFixed(2);
  
  console.log(`\n✅ Compression complete!`);
  console.log(`   Compressed: ${compressed} images`);
  console.log(`   Total size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Space saved: ${totalSavedMB}MB (${totalSavings}%)`);
}

main().catch(console.error);

