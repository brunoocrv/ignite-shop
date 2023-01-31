import { createStitches } from '@stitches/react'

export const {
	config,
	styled,
	globalCss,
	keyframes,
	getCssText,
	theme,
	createTheme,
	css
} = createStitches({
	theme: {
		colors: {
			white: '#FFFF',
			gray900: '#121214',
			gray800: '#282324',
			gray300: '#c4c4c4',
			gray100: '#e1e1e1',
			green500: '#00875F',
			green300: '#00B37E'
		},
		fontSizes: {
			md: '1.125rem',
			lg: '1.25rem',
			xl: '1.5rem',
			'2xl': '2rem'
		}
	}
})