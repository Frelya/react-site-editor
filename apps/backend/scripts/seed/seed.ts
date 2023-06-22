import { PrismaClient, User, Template, Website } from '.prisma/client';

import { NodeEnvs } from '../../src/shared/constants';

import usersData from './data/users';
import templatesData from './data/templates';
import websitesData from './data/websites';

if (process.env.NODE_ENV === NodeEnvs.DEVELOPMENT) {
    const prisma = new PrismaClient();

    async function createUsers(): Promise<User['id'][]> {
        return Promise.all(
            usersData.map(async (userData) => {
                const { id } = await prisma.user.upsert({
                    where: {
                        email: userData.email
                    },
                    update: userData,
                    create: userData,
                    select: {
                        id: true
                    }
                });

                return id;
            })
        );
    }

    async function createTemplates(authorIds: User['id'][]): Promise<Template['id'][]> {
        templatesData[1].authorId = authorIds[1];

        return Promise.all(
            templatesData.map(async (templateData) => {
                const { id } = await prisma.template.upsert({
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

    async function createWebsites(
        authorIds: User['id'][],
        templatesIds: Template['id'][]
    ): Promise<Website['id'][]> {
        websitesData[0].authorId = authorIds[0];

        websitesData[1].authorId = authorIds[1];
        websitesData[1].templateId = templatesIds[1];

        return Promise.all(
            websitesData.map(async (websiteData) => {
                const { id } = await prisma.website.upsert({
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

    async function seed() {
        const usersIds = await createUsers();
        const templatesIds = await createTemplates(usersIds);
        await createWebsites(usersIds, templatesIds);
    }

    console.log('\n🌱  Seeding database...');

    seed()
        .then(() => {
            console.log('\n🌱  Seed completed successfully !');
        })
        .catch(async (error) => {
            console.error(error);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
} else {
    console.error(
        '\n🚫  Seed is only available in development mode !\n' +
        '    Change the NODE_ENV variable to development and try again.'
    );
}
