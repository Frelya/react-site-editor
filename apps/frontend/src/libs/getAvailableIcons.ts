import * as fs from 'fs';
/* TODO 
I don't know why this
import { pascalToKebab } from '@react-site-editor/functions';
don't works
*/

function pascalToKebab(s: string) {
    const pattern = /\.?([A-Z]+[a-z]*)/g;
    return s.replace(pattern, function (substring, ...args) {
        substring = substring.toLowerCase();
        if (args[1] > 0) {
            substring = '-' + substring;
        }
        return substring;
    });
}

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

    console.log(
        '\n> Icons types definition generated successfully !' +
            `\n> ${iconNames.length} icons found in '${iconsDirectory}':`
    );

    for (const name of iconNames) {
        console.log(`  --> ${name.slice(1, name.length - 1)}`);
    }
});
