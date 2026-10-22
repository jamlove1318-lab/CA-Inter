import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');

console.log('--- Inlining bundle for 100% offline standalone usage ---');

if (!fs.existsSync(distDir) || !fs.existsSync(assetsDir)) {
  console.error('dist/assets directory not found. Please run vite build first.');
  process.exit(1);
}

const assetFiles = fs.readdirSync(assetsDir);
const jsFile = assetFiles.find(f => f.endsWith('.js'));
const cssFile = assetFiles.find(f => f.endsWith('.css'));

if (!jsFile || !cssFile) {
  console.error('JS or CSS bundle file missing in dist/assets!');
  process.exit(1);
}

console.log(`Found JS: ${jsFile}`);
console.log(`Found CSS: ${cssFile}`);

const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');
const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');

// Build standalone HTML with inlined CSS and JS
const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚖️</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CA Inter Pro - ICAI Master Exam Suite & AI Evaluator (Offline Edition)</title>
    <style>
/* Inlined CSS for 100% Offline Standalone Support */
${cssContent}
    </style>
  </head>
  <body class="bg-slate-900 text-slate-100 antialiased font-sans selection:bg-blue-600 selection:text-white">
    <div id="root"></div>
    <script>
/* Inlined JS Bundle for Zero-Server / File:// Protocol Execution */
${jsContent}
    </script>
  </body>
</html>`;

// Write to dist/index.html (so GitHub Pages serves the inlined zero-latency version)
fs.writeFileSync(path.join(distDir, 'index.html'), standaloneHtml, 'utf-8');
console.log('✓ Overwrote dist/index.html with standalone inlined version.');

// Also write ca-inter-offline.html in root directory so users can double-click it directly
const rootStandalone = path.join(rootDir, 'ca-inter-offline.html');
fs.writeFileSync(rootStandalone, standaloneHtml, 'utf-8');
console.log(`✓ Generated standalone file: ${rootStandalone}`);
console.log(`File size: ${(fs.statSync(rootStandalone).size / 1024).toFixed(1)} KB`);
console.log('--- Offline bundle generation complete! ---');
