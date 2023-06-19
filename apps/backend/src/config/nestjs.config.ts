import type { ConfigModuleOptions } from '@nestjs/config';

const configModuleOptions: ConfigModuleOptions = {
    cache: true,
    isGlobal: true,
};

export default configModuleOptions;
