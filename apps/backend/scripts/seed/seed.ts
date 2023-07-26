import { PrismaClient } from '.prisma/client';

import { isDevelopment } from '../../src/config/env.config';

import { createUsers, createTemplates, createWebsites } from './steps';

async function seed(client: PrismaClient) {
    const usersIds = await createUsers(client);
    const templatesIds = await createTemplates(client, usersIds);
    await createWebsites(client, usersIds, templatesIds);
}

if (isDevelopment()) {
    console.log('\n🌱  Seeding database...');

    const prisma = new PrismaClient();

    seed(prisma)
        .then(() => {
            console.log('\n🌱  Seed completed successfully !');
        })
        .catch(async (error) => {
            console.error(error);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
} else {
    console.error(
        '\n🚫  Seed is only available in development mode !\n' +
            '    Change the NODE_ENV variable to development and try again.'
    );
}
