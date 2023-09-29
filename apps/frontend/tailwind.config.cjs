const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
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
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('number-spin', '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button');
        })
    ]
};
