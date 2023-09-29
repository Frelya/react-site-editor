import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database';
import { handleWithInternalError } from '@/utils';

import { Templates } from './template.type';

@Injectable()
export class TemplateService {
    constructor(
        private readonly databaseService: DatabaseService,
    ) {}
    
    async getAll(): Promise<Templates.Entity[]> {
        try {
            return await this.databaseService.template.findMany();
        } catch (error) {
            handleWithInternalError(error);
        }
    }
    
    async getById(id: string): Promise<Templates.Entity> {
        try {
            return await this.databaseService.template.findUnique({
                where: { id },
            });
        } catch (error) {
            handleWithInternalError(error);
        }
    }
}
