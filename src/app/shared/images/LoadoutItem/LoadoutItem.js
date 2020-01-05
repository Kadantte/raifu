import React from 'react'
import PropTypes from 'prop-types'

import DeleteButton from 'app/shared/buttons/DeleteButton'
import LoadoutItemImage from './LoadoutItemImage'

import './LoadoutItem.css'

export default function LoadoutItem({ item, category, textStyle, canDelete, onDelete }) {
	return (
		<div className='loadout-item'>
			{ canDelete && <DeleteButton style={ {top: '10px'} } onClick={ onDelete } /> }
			<LoadoutItemImage item={ item } category={ category } textStyle={ textStyle } />		
		</div>
	)
}

LoadoutItem.propTypes = {
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
	item: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired
	}).isRequired,
	textStyle: PropTypes.object,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func
}

LoadoutItem.defaultProps = {
	textStyle: {},
	canDelete: false,
	onDelete: () => {}
}