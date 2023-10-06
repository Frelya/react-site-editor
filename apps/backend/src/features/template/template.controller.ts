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
    async createTemplate(@Body() createDto: CreateTemplateDto): Promise<Templates.Entity> {
        return this.templateService.create(createDto);
    }

    @Get(':id')
    async getTemplateById(@Param() routeParams: GetTemplateByIdDto): Promise<Templates.Entity> {
        return this.templateService.getById(routeParams);
    }

    @Post(':id')
    async updateTemplate(
        @Param() routeParams: GetTemplateByIdDto,
        @Body() updateDto: UpdateTemplateDto
    ): Promise<Templates.Entity> {
        return this.templateService.update({
            ...updateDto,
            id: routeParams.id
        });
    }

    @Delete(':id')
    async deleteTemplate(@Param() routeParams: GetTemplateByIdDto): Promise<null> {
        return this.templateService.delete(routeParams);
    }
}
