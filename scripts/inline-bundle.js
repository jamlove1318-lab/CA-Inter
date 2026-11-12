import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');

console.log('--- Inlining bundle for 100% offline standalone & PWA installation ---');

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

// Build standalone HTML with full PWA manifest, meta tags, and inlined assets
const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
    <title>CA Inter Pro - ICAI Master Exam Suite & AI Evaluator</title>
    
    <!-- PWA & Mobile Web App Meta Tags -->
    <link rel="manifest" href="./manifest.json" />
    <meta name="theme-color" content="#0b2545" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="CA Inter Pro" />
    <meta name="application-name" content="CA Inter Pro" />
    <meta name="description" content="Complete ICAI CA Intermediate study suite with AI Answer Evaluator, Unlimited MCQs, Past Papers, and Game Zone." />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <script>
      // Clear legacy service worker registrations and caches to enforce 100% online freshness
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          for (var i = 0; i < registrations.length; i++) {
            registrations[i].unregister();
          }
        });
      }
      if ('caches' in window) {
        caches.keys().then(function(keys) {
          for (var i = 0; i < keys.length; i++) {
            caches.delete(keys[i]);
          }
        });
      }
    </script>
    <style>
/* Inlined CSS for 100% Offline Standalone Support */
${cssContent}
    </style>
  </head>
  <body class="bg-slate-900 text-slate-100 antialiased font-sans selection:bg-blue-600 selection:text-white min-h-screen">
    <div id="root"></div>
    <script>
/* Inlined JS Bundle for Zero-Server / File:// Protocol Execution */
${jsContent}
    </script>
  </body>
</html>`;

// Write to dist/index.html (so GitHub Pages serves the inlined zero-latency version)
fs.writeFileSync(path.join(distDir, 'index.html'), standaloneHtml, 'utf-8');
console.log('✓ Overwrote dist/index.html with standalone inlined PWA version.');

// Also write ca-inter-offline.html in root directory so users can double-click it directly
const rootStandalone = path.join(rootDir, 'ca-inter-offline.html');
fs.writeFileSync(rootStandalone, standaloneHtml, 'utf-8');
fs.writeFileSync(path.join(distDir, 'ca-inter-offline.html'), standaloneHtml, 'utf-8');
console.log(`✓ Generated standalone file: ${rootStandalone}`);
console.log(`File size: ${(fs.statSync(rootStandalone).size / 1024).toFixed(1)} KB`);

// Ensure public icons and files are copied to dist
const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  const publicFiles = fs.readdirSync(publicDir);
  for (const pf of publicFiles) {
    fs.copyFileSync(path.join(publicDir, pf), path.join(distDir, pf));
  }
  console.log(`✓ Copied ${publicFiles.length} public asset files (icons, manifest, sw) into dist/`);
}

console.log('--- Offline & PWA bundle generation complete! ---');
