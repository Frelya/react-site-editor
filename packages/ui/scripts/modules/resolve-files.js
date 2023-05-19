/* eslint-disable no-undef */
import pkg from 'fast-glob';
const { sync } = pkg;

let parts = process.argv.slice(2);
let [args, flags] = parts.reduce(
    ([argss, flagss], part) => {
        if (part.startsWith('--')) {
            flagss[part.slice(2, part.indexOf('='))] = part.slice(part.indexOf('=') + 1);
        } else {
            argss.push(part);
        }
        return [argss, flagss];
    },
    [[], {}]
);

flags.ignore = flags.ignore ?? '';
flags.ignore = flags.ignore.split(',').filter(Boolean);

console.log(
    sync(args.join(''))
        .filter((file) => {
            for (let ignore of flags.ignore) {
                if (file.includes(ignore)) {
                    return false;
                }
            }
            return true;
        })
        .join('\n')
);
