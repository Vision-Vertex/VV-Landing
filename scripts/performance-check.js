#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Performance Optimization Check');
console.log('================================\n');

// Check if Next.js is installed
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const hasNext = packageJson.dependencies && packageJson.dependencies.next;
  
  if (!hasNext) {
    console.log('❌ Next.js not found in dependencies');
    process.exit(1);
  }
  
  console.log('✅ Next.js found');
} catch (error) {
  console.log('❌ Error reading package.json');
  process.exit(1);
}

// Check for performance-related dependencies
const performanceDeps = [
  '@next/bundle-analyzer',
  'cross-env'
];

console.log('\n📦 Checking performance dependencies...');
performanceDeps.forEach(dep => {
  try {
    require.resolve(dep);
    console.log(`✅ ${dep} installed`);
  } catch (error) {
    console.log(`⚠️  ${dep} not found - run: npm install ${dep}`);
  }
});

// Check for performance optimizations in code
console.log('\n🔍 Checking for performance optimizations...');

const filesToCheck = [
  'next.config.ts',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/components/home/services.tsx',
  'src/components/home/partners.tsx'
];

const optimizations = {
  'next.config.ts': [
    'images: {',
    'formats: [',
    'experimental: {',
    'optimizePackageImports: ['
  ],
  'src/app/layout.tsx': [
    'display: \'swap\'',
    'preload: true',
    'fallback: [',
    'PerformanceMonitor'
  ],
  'src/app/page.tsx': [
    'dynamic(',
    'Suspense',
    'loading: () =>'
  ],
  'src/components/home/services.tsx': [
    'useCallback',
    'IntersectionObserver',
    'requestAnimationFrame',
    'placeholder="blur"'
  ],
  'src/components/home/partners.tsx': [
    'viewport={{ once: true',
    'placeholder="blur"',
    'transition={{ duration: 0.3'
  ]
};

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const fileOptimizations = optimizations[file] || [];
    let foundCount = 0;
    
    fileOptimizations.forEach(opt => {
      if (content.includes(opt)) {
        foundCount++;
      }
    });
    
    const percentage = Math.round((foundCount / fileOptimizations.length) * 100);
    console.log(`${percentage >= 80 ? '✅' : percentage >= 50 ? '⚠️' : '❌'} ${file}: ${percentage}% optimized`);
  } else {
    console.log(`❌ ${file}: File not found`);
  }
});

// Performance recommendations
console.log('\n💡 Performance Recommendations:');
console.log('1. Run "npm run build:prod" for production build');
console.log('2. Use "npm run analyze" to check bundle size');
console.log('3. Test with Google PageSpeed Insights');
console.log('4. Monitor Core Web Vitals in production');
console.log('5. Consider implementing a CDN for static assets');

// Check if build script exists
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts || {};
  
  if (scripts['build:prod']) {
    console.log('\n✅ Production build script found');
  } else {
    console.log('\n⚠️  Add "build:prod": "NODE_ENV=production next build" to package.json scripts');
  }
  
  if (scripts.analyze) {
    console.log('✅ Bundle analyzer script found');
  } else {
    console.log('⚠️  Add "analyze": "ANALYZE=true next build" to package.json scripts');
  }
} catch (error) {
  console.log('\n❌ Error checking package.json scripts');
}

console.log('\n🎯 Next Steps:');
console.log('1. Deploy the optimized build to your VPS');
console.log('2. Configure your web server for gzip compression');
console.log('3. Set up browser caching headers');
console.log('4. Monitor performance metrics in production');
console.log('5. Consider implementing a CDN for better global performance');

console.log('\n✨ Performance optimization complete!');
