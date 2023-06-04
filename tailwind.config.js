/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"!./components/loading/**/*.vue"
	],
	theme: {
		margin: {
			'0': '0',
			'5': '5px',
			'10': '10px',
			'12': '12px',
			'20': '20px',
			'30': '30px',
			'40': '40px',
			'50': '50px',
			'60': '60px',
			'70': '70px',
			'80': '80px',
		},
		padding: {
			'0': '0',
			'5': '5px',
			'10': '10px',
			'12': '12px',
			'20': '20px',
			'30': '30px',
			'40': '40px',
			'50': '50px',
			'60': '60px',
			'70': '70px',
			'80': '80px',
		},
		borderRadius: {
			'5': '5px',
			'10': '10px',
			'20': '20px',
			'30': '30px',
		},
		borderWidth: {
			'0': '0',
			'1': '1px',
		},
		extend: {},
	},
	plugins: [],
}

