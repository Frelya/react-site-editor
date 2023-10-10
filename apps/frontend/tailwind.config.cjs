const plugin = require('tailwindcss/plugin');
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'functional-grey': '#64748b'
            },
            gridTemplateColumns: {
                'auto-fit': 'repeat(auto-fit, minmax(6rem, 1fr))'
            }
        }
    },
    darkMode: 'class',
    plugins: [
        nextui({
            defaultTheme: 'dark'
        }),
        plugin(function ({ addVariant }) {
            addVariant('number-spin', '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button');
        })
    ]
};
