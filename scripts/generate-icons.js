#!/usr/bin/env node

/**
 * Icon Generation Script
 *
 * This script generates multiple icon sizes from the source 1024px icon.
 *
 * To use:
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Run: node scripts/generate-icons.js
 *
 * Required sizes for PWA:
 * - 192x192 (Android minimum)
 * - 512x512 (Android splash screen)
 * - 180x180 (iOS alternative size)
 * - 152x152 (iPad)
 * - 120x120 (iPhone retina)
 *
 * If you prefer online tools:
 * - https://realfavicongenerator.net/
 * - https://www.pwabuilder.com/imageGenerator
 */

const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../public/icons/apple-icon-1024.png');
const outputDir = path.join(__dirname, '../public/icons');

const sizes = [192, 512, 180, 152, 120];

async function generateIcons() {
  try {
    const sharp = require('sharp');

    console.log('🎨 Generating icon sizes...');

    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      await sharp(sourcePath)
        .resize(size, size)
        .toFile(outputPath);
      console.log(`✓ Generated ${size}x${size}`);
    }

    console.log('✨ All icons generated successfully!');
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('❌ Sharp is not installed.');
      console.error('   Run: npm install --save-dev sharp');
      console.error('   Then run this script again.');
      console.error('');
      console.error('   Or use an online tool:');
      console.error('   - https://realfavicongenerator.net/');
      console.error('   - https://www.pwabuilder.com/imageGenerator');
    } else {
      console.error('❌ Error generating icons:', error.message);
    }
    process.exit(1);
  }
}

generateIcons();
