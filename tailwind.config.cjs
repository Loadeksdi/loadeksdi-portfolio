/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				monospace: ['Source Code Pro', 'monospace'],
				sans: ['Arimo', 'sans-serif'],
			}
		},
	},
	plugins: [],
}
