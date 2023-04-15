import * as fs from 'fs';
import * as path from 'path';
import { format } from 'prettier';

// Récupère les sous-dossiers d'un dossier
function getSubdirectories(dirPath: string): string[] {
    return fs
        .readdirSync(dirPath)
        .filter((file) => fs.statSync(path.join(dirPath, file)).isDirectory());
}

function prettier(str: string) {
    return format(str, prettierOptions);
}

const baseDir = 'src/components/exposed';
const prettierOptions = { parser: 'typescript', singleQuote: true };
const componentFiles: string[] = [];

const categoriesDir = getSubdirectories(path.resolve(baseDir));

for (const componentDir of categoriesDir) {
    const componentDirPath = path.join(baseDir, componentDir);
    const componentsDir = getSubdirectories(componentDirPath);
    fs.writeFileSync(
        componentDirPath + '/index.ts',
        componentsDir
            .map((name) =>
                prettier(
                    `export { default as ${name} } from './${name}';
                    export * from './${name}';`
                )
            )
            .join('\n')
    );
    for (const component of componentsDir) {
        fs.writeFileSync(
            `${componentDirPath}/${component}/index.ts`,
            prettier(
                `export { default } from './${component}';
                export { defaultProps as ${
                    component.charAt(0).toLowerCase() + component.slice(1)
                }DefaultProps } from './${component}';
                export * from './${component}.types';`
            )
        );
    }
    componentFiles.push(componentDir + '/' + componentDir);
}

const componentNames = componentFiles.map((file) => path.basename(file, '.tsx'));

const indexFile = path.join(__dirname, '../src/index.ts');

fs.writeFileSync(
    indexFile,
    componentNames
        .map((name) => prettier(`export * from './components/exposed/${name}';`))
        .join('\n') +
        '\n' +
        prettier(`export * from './components';`)
);

console.log(`Exported ${componentNames.length} categories of components to ${indexFile}`);
