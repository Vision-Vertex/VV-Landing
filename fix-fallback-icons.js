const https = require('https');
const fs = require('fs');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Better alternative icons from more reliable sources
const betterAlternatives = {
  // AI & Data Science
  'machine-learning': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png', // AI/ML icon
  'business-analysis': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png', // Analytics icon
  
  // Cloud & DevOps
  'cloud-infrastructure': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png', // Cloud icon
  'ci-cd-pipeline': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png', // Automation icon
  
  // Training & R&D
  'research-development': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' // Research icon
};

// Third alternative sources
const thirdAlternatives = {
  'machine-learning': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
  'business-analysis': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
  'cloud-infrastructure': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
  'ci-cd-pipeline': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
  'research-development': 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png'
};

// Function to download icon with multiple fallbacks
async function downloadIconWithMultipleFallbacks(primaryUrl, fallbackUrl, thirdUrl, filename) {
  const filepath = path.join(iconsDir, filename);
  
  try {
    // Try primary URL first
    await downloadIcon(primaryUrl, filename);
    console.log(`Downloaded: ${filename} (primary source)`);
  } catch (error) {
    console.log(`Primary failed for ${filename}, trying first fallback...`);
    try {
      // Try first fallback URL
      await downloadIcon(fallbackUrl, filename);
      console.log(`Downloaded: ${filename} (first fallback source)`);
    } catch (fallbackError) {
      console.log(`First fallback failed for ${filename}, trying second fallback...`);
      try {
        // Try second fallback URL
        await downloadIcon(thirdUrl, filename);
        console.log(`Downloaded: ${filename} (second fallback source)`);
      } catch (thirdError) {
        console.error(`All sources failed for ${filename}:`, thirdError.message);
      }
    }
  }
}

// Function to download icon
function downloadIcon(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(iconsDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Download better alternative icons
async function downloadBetterAlternatives() {
  console.log('Downloading better alternative icons to replace JS logos...');
  
  try {
    // Download AI & Data Science icons
    await downloadIconWithMultipleFallbacks(
      'https://img.icons8.com/color/96/000000/artificial-intelligence.png',
      betterAlternatives['machine-learning'],
      thirdAlternatives['machine-learning'],
      'machine-learning.png'
    );
    await downloadIconWithMultipleFallbacks(
      'https://img.icons8.com/color/96/000000/analytics.png',
      betterAlternatives['business-analysis'],
      thirdAlternatives['business-analysis'],
      'business-analysis.png'
    );
    
    // Download Cloud & DevOps icons
    await downloadIconWithMultipleFallbacks(
      'https://img.icons8.com/color/96/000000/cloud-computing.png',
      betterAlternatives['cloud-infrastructure'],
      thirdAlternatives['cloud-infrastructure'],
      'cloud-infrastructure.png'
    );
    await downloadIconWithMultipleFallbacks(
      'https://img.icons8.com/color/96/000000/automation.png',
      betterAlternatives['ci-cd-pipeline'],
      thirdAlternatives['ci-cd-pipeline'],
      'ci-cd-pipeline.png'
    );
    
    // Download Training & R&D icons
    await downloadIconWithMultipleFallbacks(
      'https://img.icons8.com/color/96/000000/research.png',
      betterAlternatives['research-development'],
      thirdAlternatives['research-development'],
      'research-development.png'
    );
    
    console.log('Better alternative icons downloaded successfully!');
  } catch (error) {
    console.error('Error downloading better alternatives:', error);
  }
}

downloadBetterAlternatives();
