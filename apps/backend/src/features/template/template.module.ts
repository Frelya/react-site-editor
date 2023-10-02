import { Module } from '@nestjs/common';

import { DatabaseService } from '@shared/database';

import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
    controllers: [TemplateController],
    providers: [TemplateService, DatabaseService],
    exports: [TemplateService]
})
export class TemplateModule {}
