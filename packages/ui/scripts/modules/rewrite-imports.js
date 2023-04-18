/* eslint-disable no-undef */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pkg from 'fast-glob';
const { sync } = pkg;

console.time('Rewrote imports in');
sync([process.argv.slice(2).join('')]).forEach((file) => {
    file = resolve(process.cwd(), file);
    let content = readFileSync(file, 'utf8');
    let result = content.replace(/(import|export)([^"']*?)(["'])\.(.*?)\3/g, (full, a, b, _, d) => {
        // For idempotency reasons, if `.js` already exists, then we can skip this. This allows us to
        // run this script over and over again without adding .js files every time.
        if (!d.endsWith('.module.css')) {
            return full;
        }
        console.log(d, !d.endsWith('.module.css'));
        console.log(`${a}${b}'.${d}.js'`);

        return `${a}${b}'.${d}.js'`;
    });
    if (result !== content) {
        writeFileSync(file, result, 'utf8');
    }
});
console.timeEnd('Rewrote imports in');
