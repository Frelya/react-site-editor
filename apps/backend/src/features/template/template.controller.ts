import { Controller, Get, Delete, Param } from '@nestjs/common';

import { TemplateService } from './template.service';
import { Templates } from './template.type';
import { GetTemplateByIdDto } from '@features/template/dtos';

@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @Get()
    async getAllTemplates(): Promise<Templates.Entity[]> {
        return this.templateService.getAll();
    }

    @Get(':id')
    async getTemplateById(
        @Param('id') id: GetTemplateByIdDto['id'],
    ): Promise<Templates.Entity> {
        return this.templateService.getById({
            id,
        });
    }

    @Delete(':id/delete')
    async deleteTemplate(
        @Param('id') id: GetTemplateByIdDto['id'],
    ): Promise<null> {
        return this.templateService.delete({
            id,
        });
    }
}
