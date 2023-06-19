import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import nestConfigOptions from '@config/nest.config';

@Module({
    imports: [ConfigModule.forRoot(nestConfigOptions)],
    providers: [Logger]
})
export class AppModule {}
