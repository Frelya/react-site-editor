import {
    Injectable,
    Inject,
    Scope,
    BadRequestException,
    NotFoundException,
    ForbiddenException
} from '@nestjs/common';
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
        private readonly databaseService: DatabaseService
    ) {}

    private canModifyTemplate(template: Templates.Entity): boolean {
        return this.request.user.role === Role.Admin || template.authorId === this.request.user.id;
    }

    private canAccessTemplate(template: Templates.Entity): boolean {
        return this.canModifyTemplate(template) || template.isPublic;
    }

    private isValidTree(tree: Templates.Entity['tree']): boolean {
        return JSON.stringify(JSON.parse(tree)) === tree;
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

    async getById(data: Templates.IdPayload): Promise<Templates.Entity> {
        let template: Templates.Entity;

        try {
            template = await this.databaseService.template.findUnique({
                where: { id: data.id }
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        if (!template) {
            throw new NotFoundException(ERRORS.TEMPLATE_NOT_FOUND);
        }

        if (!this.canAccessTemplate(template)) {
            throw new ForbiddenException(ERRORS.RESOURCE_NOT_ALLOWED);
        }

        return template;
    }

    async create(data: Templates.CreatePayload): Promise<Templates.Entity> {
        let template: Templates.Entity;

        if (!this.isValidTree(data.tree)) {
            throw new BadRequestException(ERRORS.INVALID_TEMPLATE);
        }

        try {
            template = await this.databaseService.template.create({
                data: {
                    ...data,
                    isPublic: String(data.isPublic) === 'true',
                    likes: 0,
                    authorId: this.request.user.id,
                    medias: []
                }
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        return template;
    }

    async update(data: Templates.UpdatePayload): Promise<Templates.Entity> {
        let template: Templates.Entity;

        try {
            template = await this.databaseService.template.findUnique({
                where: { id: data.id }
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        if (!template) {
            throw new NotFoundException(ERRORS.TEMPLATE_NOT_FOUND);
        }

        if (!this.canModifyTemplate(template)) {
            throw new ForbiddenException(ERRORS.USER_NOT_ALLOWED);
        }

        if (data.tree && !this.isValidTree(data.tree)) {
            throw new BadRequestException(ERRORS.INVALID_TEMPLATE);
        }

        const { id, ...toUpdate } = data;

        try {
            template = await this.databaseService.template.update({
                where: { id },
                data: {
                    ...toUpdate,
                    isPublic: String(data.isPublic) === 'true'
                }
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
                where: { id: data.id }
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        if (!this.canModifyTemplate(template)) {
            throw new ForbiddenException(ERRORS.USER_NOT_ALLOWED);
        }

        try {
            await this.databaseService.template.delete({
                where: { id: data.id }
            });
        } catch (error) {
            handleWithInternalError(error);
        }

        return null;
    }
}
