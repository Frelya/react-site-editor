import type { ConfigModuleOptions } from '@nestjs/config';

const nestConfigOptions: ConfigModuleOptions = {
    cache: true,
    isGlobal: true
};

export default nestConfigOptions;
