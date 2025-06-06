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
fs.copyFileSync(path.join(repoRoot, 'src', 'App.tsx'), path.join(demoSrc, 'App.tsx'));

// Copy contents of src directory
const srcRoot = path.join(repoRoot, 'src');
for (const item of fs.readdirSync(srcRoot)) {
  const srcPath = path.join(srcRoot, item);
  const destPath = path.join(demoSrc, item);
  fs.cpSync(srcPath, destPath, { recursive: true });
}



// Install extra dependencies
execSync('npm install lucide-react recharts', { cwd: demoDir, stdio: 'inherit' });

// Install and configure Tailwind CSS
execSync('npm install -D tailwindcss postcss autoprefixer', { cwd: demoDir, stdio: 'inherit' });

// Create Tailwind and PostCSS configuration files

const tailwindConfig = `module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
fs.writeFileSync(path.join(demoDir, 'tailwind.config.js'), tailwindConfig);

const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
fs.writeFileSync(path.join(demoDir, 'postcss.config.js'), postcssConfig);


// Create index.css with Tailwind directives
fs.writeFileSync(
  path.join(demoSrc, 'index.css'),
  '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n'
);

// Ensure main.tsx imports the Tailwind stylesheet
const mainPath = path.join(demoSrc, 'main.tsx');
let mainSrc = fs.readFileSync(mainPath, 'utf8');
if (!mainSrc.includes("./index.css")) {
  mainSrc = `import './index.css';\n` + mainSrc;
  fs.writeFileSync(mainPath, mainSrc);
}

console.log(`Demo setup complete. Run \`npm run dev\` inside ${demoDir}.`);
