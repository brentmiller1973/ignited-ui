import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');
const baseDir = path.resolve(__dirname, '../base');
const materialDir = path.resolve(__dirname, '../material');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

console.log('Building @ignited-ui/themes...');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

copyDir(baseDir, path.join(distDir, 'base'));
copyDir(materialDir, path.join(distDir, 'material'));

copyFile(path.join(srcDir, 'index.css'), path.join(distDir, 'index.css'));
copyFile(path.join(srcDir, 'base.css'), path.join(distDir, 'base.css'));
copyFile(path.join(srcDir, 'material.css'), path.join(distDir, 'material.css'));

console.log('✓ Theme files copied to dist/');
console.log('✓ Build complete!');
