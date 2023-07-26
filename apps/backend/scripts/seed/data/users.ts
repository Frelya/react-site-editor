import { Prisma, Role, Membership } from '.prisma/client';

const usersData: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>[] = [
    {
        role: Role.Admin,
        username: 'admin',
        email: 'admin-password123@example.com',
        password: '$2b$10$Rge/ieVfL4nv1//3anhHEemd66kn1sA9PxOaLc7DWGGVxoMllBtey',
        firstName: 'John',
        lastName: 'Doe',
        membership: Membership.Premium,
        lastLogin: null,
        createdAt: new Date()
    },
    {
        role: Role.User,
        username: 'johndoe',
        email: 'johndoe-pwd123@example.com',
        password: '$2b$10$r8LyyLQNOFzjY1jZ/M0Bp.K6tpwNj.CqBDqaIZsJHvFqeb8U7wl32',
        firstName: null,
        lastName: 'Doe',
        membership: Membership.Free,
        lastLogin: new Date(),
        createdAt: new Date()
    }
];

export default usersData;
