/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xxl: '1800px', // Novo breakpoint adicionado
      },
      colors: {
        primary: {
          'blue-100': '#EFF6FE',
          'blue-200': '#E1F0FE',
          'blue-300': '#C9E0FC',
          'blue-400': '#A8CBF9',
          'blue-500': '#85ACF4',
          'blue-600': '#678DED',
          'blue-700': '#4B6AE0',
          'blue-800': '#3D57C5',
          'blue-900': '#344A9F',
          'blue-1000': '#31437E',
          'blue-1100': '#131931',
          DEFAULT: '#131931',
          light: '#A8CBF9',
          dark: '#152E56',
        },
        secondary: {
          'green-100': '#FDFEE7',
          'green-200': '#FAFDCA',
          'green-300': '#F4FB9B',
          'green-400': '#E8F561',
          'green-500': '#D9EB3F',
          'green-600': '#B9D012',
          'green-700': '#91A60A',
          'green-800': '#6C7E0D',
          'green-900': '#566410',
          'green-1000': '#485413',
          'green-1100': '#262F04',
          DEFAULT: '#91A60A',
          light: '#D9EB3F',
          dark: '#262F04',
        },
        aditional: {
          'limon-green': '#2DF495',
          'background-color': '#DFDFDF',
          yellow: '#ECC115',
          red: '#CA1515',
          'black-blue': '#091931',
          gray: '#C5C6CB',
          'light-gray': '#EDEDED',
          'gray-blue': '#607392',
        },
      },
    },
    plugins: [],
  },
}
