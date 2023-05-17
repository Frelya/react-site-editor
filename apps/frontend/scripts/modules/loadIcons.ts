import { pascalToKebab } from '@react-site-editor/functions';
import * as fs from 'fs';

/*
 * This script must mandatory be run from:
 * - either from the root of the project using the command:
 *     > pnpm frontend:icons
 * - or from the frontend directory using the command:
 *     > pnpm icons
 */
const iconsDirectories = ['./src/components/Icons', './../../packages/ui/src/components/icons'];
const typesFile = './src/types/icons.type.ts';

const iconNames: string[] = [];

iconsDirectories.forEach((iconsDirectory) => {
    const files: string[] = fs.readdirSync(iconsDirectory);

    files.forEach((file) => {
        iconNames.push(`'${pascalToKebab(file.split('.')[0])}'`);
    });

    console.log(`\n> ${files.length} icons found in '${iconsDirectory}'`);
});

const typeDefinition = `export type IconName = ${iconNames.join(' | ')} ;`;

fs.writeFileSync(typesFile, typeDefinition);

console.log(`\n> ${iconNames.length} icons found in total:`);

for (const name of iconNames) {
    console.log(`  --> ${name.slice(1, name.length - 1)}`);
}
