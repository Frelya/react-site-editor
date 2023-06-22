import { Prisma, Role, Membership } from '.prisma/client';

const usersData: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>[] = [
    {
        role: Role.Admin,
        username: 'admin',
        email: 'admin@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        membership: Membership.Premium,
        lastLogin: null,
        createdAt: new Date(),
    },
    {
        role: Role.User,
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'pwd123',
        firstName: null,
        lastName: 'Doe',
        membership: Membership.Free,
        lastLogin: new Date(),
        createdAt: new Date(),
    },
];

export default usersData;
