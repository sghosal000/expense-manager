/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				palanquin: ['Palanquin', 'sans-serif'],
			},

			colors: {
				background: "#0f172a",		// overall background (slate-900)
				base: "#334155",			// main theme color, used on cards, components.. (slate-700)
				neutral: "#1e293b",			// for borders, divider-like other elements (slate-800)
				accent: "#0ea5e9",			// for buttons, links and other highlighted elements (sky-500)
				txt: "#e2e8f0",				// for normal texts
				"txt-depressed": "#94a3b8", // for depressed texts
				danger: "#ef4444",			// for delete functionalities
			},

			backgroundImage: {
				
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}

