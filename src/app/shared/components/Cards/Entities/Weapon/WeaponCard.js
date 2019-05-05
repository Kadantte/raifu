import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'
import DeleteButton from 'app/shared/components/Buttons/DeleteButton'

import './WeaponCard.css'

export default function WeaponCard({ weapon, canDelete, onClick, onDelete, style }) {
	return (
		<Card style={ style } onClick={ onClick } className='card weapon-card' >
			{ canDelete && <DeleteButton onClick={ onDelete } /> }
			<CardHeader title={ weapon.getTitle() } subheader={ weapon.getSubtitle() } className='card-header' />
			<CardContent className='card-content'>
				<ArmoryItemImage entity={ weapon } category='weapons' />
			</CardContent>
		</Card>
	)
}

WeaponCard.propTypes = {
	weapon: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	style: PropTypes.object,
}

WeaponCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	style: {}
}