import { pascalToKebab } from '@react-site-editor/functions';
import * as fs from 'fs';

/*
 * This script must mandatory be run from:
 * - either from the root of the project using the command:
 *     > npm run frontend icons
 * - or from the frontend directory using the command:
 *     > npm run icons
 */

const iconsDirectory = './src/components/Icons';
const typesFile = './src/libs/types/icons.type.ts';

fs.readdir(iconsDirectory, (error, files) => {
    if (error) {
        console.error(error);
        return;
    }

    const iconNames = files.map(
        (file) => `'${pascalToKebab(file.split('.')[0])}'`
    );

    const typeDefinition = `export type IconName = ${iconNames.join(' | ')} ;`;

    fs.writeFileSync(typesFile, typeDefinition);

    console.log(`\n> ${iconNames.length} icons found in '${iconsDirectory}':`);

    for (const name of iconNames) {
        console.log(`  --> ${name.slice(1, name.length - 1)}`);
    }
});
