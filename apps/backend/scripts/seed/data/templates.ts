import { Prisma, MediaType } from '.prisma/client';

const templatesData: Prisma.XOR<Prisma.TemplateCreateInput, Prisma.TemplateUncheckedCreateInput>[] =
    [
        {
            name: 'Sample Template',
            tree: '{"pages":[{"title":"Home","url":"/","content":"Welcome to my template!"}]}',
            createdAt: new Date(),
            likes: 10,
            medias: [],
            authorId: null
        },
        {
            name: 'Sample Template 2',
            title: 'My Template',
            tree: '{"pages":[{"title":"Contact","url":"/contact","content":"Welcome to my second template!"}]}',
            createdAt: new Date(),
            medias: [
                {
                    name: 'Sample Video',
                    type: MediaType.Video,
                    uri: '/path/to/image.jpg',
                    createdAt: new Date()
                }
            ],
            authorId: '<user_id>'
        }
    ];

export default templatesData;
