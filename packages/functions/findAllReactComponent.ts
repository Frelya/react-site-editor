import fs from 'fs';
import path from 'path';

const findReactComponents = (basePath: string) => {
    const components: string[] = [];
    const readDir = (dirPath: string) => {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                readDir(filePath);
            } else if (
                (stat.isFile() && file.endsWith('.js')) ||
                file.endsWith('.jsx') ||
                file.endsWith('.tsx')
            ) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (
                    fileContent.includes('import React from') ||
                    fileContent.includes('import * as React from')
                ) {
                    components.push(filePath);
                }
            }
        });
    };
    readDir(basePath);
    return components;
};

export const components = findReactComponents('../ui/src');

// run npx ts-node findAllReactComponent.ts in current directory
console.log(components);
