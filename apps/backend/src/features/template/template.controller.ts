import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';

import { TemplateService } from './template.service';
import { Templates } from './template.type';
import { CreateTemplateDto, GetTemplateByIdDto, UpdateTemplateDto } from '@features/template/dtos';

@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @Get()
    async getAllTemplates(): Promise<Templates.Entity[]> {
        return this.templateService.getAll();
    }

    @Post()
    async createTemplate(@Body() body: CreateTemplateDto): Promise<Templates.Entity> {
        return this.templateService.create(body);
    }

    @Get(':id')
    async getTemplateById(@Param() params: GetTemplateByIdDto): Promise<Templates.Entity> {
        return this.templateService.getById(params);
    }

    @Post(':id')
    async updateTemplate(
        @Param() params: GetTemplateByIdDto,
        @Body() body: UpdateTemplateDto
    ): Promise<Templates.Entity> {
        return this.templateService.update({
            id: params.id,
            ...body
        });
    }

    @Delete(':id')
    async deleteTemplate(@Param() params: GetTemplateByIdDto): Promise<null> {
        return this.templateService.delete(params);
    }
}
