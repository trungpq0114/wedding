import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to scan
const scanDirs = ['src'];

// Image extensions to look for
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// Patterns to search for image references
const imagePatterns = [
  /src=["']([^"']*\.(?:jpg|jpeg|png|webp|gif|svg))["']/gi,
  /import\s+.*from\s+["']([^"']*\.(?:jpg|jpeg|png|webp|gif|svg))["']/gi,
  /require\(["']([^"']*\.(?:jpg|jpeg|png|webp|gif|svg))["']\)/gi,
  /\/optimized\/[^"'\s]+/g, // Specific for optimized images
];

function scanDirectory(dir, results = {}) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !item.startsWith('.') &&
      item !== 'node_modules'
    ) {
      scanDirectory(fullPath, results);
    } else if (
      stat.isFile() &&
      (item.endsWith('.tsx') ||
        item.endsWith('.ts') ||
        item.endsWith('.js') ||
        item.endsWith('.jsx'))
    ) {
      scanFile(fullPath, results);
    }
  }

  return results;
}

function scanFile(filePath, results) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);

  for (const pattern of imagePatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const imagePath = match[1] || match[0];
      if (!results[imagePath]) {
        results[imagePath] = [];
      }
      if (!results[imagePath].includes(relativePath)) {
        results[imagePath].push(relativePath);
      }
    }
  }
}

function main() {
  console.log('🔍 Scanning for image usage in code...\n');

  const results = {};

  for (const dir of scanDirs) {
    if (fs.existsSync(dir)) {
      scanDirectory(dir, results);
    }
  }

  // Also check actual image files in public
  const publicImages = {};
  function scanPublic(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanPublic(fullPath);
      } else if (
        imageExtensions.some((ext) => item.toLowerCase().endsWith(ext))
      ) {
        publicImages[path.relative('public', fullPath)] = true;
      }
    }
  }

  if (fs.existsSync('public')) {
    scanPublic('public');
  }

  console.log('📋 Images referenced in code:');
  console.log('================================');

  const sortedImages = Object.keys(results).sort();
  for (const image of sortedImages) {
    console.log(`\n🖼️  ${image}`);
    console.log(`   Used in: ${results[image].join(', ')}`);

    // Check if file exists
    const publicPath = path.join('public', image);
    const exists = fs.existsSync(publicPath);
    console.log(`   File exists: ${exists ? '✅' : '❌'}`);
  }

  console.log('\n📊 Summary:');
  console.log(`   Total unique images referenced: ${sortedImages.length}`);
  console.log(
    `   Total image files in public: ${Object.keys(publicImages).length}`
  );

  // Find unused images
  const usedImages = new Set(sortedImages.map((img) => img.replace(/^\//, '')));
  const unusedImages = Object.keys(publicImages).filter(
    (img) => !usedImages.has(img)
  );

  if (unusedImages.length > 0) {
    console.log('\n🗑️  Potentially unused images in public/:');
    unusedImages.forEach((img) => console.log(`   - ${img}`));
  } else {
    console.log('\n✅ All images in public/ are referenced in code');
  }
}

main();

export { scanDirectory, scanFile };
