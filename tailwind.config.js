/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./*.{html,js}'],
	theme: {
		extend: {
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(-7deg)' },
					'75%': { transform: 'rotate(14deg)' },
					'50%': { transform: 'rotate(7deg)' },
				},
				bounce: {
					'0%, 100%': {
						transform: 'translateY(0%)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
					},
					'25%, 75%': {
						transform: 'translateY(-15%)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
					},
					'50%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
					},
				},
			},
			animation: {
				wiggle: 'wiggle .4s ease-in-out',
				bounce: 'bounce 2s ease-in 2',
			},
		},
	},
	plugins: [],
};
