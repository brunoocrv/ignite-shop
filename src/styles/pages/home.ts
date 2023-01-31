import { styled } from '..'

export const HomeContainer = styled('main', {
	display: 'flex',
	width: '100%',
	maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
	marginLeft: 'auto'
})

export const Product = styled('div', {
	background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
	borderRadius: 8,
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	overflow: 'hidden',

	strong: {
		fontSize: '$lg',
		color: '$gray300'
	},

	span: {
		fontSize: '$xl',
		fontWeight: 'bold',
		color: '$green300'
	},

	img: {
		objectFit: 'cover'
	},

	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '2rem',
		position: 'absolute',
		bottom: '0.25rem',
		left: '0.25rem',
		right: '0.25rem',
		borderRadius: 4,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',

		transform: 'translateY(110%)',
		opacity: 0,
		transition: 'all 0.2s ease-in-out'
	},

	'&:hover': {
		footer: {
			transform: 'translateY(0%)',
			opacity: 1
		}
	}
})
