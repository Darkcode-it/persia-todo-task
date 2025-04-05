
// Simple deploy script for GitHub Pages
const { execSync } = require('child_process');

// Run build
console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Deploy to GitHub Pages
console.log('Deploying to GitHub Pages...');
execSync('npx gh-pages -d dist', { stdio: 'inherit' });

console.log('Deployment complete! Your app should be available on GitHub Pages shortly.');
