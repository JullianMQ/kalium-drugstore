/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './src/**/*.{html,js}',
        './public/**/*.{html, js}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': {
                    DEFAULT: '#ffa500',
                    100: '#332100',
                    200: '#664200',
                    300: '#996300',
                    400: '#fe7e00',
                    500: '#ff7e00',
                    600: '#fe8a00',
                    700: '#fea800',
                    800: '#ffdb99',
                    900: '#ffedcc'
                },
                'gold': {
                    DEFAULT: '#f5a300',
                    100: '#312100',
                    200: '#624100',
                    300: '#936200',
                    400: '#c48300',
                    500: '#f5a300',
                    600: '#ffb82b',
                    700: '#ffca60',
                    800: '#ffdc95',
                    900: '#ffedca'
                },
                'amber': {
                    DEFAULT: '#ffbf00',
                    100: '#332600',
                    200: '#664d00',
                    300: '#997300',
                    400: '#cc9900',
                    500: '#ffbf00',
                    600: '#ffcc33',
                    700: '#ffd966',
                    800: '#ffe699',
                    900: '#fff2cc'
                },
                'yellow': {
                    DEFAULT: '#f6c300',
                    100: '#312700',
                    200: '#624e00',
                    300: '#937600',
                    400: '#c49d00',
                    500: '#f6c300',
                    600: '#ffd52b',
                    700: '#ffdf60',
                    800: '#ffea95',
                    900: '#fff4ca'
                },
                'piss': {
                    DEFAULT: '#f5e300',
                    100: '#312e00',
                    200: '#625b00',
                    300: '#938900',
                    400: '#c4b700',
                    500: '#f5e300',
                    600: '#fff12b',
                    700: '#fff460',
                    800: '#fff895',
                    900: '#fffbca'
                },
                'secondary': {
                    DEFAULT: '#0099ff',
                    100: '#001f33',
                    200: '#003d66',
                    300: '#005c99',
                    400: '#007acc',
                    500: '#0099ff',
                    600: '#33adff',
                    700: '#66c2ff',
                    800: '#99d6ff',
                    900: '#ccebff'
                },
                'tertiary': {
                    DEFAULT: '#e4e4e4',
                    100: '#2d2d2d',
                    200: '#5b5b5b',
                    300: '#888888',
                    400: '#b6b6b6',
                    500: '#e4e4e4',
                    600: '#e9e9e9',
                    700: '#eeeeee',
                    800: '#f4f4f4',
                    900: '#f9f9f9'
                },
            },
            fontFamily: {
                'sans': ['Inter', 'Montserrat', 'sans-serif'],
            },
            keyframes: {
                'fade-in-right': {
                    "100%": { opacity: 1, transform: "translateX(200px)" },
                    "50%": { opacity: 0.5, transform: "translateX(100px)" },
                    "0%": { opacity: 0, transform: "translateX(0px)" }, },
            },
            animation: {
                // add something here
                "fade-in-right": "fade-in-right 1s ease-out ",
            },
        },
        plugins: [require("tailwindcss-animate")]
    }
}
