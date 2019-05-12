import './LoadoutCardContent.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import getImage from 'app/shared/services/armory-image-service'
import RotatedImage from 'app/shared/components/Images/RotatedImage'

class LoadoutCardContent extends Component {
	getWeaponImages(weapons) {
		let images = []

		Object.keys(weapons)
			.forEach((weaponId) => {
				let weapon = weapons[weaponId]

				let weaponImage = getImage('weapons', weapon.type, weapon.platform)
				if (weaponImage) {
					images.push({ rotate: 45, img: weaponImage })
				}
			})

		return images
	}

	render() {
		let { weapons } = this.props 

		if (!weapons || weapons.length === 0) {
			return <div>No items</div>
		}

		let images = this.getWeaponImages(weapons)

		return (
			<div className='loadout-list-item-container'>
				{images.map((image, idx) => (
					<RotatedImage key={ idx } rotateBy={ image.rotate } image={ image.img } />
				))}
			</div>
		)
	}
}

LoadoutCardContent.propTypes = {
	weapons: PropTypes.array
}

LoadoutCardContent.defaultProps = {
	weapons: []
}

export default LoadoutCardContent
