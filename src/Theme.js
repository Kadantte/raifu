import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#CA054D'
		},
		background: {
			default: '#282b35',
			paper: '#3B3E47'
		}
	},
	typography: {
		useNextVariants: true,
		fontFamily: ['Alata', 'sans-serif'].join(','),
		h2: {
			fontSize: '4rem',
		}
	},
	overrides: {
		MuiCardHeader: {
			root: {
				'@media (max-width: 767px)': {
					paddingLeft: '16px',
					paddingRight: '16px'
				}
			},
			title: {
				textTransform: 'uppercase',
				fontSize: '1.1rem',
				fontWeight: '700',
				'@media (max-width: 767px)': {
					fontSize: '0.8rem'
				}
			},
			subheader: {
				textTransform: 'uppercase',
				fontSize: '0.8rem',
				'@media (max-width: 767px)': {
					fontSize: '0.6rem'
				},
				paddingTop: '-5px',
				paddingBottom: '5px',
				borderBottom: '2px solid #CA054D'
			}
		},
		MuiCardContent: {
			root: {
				wordBreak: 'break-all'
			}
		}
	}
})
