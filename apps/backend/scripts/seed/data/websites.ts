import { Prisma, MediaType } from '.prisma/client';

const websitesData: Prisma.XOR<Prisma.WebsiteCreateInput, Prisma.WebsiteUncheckedCreateInput>[] = [
    {
        url: 'https://mywebsite.com',
        tree: '{"pages":[{"title":"Home","url":"/","content":"Welcome to my website!"}]}',
        createdAt: new Date(),
        authorId: '<user_id>',
        templateId: null,
        medias: [
            {
                name: 'Sample Image',
                type: MediaType.Image,
                uri: '/path/to/image.jpg',
                createdAt: new Date()
            }
        ]
    },
    {
        title: 'My Website',
        url: 'https://mysecondwebsite.com',
        tree: '{"pages":[{"title":"Home","url":"/","content":"Welcome to my second website!"}]}',
        createdAt: new Date(),
        authorId: '<user_id>',
        templateId: '<template_id>',
        medias: []
    }
];

export default websitesData;
