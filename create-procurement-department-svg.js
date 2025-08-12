const fs = require('fs');
const path = require('path');

// Create departments directory if it doesn't exist
const departmentsDir = path.join(__dirname, 'public', 'departments');
if (!fs.existsSync(departmentsDir)) {
  fs.mkdirSync(departmentsDir, { recursive: true });
}

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Complex SVG for Technology Procurement & Integration Services
const procurementDepartmentSVG = `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="procDeptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#EC4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#BE185D;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="#FDF2F8"/>
  
  <!-- Procurement Warehouse -->
  <rect x="50" y="150" width="200" height="120" rx="8" fill="url(#procDeptGrad)" opacity="0.9"/>
  <rect x="60" y="160" width="180" height="20" rx="4" fill="white" opacity="0.8"/>
  <rect x="60" y="190" width="180" height="20" rx="4" fill="white" opacity="0.7"/>
  <rect x="60" y="220" width="180" height="20" rx="4" fill="white" opacity="0.6"/>
  <rect x="60" y="250" width="180" height="20" rx="4" fill="white" opacity="0.5"/>
  
  <!-- Shopping carts -->
  <path d="M 80 180 L 90 180 L 95 170 L 115 170 L 120 180 L 130 180" stroke="white" stroke-width="3" fill="none" opacity="0.8"/>
  <circle cx="85" cy="190" r="4" fill="white" opacity="0.7"/>
  <circle cx="125" cy="190" r="4" fill="white" opacity="0.7"/>
  <rect x="85" y="175" width="40" height="10" rx="2" fill="white" opacity="0.6"/>
  
  <path d="M 140 200 L 150 200 L 155 190 L 175 190 L 180 200 L 190 200" stroke="white" stroke-width="3" fill="none" opacity="0.8"/>
  <circle cx="145" cy="210" r="4" fill="white" opacity="0.7"/>
  <circle cx="185" cy="210" r="4" fill="white" opacity="0.7"/>
  <rect x="145" y="195" width="40" height="10" rx="2" fill="white" opacity="0.6"/>
  
  <!-- Vendor Management Center -->
  <rect x="300" y="150" width="200" height="120" rx="8" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="310" y="160" width="180" height="20" rx="4" fill="white" opacity="0.8"/>
  <rect x="310" y="190" width="180" height="20" rx="4" fill="white" opacity="0.7"/>
  <rect x="310" y="220" width="180" height="20" rx="4" fill="white" opacity="0.6"/>
  <rect x="310" y="250" width="180" height="20" rx="4" fill="white" opacity="0.5"/>
  
  <!-- Vendor partners -->
  <circle cx="330" cy="180" r="8" fill="white" opacity="0.9"/>
  <circle cx="330" cy="180" r="4" fill="url(#procDeptGrad)"/>
  
  <circle cx="370" cy="180" r="8" fill="white" opacity="0.8"/>
  <circle cx="370" cy="180" r="4" fill="url(#procDeptGrad)"/>
  
  <circle cx="410" cy="180" r="8" fill="white" opacity="0.7"/>
  <circle cx="410" cy="180" r="4" fill="url(#procDeptGrad)"/>
  
  <!-- Management connections -->
  <path d="M 338 180 L 362 180" stroke="white" stroke-width="2" fill="none" opacity="0.6"/>
  <path d="M 378 180 L 402 180" stroke="white" stroke-width="2" fill="none" opacity="0.6"/>
  
  <!-- Central management -->
  <circle cx="370" cy="210" r="10" fill="white" opacity="0.8"/>
  <path d="M 366 210 L 369 213 L 374 208" stroke="url(#procDeptGrad)" stroke-width="2" fill="none"/>
  
  <!-- Systems Integration Hub -->
  <rect x="550" y="150" width="200" height="120" rx="8" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="560" y="160" width="180" height="20" rx="4" fill="white" opacity="0.8"/>
  <rect x="560" y="190" width="180" height="20" rx="4" fill="white" opacity="0.7"/>
  <rect x="560" y="220" width="180" height="20" rx="4" fill="white" opacity="0.6"/>
  <rect x="560" y="250" width="180" height="20" rx="4" fill="white" opacity="0.5"/>
  
  <!-- Connected systems -->
  <rect x="580" y="180" width="30" height="20" rx="3" fill="white" opacity="0.8"/>
  <rect x="582" y="182" width="26" height="4" rx="1" fill="url(#procDeptGrad)"/>
  <rect x="582" y="188" width="20" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="582" y="193" width="24" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  
  <rect x="690" y="180" width="30" height="20" rx="3" fill="white" opacity="0.8"/>
  <rect x="692" y="182" width="26" height="4" rx="1" fill="url(#procDeptGrad)"/>
  <rect x="692" y="188" width="20" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="692" y="193" width="24" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  
  <!-- Integration connection -->
  <path d="M 610 190 L 690 190" stroke="white" stroke-width="3" fill="none" opacity="0.8"/>
  <path d="M 685 190 L 690 190 L 688 188 M 690 190 L 688 192" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
  
  <!-- Deployment indicator -->
  <circle cx="650" cy="220" r="8" fill="white" opacity="0.8"/>
  <path d="M 646 220 L 649 223 L 654 218" stroke="url(#procDeptGrad)" stroke-width="2" fill="none"/>
  
  <!-- License Management Center -->
  <rect x="150" y="320" width="200" height="120" rx="8" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="160" y="330" width="180" height="20" rx="4" fill="white" opacity="0.8"/>
  <rect x="160" y="360" width="180" height="20" rx="4" fill="white" opacity="0.7"/>
  <rect x="160" y="390" width="180" height="20" rx="4" fill="white" opacity="0.6"/>
  <rect x="160" y="420" width="180" height="20" rx="4" fill="white" opacity="0.5"/>
  
  <!-- License documents -->
  <rect x="180" y="350" width="25" height="30" rx="3" fill="white" opacity="0.9"/>
  <rect x="182" y="352" width="21" height="4" rx="1" fill="url(#procDeptGrad)"/>
  <rect x="182" y="358" width="17" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="182" y="363" width="19" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="182" y="368" width="15" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  
  <rect x="220" y="350" width="25" height="30" rx="3" fill="white" opacity="0.8"/>
  <rect x="222" y="352" width="21" height="4" rx="1" fill="url(#procDeptGrad)"/>
  <rect x="222" y="358" width="17" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="222" y="363" width="19" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="222" y="368" width="15" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  
  <rect x="260" y="350" width="25" height="30" rx="3" fill="white" opacity="0.7"/>
  <rect x="262" y="352" width="21" height="4" rx="1" fill="url(#procDeptGrad)"/>
  <rect x="262" y="358" width="17" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="262" y="363" width="19" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="262" y="368" width="15" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  
  <!-- Management arrows -->
  <path d="M 205 365 L 220 365" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
  <path d="M 207 365 L 205 363 M 207 365 L 205 367" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
  
  <path d="M 245 365 L 260 365" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
  <path d="M 247 365 L 245 363 M 247 365 L 245 367" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
  
  <!-- Contract Management Hub -->
  <rect x="450" y="320" width="200" height="120" rx="8" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="460" y="330" width="180" height="20" rx="4" fill="white" opacity="0.8"/>
  <rect x="460" y="360" width="180" height="20" rx="4" fill="white" opacity="0.7"/>
  <rect x="460" y="390" width="180" height="20" rx="4" fill="white" opacity="0.6"/>
  <rect x="460" y="420" width="180" height="20" rx="4" fill="white" opacity="0.5"/>
  
  <!-- Contract documents -->
  <rect x="480" y="350" width="30" height="35" rx="3" fill="white" opacity="0.9"/>
  <rect x="482" y="352" width="26" height="4" rx="1" fill="url(#procDeptGrad)"/>
  <rect x="482" y="358" width="22" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="482" y="363" width="24" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="482" y="368" width="20" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="482" y="373" width="26" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  <rect x="482" y="378" width="18" height="3" rx="1" fill="url(#procDeptGrad)" opacity="0.7"/>
  
  <!-- Contract signing -->
  <circle cx="550" cy="365" r="12" fill="white" opacity="0.8"/>
  <path d="M 546 365 L 549 368 L 554 363" stroke="url(#procDeptGrad)" stroke-width="2" fill="none"/>
  
  <!-- Workflow arrows -->
  <path d="M 250 210 L 300 210" stroke="url(#procDeptGrad)" stroke-width="3" fill="none" opacity="0.6"/>
  <path d="M 295 210 L 300 210 L 298 208 M 300 210 L 298 212" stroke="url(#procDeptGrad)" stroke-width="2" fill="none" opacity="0.6"/>
  
  <path d="M 500 210 L 550 210" stroke="url(#procDeptGrad)" stroke-width="3" fill="none" opacity="0.6"/>
  <path d="M 545 210 L 550 210 L 548 208 M 550 210 L 548 212" stroke="url(#procDeptGrad)" stroke-width="2" fill="none" opacity="0.6"/>
  
  <path d="M 150 320 L 150 280" stroke="url(#procDeptGrad)" stroke-width="3" fill="none" opacity="0.6"/>
  <path d="M 150 285 L 150 280 L 148 282 M 150 280 L 152 282" stroke="url(#procDeptGrad)" stroke-width="2" fill="none" opacity="0.6"/>
  
  <path d="M 450 320 L 450 280" stroke="url(#procDeptGrad)" stroke-width="3" fill="none" opacity="0.6"/>
  <path d="M 450 285 L 450 280 L 448 282 M 450 280 L 452 282" stroke="url(#procDeptGrad)" stroke-width="2" fill="none" opacity="0.6"/>
  
  <!-- KPIs and metrics -->
  <rect x="100" y="480" width="600" height="80" rx="8" fill="white" stroke="url(#procDeptGrad)" stroke-width="2" opacity="0.9"/>
  
  <!-- KPI bars -->
  <rect x="120" y="520" width="40" height="20" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="180" y="510" width="40" height="30" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="240" y="500" width="40" height="40" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="300" y="490" width="40" height="50" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="360" y="480" width="40" height="60" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="420" y="470" width="40" height="70" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="480" y="460" width="40" height="80" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="540" y="450" width="40" height="90" fill="url(#procDeptGrad)" opacity="0.8"/>
  <rect x="600" y="440" width="40" height="100" fill="url(#procDeptGrad)" opacity="0.8"/>
  
  <!-- KPI labels -->
  <text x="140" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">On-Time</text>
  <text x="200" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">Success</text>
  <text x="260" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">Renewal</text>
  <text x="320" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">ARR</text>
  <text x="380" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">Cost</text>
  <text x="440" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">Lead</text>
  <text x="500" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">Compliance</text>
  <text x="560" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">Efficiency</text>
  <text x="620" y="555" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">Quality</text>
  
  <!-- Title -->
  <text x="400" y="50" text-anchor="middle" fill="#1E293B" font-size="32" font-weight="bold">Technology Procurement &amp; Integration</text>
  <text x="400" y="80" text-anchor="middle" fill="#64748B" font-size="18">Centralized Procurement, Vendor Management &amp; Systems Integration</text>
</svg>`;

// Better card icons for procurement service
const betterProcurementIcons = {
  'procurement-management': `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="96" height="96" rx="20" fill="url(#pmGrad)"/>
    <!-- Warehouse building -->
    <rect x="25" y="35" width="46" height="25" rx="3" fill="white" opacity="0.9"/>
    <rect x="27" y="37" width="42" height="4" rx="1" fill="url(#pmGrad)"/>
    <rect x="27" y="43" width="42" height="4" rx="1" fill="url(#pmGrad)" opacity="0.7"/>
    <rect x="27" y="49" width="42" height="4" rx="1" fill="url(#pmGrad)" opacity="0.7"/>
    <rect x="27" y="55" width="42" height="4" rx="1" fill="url(#pmGrad)" opacity="0.7"/>
    
    <!-- Shopping cart -->
    <path d="M 30 70 L 40 70 L 45 60 L 65 60 L 70 70 L 80 70" stroke="white" stroke-width="3" fill="none" opacity="0.9"/>
    <circle cx="35" cy="80" r="5" fill="white" opacity="0.8"/>
    <circle cx="75" cy="80" r="5" fill="white" opacity="0.8"/>
    <rect x="35" y="65" width="40" height="10" rx="2" fill="white" opacity="0.7"/>
    
    <!-- Management check -->
    <circle cx="48" cy="90" r="6" fill="white" opacity="0.8"/>
    <path d="M 45 90 L 47 92 L 51 88" stroke="url(#pmGrad)" stroke-width="2" fill="none"/>
  </svg>`,

  'license-management': `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="96" height="96" rx="20" fill="url(#lmGrad)"/>
    <!-- License certificates -->
    <rect x="20" y="25" width="25" height="35" rx="3" fill="white" opacity="0.9"/>
    <rect x="22" y="27" width="21" height="4" rx="1" fill="url(#lmGrad)"/>
    <rect x="22" y="33" width="17" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    <rect x="22" y="38" width="19" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    <rect x="22" y="43" width="15" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    <rect x="22" y="48" width="21" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    <rect x="22" y="53" width="18" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    
    <rect x="50" y="25" width="25" height="35" rx="3" fill="white" opacity="0.8"/>
    <rect x="52" y="27" width="21" height="4" rx="1" fill="url(#lmGrad)"/>
    <rect x="52" y="33" width="17" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    <rect x="52" y="38" width="19" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    <rect x="52" y="43" width="15" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    <rect x="52" y="48" width="21" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    <rect x="52" y="53" width="18" height="3" rx="1" fill="url(#lmGrad)" opacity="0.7"/>
    
    <!-- Management workflow -->
    <path d="M 45 42 L 50 42" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M 47 42 L 45 40 M 47 42 L 45 44" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
    
    <!-- Cloud and on-prem indicators -->
    <ellipse cx="35" cy="75" rx="8" ry="4" fill="white" opacity="0.7"/>
    <ellipse cx="60" cy="75" rx="8" ry="4" fill="white" opacity="0.7"/>
  </svg>`,

  'systems-integration': `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="siGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#D97706;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="96" height="96" rx="20" fill="url(#siGrad)"/>
    <!-- Multiple connected systems -->
    <rect x="15" y="30" width="20" height="20" rx="3" fill="white" opacity="0.8"/>
    <rect x="17" y="32" width="16" height="3" rx="1" fill="url(#siGrad)"/>
    <rect x="17" y="37" width="12" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    <rect x="17" y="41" width="14" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    <rect x="17" y="45" width="10" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    
    <rect x="40" y="30" width="20" height="20" rx="3" fill="white" opacity="0.8"/>
    <rect x="42" y="32" width="16" height="3" rx="1" fill="url(#siGrad)"/>
    <rect x="42" y="37" width="12" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    <rect x="42" y="41" width="14" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    <rect x="42" y="45" width="10" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    
    <rect x="65" y="30" width="20" height="20" rx="3" fill="white" opacity="0.8"/>
    <rect x="67" y="32" width="16" height="3" rx="1" fill="url(#siGrad)"/>
    <rect x="67" y="37" width="12" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    <rect x="67" y="41" width="14" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    <rect x="67" y="45" width="10" height="2" rx="1" fill="url(#siGrad)" opacity="0.7"/>
    
    <!-- Integration connections -->
    <path d="M 35 40 L 40 40" stroke="white" stroke-width="3" fill="none" opacity="0.8"/>
    <path d="M 60 40 L 65 40" stroke="white" stroke-width="3" fill="none" opacity="0.8"/>
    <path d="M 38 40 L 40 40 L 39 38 M 40 40 L 39 42" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M 63 40 L 65 40 L 64 38 M 65 40 L 64 42" stroke="white" stroke-width="2" fill="none" opacity="0.8"/>
    
    <!-- Deployment pipeline -->
    <path d="M 25 65 L 75 65" stroke="white" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M 30 65 L 35 65 L 33 63 M 35 65 L 33 67" stroke="white" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M 45 65 L 50 65 L 48 63 M 50 65 L 48 67" stroke="white" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M 60 65 L 65 65 L 63 63 M 65 65 L 63 67" stroke="white" stroke-width="2" fill="none" opacity="0.7"/>
    
    <!-- Success indicator -->
    <circle cx="50" cy="80" r="8" fill="white" opacity="0.8"/>
    <path d="M 46 80 L 49 83 L 54 78" stroke="url(#siGrad)" stroke-width="2" fill="none"/>
  </svg>`,

  'vendor-management': `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="96" height="96" rx="20" fill="url(#vmGrad)"/>
    <!-- Vendor partners network -->
    <circle cx="30" cy="35" r="10" fill="white" opacity="0.9"/>
    <circle cx="30" cy="35" r="5" fill="url(#vmGrad)"/>
    
    <circle cx="50" cy="35" r="10" fill="white" opacity="0.8"/>
    <circle cx="50" cy="35" r="5" fill="url(#vmGrad)"/>
    
    <circle cx="70" cy="35" r="10" fill="white" opacity="0.7"/>
    <circle cx="70" cy="35" r="5" fill="url(#vmGrad)"/>
    
    <!-- Management connections -->
    <path d="M 40 35 L 50 35" stroke="white" stroke-width="2" fill="none" opacity="0.6"/>
    <path d="M 60 35 L 70 35" stroke="white" stroke-width="2" fill="none" opacity="0.6"/>
    
    <!-- Central management hub -->
    <circle cx="50" cy="65" r="12" fill="white" opacity="0.8"/>
    <path d="M 46 65 L 49 68 L 54 63" stroke="url(#vmGrad)" stroke-width="2" fill="none"/>
    <path d="M 50 55 L 50 62" stroke="url(#vmGrad)" stroke-width="2" fill="none"/>
    
    <!-- Contract management -->
    <rect x="25" y="75" width="15" height="15" rx="2" fill="white" opacity="0.7"/>
    <rect x="27" y="77" width="11" height="2" rx="1" fill="url(#vmGrad)"/>
    <rect x="27" y="81" width="8" height="2" rx="1" fill="url(#vmGrad)" opacity="0.7"/>
    <rect x="27" y="85" width="10" height="2" rx="1" fill="url(#vmGrad)" opacity="0.7"/>
    
    <rect x="60" y="75" width="15" height="15" rx="2" fill="white" opacity="0.7"/>
    <rect x="62" y="77" width="11" height="2" rx="1" fill="url(#vmGrad)"/>
    <rect x="62" y="81" width="8" height="2" rx="1" fill="url(#vmGrad)" opacity="0.7"/>
    <rect x="62" y="85" width="10" height="2" rx="1" fill="url(#vmGrad)" opacity="0.7"/>
  </svg>`
};

// Function to create SVG file
function createSVGFile(svgContent, filename, directory) {
  const filepath = path.join(directory, filename);
  fs.writeFileSync(filepath, svgContent);
  console.log(`Created: ${filename}`);
}

// Create procurement department SVG and better icons
function createProcurementAssets() {
  console.log('Creating complex procurement department SVG and better icons...');
  
  try {
    // Create department SVG
    createSVGFile(procurementDepartmentSVG, 'technology-procurement.svg', departmentsDir);
    
    // Create better card icons
    createSVGFile(betterProcurementIcons['procurement-management'], 'procurement-management.svg', iconsDir);
    createSVGFile(betterProcurementIcons['license-management'], 'license-management.svg', iconsDir);
    createSVGFile(betterProcurementIcons['systems-integration'], 'systems-integration.svg', iconsDir);
    createSVGFile(betterProcurementIcons['vendor-management'], 'vendor-management.svg', iconsDir);
    
    console.log('All procurement assets created successfully!');
    console.log('Complex department SVG with detailed workflow and better card icons with different color schemes.');
  } catch (error) {
    console.error('Error creating procurement assets:', error);
  }
}

createProcurementAssets();
