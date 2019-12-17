import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import LoadoutContext from './LoadoutContext'
import database from '../../../../firebase/database'

const LoadoutContextProvider = ({ loadout, editable, children }) => {
	let [currentLoadout, setLoadout] = useState(loadout)

	useEffect(() => setLoadout(loadout), [loadout])

	let addWeapon = useCallback(async (weaponId) => {
		// Save
		const weapon = await database.loadouts
			.loadout(currentLoadout.id)
			.weapons
			.add(weaponId)

		// Update
		setLoadout((currentLoadout) => ({ 
			...currentLoadout,
			weapons: [ ...currentLoadout.weapons, weapon ]
		}))
	}, [currentLoadout])

	let deleteWeapon = useCallback(async (weaponId) => {
		// Save
		await database.loadouts
			.loadout(currentLoadout.id)
			.weapons
			.delete(weaponId)

		// Update
		setLoadout((currentLoadout) => ({ 
			...currentLoadout,
			weapons: currentLoadout.weapons.filter((w) => w.id !== weaponId)
		}))
	}, [currentLoadout])

	let addGear = useCallback(async (ids) => {
		// Save
		let promises = ids.map(gearId => {
			return database.loadouts
				.loadout(currentLoadout.id)
				.gear
				.add(gearId)
		})

		let newGear = await Promise.all(promises)

		// Update
		setLoadout((currentLoadout) => ({ 
			...currentLoadout,
			gear: [ ...currentLoadout.gear, ...newGear ]
		}))
	}, [currentLoadout])

	let deleteGear = useCallback(async (gearId) => {
		// Save
		await database.loadouts
			.loadout(currentLoadout.id)
			.gear
			.delete(gearId)

		// Update
		setLoadout((currentLoadout) => ({ 
			...currentLoadout,
			gear: currentLoadout.gear.filter((g) => g.id !== gearId)
		}))
	}, [currentLoadout])

	let addWeaponAttachments = useCallback(async (weaponId, attachmentIds) => {
		// Save
		let addToDbPromises = attachmentIds.map(attachmentId => {
			return database.loadouts
				.loadout(currentLoadout.id)
				.weapons
				.weapon(weaponId)
				.attachments
				.add(attachmentId)				
		})

		let newAttachments = await Promise.all(addToDbPromises)

		// Update
		setLoadout((currentLoadout) => {
			let weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

			// Find the weapon to add the attachment to and create a copy
			let weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

			// Add the attachment to the weapon
			weaponToAddTo.attachments = [ ...(weaponToAddTo.attachments || []), ...newAttachments]

			// Rebuild up the state object, ensuring we preserve the order of weapons
			let newWeapons = currentLoadout.weapons.slice()
			newWeapons[weaponIndex] = weaponToAddTo

			return { ...currentLoadout, weapons: newWeapons }
		})
	}, [currentLoadout])

	let deleteWeaponAttachment = useCallback(async (weaponId, attachmentId) => {
		// Save
		await database.loadouts
			.loadout(currentLoadout.id)
			.weapons
			.weapon(weaponId)
			.attachments
			.delete(attachmentId)

		// Update
		setLoadout((currentLoadout) => {
			let weaponIndex = currentLoadout.weapons.findIndex((w) => w.id === weaponId)

			// Find the weapon to delete the attachment on and create a copy
			let weaponToAddTo = { ...currentLoadout.weapons[weaponIndex] }

			// Remove attachment
			weaponToAddTo.attachments = weaponToAddTo.attachments.filter((a) => a.id !== attachmentId)

			// Rebuild up the state object, ensuring we preserve the order of weapons
			let newWeapons = currentLoadout.weapons.slice()
			newWeapons[weaponIndex] = weaponToAddTo

			return { ...currentLoadout, weapons: newWeapons }
		})
	}, [currentLoadout])

	return (
		<LoadoutContext.Provider value={ {
			loadout: currentLoadout,
			editable,
			addWeapon,
			deleteWeapon,
			addGear,
			deleteGear,
			addWeaponAttachments,
			deleteWeaponAttachment
		} }>
			{ children }
		</LoadoutContext.Provider>
	)
}

LoadoutContextProvider.propTypes = {
	loadout: PropTypes.object.isRequired,
	editable: PropTypes.bool,
}

LoadoutContextProvider.defaultProps = {
	editable: false
}

export default LoadoutContextProvider