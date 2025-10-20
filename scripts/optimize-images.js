// optimize-images.js
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const inputDir = 'public/wedding';
const outputDir = 'public/optimized';

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// chỉ 1 variant duy nhất
const heroVariants = [
  {
    width: 1600,
    gravity: 'center',
    brightness: 1.0,
    saturation: 1.0,
  },
];

function getAllImages(dir) {
  const files = readdirSync(dir);
  let images = [];

  for (const file of files) {
    const fullPath = join(dir, file);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      images = images.concat(getAllImages(fullPath));
    } else {
      const ext = extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        images.push(fullPath);
      }
    }
  }
  return images;
}

async function optimizeImage(imagePath) {
  const name = basename(imagePath, extname(imagePath));
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  console.log(`📸 Processing: ${name} (${metadata.width}x${metadata.height})`);

  for (const variant of heroVariants) {
    const outputPath = join(outputDir, `${name}-w${variant.width}.webp`);

    await image
      .resize(variant.width, null, {
        withoutEnlargement: true,
        fit: 'cover',
        position: variant.gravity,
      })
      .modulate({
        brightness: variant.brightness,
        saturation: variant.saturation,
      })
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`✅ Created: ${outputPath}`);
  }
}

async function main() {
  const allImages = getAllImages(inputDir);
  console.log(`\n🔍 Found ${allImages.length} images in ${inputDir}\n`);

  for (const imagePath of allImages) {
    await optimizeImage(imagePath);
  }

  console.log('\n🎉 All images optimized successfully!');
}

main().catch((err) => console.error('❌ Error optimizing images:', err));
