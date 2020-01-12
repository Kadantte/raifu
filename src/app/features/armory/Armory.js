import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Loading, Error } from 'app/shared'
import { ResourceList } from 'app/shared/resources'
import { AddWeaponDialog, AddAttachmentDialog, AddGearDialog, AddClothingDialog } from './dialogs'
import database from '../../../firebase/database'

const defaultState = {armory: null, loading: true, error: false}

let Armory = () => {
	let [{ armory, loading, error }, setArmory] = useState(defaultState)

	let mounted = useRef(true)

	useEffect(() => () => mounted.current = false, [])

	let loadArmory = useCallback(() => {
		setArmory(defaultState)

		database.armory.get()
			.then(result => mounted && setArmory({ armory: result, loading: false, error: false }))			
			.catch(e => mounted && setArmory({ armory: null, loading: false, error: true }))
	}, [])

	useEffect(() => { loadArmory() }, [loadArmory])

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <Error error='Could not load armory' onRetry={ loadArmory } />
	}

	return (
		<React.Fragment>
			<section>
				<div className='section-container'>
					<ResourceList
						items={ armory.weapons }
						resource={ database.weapons }
						resourceType='weapons'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddWeaponDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						items={ armory.attachments }
						resource={ database.attachments }
						resourceType='attachments'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddAttachmentDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						items={ armory.gear }
						resource={ database.gear }
						resourceType='gear'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddGearDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						items={ armory.clothing }
						resource={ database.clothing }
						resourceType='clothing'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddClothingDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>
		</React.Fragment>
	)
}

export default Armory