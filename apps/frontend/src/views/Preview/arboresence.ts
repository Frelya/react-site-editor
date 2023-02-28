import type { PreviewTree } from '@libs/types/tree.type';

const previewTree: PreviewTree = [
    {
        id: 'Button',
        props: {
            logo: './path/to/logo.png',
            color: '#ded',
            links: [
                {
                    label: 'fr',
                    path: 'www.google.com'
                },
                {
                    label: 'fr',
                    path: 'https://google.com'
                }
            ]
        },
        children: [
            {
                id: 'Button2',
                props: {
                    link: 'de',
                    label: 'ded',
                    hoverClass: ''
                }
            }
        ]
    },
    {
        id: 'Button',
        props: {},
        children: [
            {
                id: 'Button2',
                props: {
                    fontSize: {
                        type: 'size',
                        value: 1
                    },
                    label: 'ded',
                    hoverClass: ''
                }
            },
            {
                id: 'Button2',
                props: {
                    link: 'de',
                    label: 'ded',
                    hoverClass: ''
                }
            },
            {
                id: 'Button2',
                props: {
                    link: 'de',
                    label: 'ded',
                    hoverClass: ''
                }
            }
        ]
    },
    {
        id: 'Button',
        props: {},
        children: [
            {
                id: 'Button2',
                props: {
                    link: 'de',
                    label: 'ded',
                    hoverClass: ''
                }
            },
            {
                id: 'Button2',
                props: {
                    link: 'de',
                    text: {
                        type: 'text',
                        value: 'ded'
                    },
                    hoverClass: ''
                }
            }
        ]
    }
    /*{
        id: '@/components/Hero1',
        props: {
            title: "You're on the best site ever",
            subtitle: 'ever and ever',
            color: '#dedede'
        },
        children: [
            {
                id: '@/components/CTA',
                props: {
                    label: 'Click here ❤️',
                    subtitle: 'ever and ever',
                    color: '#dedede'
                }
            }
        ]
    }*/
];

export default previewTree;
