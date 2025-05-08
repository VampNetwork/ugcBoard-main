const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a special .babelrc file to bypass the JSX runtime issues
const babelrcPath = path.join(__dirname, '.babelrc');
const babelrcContent = JSON.stringify({
  "presets": [
    "react-app"
  ],
  "plugins": [
    "@babel/plugin-transform-react-jsx"
  ]
}, null, 2);

console.log('Creating temporary .babelrc file...');
fs.writeFileSync(babelrcPath, babelrcContent);

try {
  console.log('Running build with legacy-peer-deps...');
  execSync('npm run build --legacy-peer-deps', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
} finally {
  console.log('Removing temporary .babelrc file...');
  fs.unlinkSync(babelrcPath);
}