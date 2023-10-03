import { Template } from '@shared/database';

export declare namespace Templates {
    type Entity = Template;

    type IdPayload = {
        id: Template['id'];
    };

    type CreatePayload = Pick<Template, 'name' | 'tree' | 'isPublic'>;

    type UpdatePayload = Partial<Omit<Template, 'createdAt' | 'authorId' | 'medias'>>;

    type DeletePayload = IdPayload;
}
