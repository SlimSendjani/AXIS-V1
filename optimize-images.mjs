import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const ROOT_DIR = '.';

async function optimizeImages() {
    const files = await readdir(ROOT_DIR);
    const pngFiles = files.filter(f =>
        extname(f).toLowerCase() === '.png' &&
        /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.png$/i.test(f)
    );

    console.log(`Found ${pngFiles.length} large PNG files to optimize`);

    for (const file of pngFiles) {
        const filePath = join(ROOT_DIR, file);
        const stats = await stat(filePath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        const outputName = file.replace('.png', '.webp');
        const outputPath = join(ROOT_DIR, outputName);

        console.log(`\nProcessing: ${file} (${sizeMB} MB)`);

        try {
            // Convert to WebP with quality optimization
            await sharp(filePath)
                .webp({ quality: 85 })
                .resize(1920, null, { withoutEnlargement: true })
                .toFile(outputPath);

            const newStats = await stat(outputPath);
            const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
            const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

            console.log(`  -> Created: ${outputName} (${newSizeMB} MB) - ${savings}% smaller`);

            // Delete original PNG
            await unlink(filePath);
            console.log(`  -> Deleted original PNG`);

        } catch (err) {
            console.error(`  Error: ${err.message}`);
        }
    }

    console.log('\nOptimization complete!');
}

optimizeImages().catch(console.error);
