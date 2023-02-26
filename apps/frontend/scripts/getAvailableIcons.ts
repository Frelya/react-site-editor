import fs from 'fs';

/*TODO

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

const directoryPath = './src/components/Icons/AllIcons';
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const fileNames = files
        .map((file) => `'${pascalToKebab(file.split('.')[0])}'`)
        .join(' | ');
    const typeDef = `export type AvailableIcon = ${fileNames} ;`;
    fs.writeFileSync('./src/components/Icons/AvailableIcons.ts', typeDef);

    console.log(typeDef);
});
