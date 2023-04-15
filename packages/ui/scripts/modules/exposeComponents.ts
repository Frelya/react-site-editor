import { prettier } from '../../libs';
import * as fs from 'fs';
import * as path from 'path';

// Get all subdirectories of a directory
function getSubdirectories(dirPath: string): string[] {
    return fs
        .readdirSync(dirPath)
        .filter((file) => fs.statSync(path.join(dirPath, file)).isDirectory());
}

const baseDir = 'src/components/exposed';
const componentFiles: string[] = [];

const categoriesDir = getSubdirectories(path.resolve(baseDir));

for (const componentDir of categoriesDir) {
    const categoryDirPath = path.join(baseDir, componentDir);
    const componentsDir = getSubdirectories(categoryDirPath);

    fs.writeFileSync(
        path.join(categoryDirPath, 'index.ts'),
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
            `${categoryDirPath}/${component}/index.ts`,
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
