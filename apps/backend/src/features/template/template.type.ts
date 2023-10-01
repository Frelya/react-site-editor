import { Template, Database } from '@shared/database';

export declare namespace Templates {
    type Entity = Template;

    type GetByIdPayload = {
        id: Template['id'];
    }

    type CreatePayload = Omit<Template, 'id' | 'createdAt' | 'authorId'>;

    type DeletePayload = GetByIdPayload;
}
