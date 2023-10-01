import { Injectable, Inject, Scope, ForbiddenException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { DatabaseService, Role } from '@shared/database';
import { ERRORS } from '@shared/constants';
import { handleWithInternalError } from '@/utils';

import { Templates } from './template.type';

@Injectable({ scope: Scope.REQUEST })
export class TemplateService {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly databaseService: DatabaseService,
    ) {}

    private canModifyTemplate(template: Templates.Entity): boolean {
        return this.request.user.role === Role.Admin
            || template.authorId === this.request.user.id;
    }

    private canAccessTemplate(template: Templates.Entity): boolean {
        return this.canModifyTemplate(template)
            || template.isPublic;
    }
    
    async getAll(): Promise<Templates.Entity[]> {
        let templates: Templates.Entity[];
        try {
            templates = await this.databaseService.template.findMany();
        } catch (error) {
            handleWithInternalError(error);
        }

        return templates.filter((template) => {
            return this.canAccessTemplate(template);
        });
    }
    
    async getById(data: Templates.GetByIdPayload): Promise<Templates.Entity> {
        let template: Templates.Entity;

        try {
            template = await this.databaseService.template.findUnique({
                where: { id: data.id },
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        if (!this.canAccessTemplate(template)) {
            throw new ForbiddenException(ERRORS.RESOURCE_NOT_ALLOWED);
        }

        return template;
    }

    async create(data: Templates.CreatePayload): Promise<Templates.Entity> {
        let template: Templates.Entity;

        try {
            template = await this.databaseService.template.create({
                data: {
                    ...data,
                },
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        return template;
    }

    async delete(data: Templates.DeletePayload): Promise<null> {
        let template: Templates.Entity;

        try {
            template = await this.databaseService.template.findUnique({
                where: { id: data.id },
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        if (!this.canModifyTemplate(template)) {
            throw new ForbiddenException(ERRORS.USER_NOT_ALLOWED);
        }

        try {
            await this.databaseService.template.delete({
                where: { id: data.id },
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        return null;
    }
}
