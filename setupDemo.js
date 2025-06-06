#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

if (process.argv.length < 3) {
  console.error('Usage: node setupDemo.js <demo-dir>');
  process.exit(1);
}

const demoDir = process.argv[2];
const repoRoot = __dirname;
const demoSrc = path.join(demoDir, 'src');

if (!fs.existsSync(demoSrc)) {
  console.error(`Directory ${demoSrc} does not exist. Have you run \`npm create vite@latest ${demoDir} -- --template react-ts\`?`);
  process.exit(1);
}

// Copy App.tsx
fs.copyFileSync(path.join(repoRoot, 'App.tsx'), path.join(demoSrc, 'App.tsx'));

// Copy contents of src directory
const srcRoot = path.join(repoRoot, 'src');
for (const item of fs.readdirSync(srcRoot)) {
  const srcPath = path.join(srcRoot, item);
  const destPath = path.join(demoSrc, item);
  fs.cpSync(srcPath, destPath, { recursive: true });
}

// Fix import paths in App.tsx
const appPath = path.join(demoSrc, 'App.tsx');
let appSource = fs.readFileSync(appPath, 'utf8');
appSource = appSource.replace(/\.\/src\//g, './');
fs.writeFileSync(appPath, appSource);

// Install extra dependencies
execSync('npm install lucide-react recharts', { cwd: demoDir, stdio: 'inherit' });

console.log(`Demo setup complete. Run \`npm run dev\` inside ${demoDir}.`);
