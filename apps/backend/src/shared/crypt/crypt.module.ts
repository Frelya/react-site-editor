import { Module } from '@nestjs/common';

import { EnvModule } from '@shared/env';

import { CryptService } from './crypt.service';

@Module({
    imports: [EnvModule],
    providers: [CryptService],
    exports: [CryptService]
})
export class CryptModule {}
