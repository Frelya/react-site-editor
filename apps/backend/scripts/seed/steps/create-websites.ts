import { PrismaClient, Website, User, Template } from '.prisma/client';

import { websitesData } from '../data';

export async function createWebsites(
    client: PrismaClient,
    authorIds: User['id'][],
    templatesIds: Template['id'][]
): Promise<Website['id'][]> {
    websitesData[0].authorId = authorIds[0];

    websitesData[1].authorId = authorIds[1];
    websitesData[1].templateId = templatesIds[1];

    return Promise.all(
        websitesData.map(async (websiteData) => {
            const { id } = await client.website.upsert({
                where: {
                    url: websiteData.url
                },
                update: websiteData,
                create: websiteData,
                select: {
                    id: true
                }
            });

            return id;
        })
    );
}
