import React from 'react'
import PropType from 'prop-types'

import { withTheme } from '@material-ui/core'

import { ArmoryCard } from 'app/shared/components/Cards/Entities'

function ArmoryItemSelect ({theme, items, category, selectedItemIds, onItemSelected }) {

	const cardStyle = {
		height: '220px',
		width: '30%',
		minWidth: '0',
		marginRight: '0'
	}
	
	const selectedCardStyle = {
		...cardStyle,
		transform: 'scale(1.05)',
		border: `1px solid ${theme.palette.primary.main}`
	}

	return (
		<div className='loadout-select-list'>
			{ items.map(item => (
				<ArmoryCard 
					key={ item.id } 
					category={ category }
					item={ item } 
					style={ selectedItemIds.find(id => id === item.id) ? selectedCardStyle : cardStyle }
					onClick={ () => onItemSelected(item.id) } />
			))}
		</div>
	)
}

ArmoryItemSelect.propTypes = {
	items: PropType.array,
	category: PropType.oneOf(['weapons', 'attachments', 'gear']).isRequired,
	selectedItemIds: PropType.arrayOf(PropType.string),
	onItemSelected: PropType.func
}

ArmoryItemSelect.defaultProps = {
	items: [],
	selectedItemIds: [],
	onItemSelected: (item) => {}
}

export default withTheme()(ArmoryItemSelect)