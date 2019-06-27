import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'
import DeleteButton from 'app/shared/components/Buttons/DeleteButton'

import './ArmoryCard.css'

export default function ArmoryCard({ item, category, canDelete, onClick, onDelete, style }) {
	return (
		<Card style={ style } onClick={ onClick } className='card armory-card' >
			{ canDelete && <DeleteButton onClick={ onDelete } /> }
			<CardHeader title={ item.getTitle() } subheader={ item.getSubtitle() } className='card-header' />
			<CardContent className='card-content'>
				<ArmoryItemImage entity={ item } category={ category } />
			</CardContent>
		</Card>
	)
}

ArmoryCard.propTypes = {
	item: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear']).isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	style: PropTypes.object,
}

ArmoryCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	style: {}
}