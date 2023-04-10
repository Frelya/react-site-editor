const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {}
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('number-spin', '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button');
        })
    ]
};
