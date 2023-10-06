import { PrismaClient, User } from '.prisma/client';

import { usersData } from '../data';

export async function createUsers(client: PrismaClient): Promise<User['id'][]> {
    await client.user.deleteMany({});

    return Promise.all(
        usersData.map(async (userData) => {
            const { id } = await client.user.upsert({
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
