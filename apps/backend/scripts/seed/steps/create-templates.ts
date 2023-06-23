import { PrismaClient, Template, User } from '.prisma/client';

import { templatesData } from '../data';

export async function createTemplates(
    client: PrismaClient,
    authorIds: User['id'][]
): Promise<Template['id'][]> {
    templatesData[1].authorId = authorIds[1];

    return Promise.all(
        templatesData.map(async (templateData) => {
            const { id } = await client.template.upsert({
                where: {
                    name: templateData.name
                },
                update: templateData,
                create: templateData,
                select: {
                    id: true
                }
            });

            return id;
        })
    );
}
