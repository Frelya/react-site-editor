const toto = [
    {
        id: '@/path/to/component',
        props: {
            first: 'de',
            second: 'ded'
        },
        children: [
            {
                id: '@/path/to/component',
                props: {
                    first: 'de',
                    second: 'ded'
                }
            }
        ]
    }
];

const my = [
    {
        id: '@/components/NavBar',
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
                id: '@/components/NavLink',
                props: {
                    link: 'de',
                    label: 'ded',
                    hoverClass: ''
                }
            },
            {
                id: '@/components/OtherComp',
                props: {
                    first: 'de',
                    second: 'ded'
                }
            }
        ]
    },
    {
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
    }
];