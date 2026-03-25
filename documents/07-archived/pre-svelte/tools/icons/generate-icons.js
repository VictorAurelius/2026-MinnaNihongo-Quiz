#!/usr/bin/env node
/**
 * Generate PNG icons from SVG
 * Usage: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Try to use sharp if available, otherwise provide instructions
async function generateWithSharp() {
    try {
        const sharp = require('sharp');
        const svgPath = path.join(__dirname, 'src', 'icon.svg');

        console.log('📖 Reading SVG file...');
        const svgBuffer = fs.readFileSync(svgPath);

        // Generate 192x192
        console.log('🎨 Generating 192x192 icon...');
        await sharp(svgBuffer)
            .resize(192, 192)
            .png()
            .toFile(path.join(__dirname, 'src', 'icon-192.png'));
        console.log('✅ Created: src/icon-192.png');

        // Generate 512x512
        console.log('🎨 Generating 512x512 icon...');
        await sharp(svgBuffer)
            .resize(512, 512)
            .png()
            .toFile(path.join(__dirname, 'src', 'icon-512.png'));
        console.log('✅ Created: src/icon-512.png');

        console.log('\n🎉 Done! Icons generated successfully!');
        return true;
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            return false;
        }
        throw error;
    }
}

async function main() {
    console.log('🚀 Generating PNG icons from SVG...\n');

    const sharpWorked = await generateWithSharp();

    if (!sharpWorked) {
        console.log('⚠️  Sharp package not found. Installing...\n');
        console.log('Run: npm install sharp\n');
        console.log('Or use the generate-icons.html file in your browser.');
        process.exit(1);
    }
}

main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});
