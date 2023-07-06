import type { ServeStaticModuleOptions } from '@nestjs/serve-static';
import * as path from 'path';

const serveStaticOptions: ServeStaticModuleOptions = {
    rootPath: path.join(__dirname, '..', '..', 'docs'),
    serveRoot: '/docs'
};

export { serveStaticOptions };
