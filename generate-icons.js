const fs = require('fs');
const path = require('path');

// Simple SVG-based icon generator
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateSVGIcon(size) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
        </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="${size}" height="${size}" fill="url(#grad)"/>
    
    <!-- Globe representation -->
    <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.25}" fill="none" stroke="#3b82f6" stroke-width="${size * 0.02}"/>
    <ellipse cx="${size / 2}" cy="${size / 2}" rx="${size * 0.25}" ry="${size * 0.15}" fill="none" stroke="#3b82f6" stroke-width="${size * 0.015}"/>
    <ellipse cx="${size / 2}" cy="${size / 2}" rx="${size * 0.15}" ry="${size * 0.25}" fill="none" stroke="#3b82f6" stroke-width="${size * 0.015}"/>
    <line x1="${size * 0.25}" y1="${size / 2}" x2="${size * 0.75}" y2="${size / 2}" stroke="#3b82f6" stroke-width="${size * 0.015}"/>
    
    <!-- Orbital ring -->
    <ellipse cx="${size / 2}" cy="${size / 2}" rx="${size * 0.35}" ry="${size * 0.12}" fill="none" stroke="#fbbf24" stroke-width="${size * 0.02}" transform="rotate(-30 ${size / 2} ${size / 2})"/>
    
    <!-- Text -->
    <text x="${size / 2}" y="${size * 0.8}" font-family="Arial, sans-serif" font-size="${size * 0.12}" font-weight="bold" fill="#ffffff" text-anchor="middle">MICRO</text>
    <text x="${size / 2}" y="${size * 0.9}" font-family="Arial, sans-serif" font-size="${size * 0.08}" fill="#ffffff" text-anchor="middle">SYSTEM</text>
</svg>`;
}

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

// Generate SVG icons
sizes.forEach(size => {
    const svg = generateSVGIcon(size);
    const filename = path.join(iconsDir, `icon-${size}.svg`);
    fs.writeFileSync(filename, svg);
    console.log(`Generated ${filename}`);
});

console.log('\n✅ All icons generated successfully!');
console.log('\nNote: These are SVG placeholders. For production:');
console.log('1. Open icon-generator.html in your browser');
console.log('2. Upload logo.jpg');
console.log('3. Generate and download PNG icons');
console.log('4. Replace the SVG files with PNG files in the icons/ folder');
