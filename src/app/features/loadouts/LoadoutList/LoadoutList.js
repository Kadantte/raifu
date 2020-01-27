import React, { useState, useRef, useEffect, useCallback } from 'react'

import { ErrorOverlay, LoadingOverlay } from 'app/shared'
import { ResourceList } from 'app/shared/resources'
import AddLoadoutDialog from './AddLoadoutDialog'
import database from '../../../../firebase/database'

const defaultState = {loadouts: null, loading: true, error: false}

let LoadoutList = ({ history, location }) => {
	let [{ loadouts, loading, error }, setLoadout] = useState(defaultState)

	let mounted = useRef(true)

	useEffect(() => () => mounted.current = false, [])

	let loadLoadout = useCallback(() => {
		setLoadout(defaultState)
		
		database.loadouts.get()
			.then(result => mounted.current && setLoadout({ loadouts: result, loading: false, error: false }))			
			.catch(e => mounted.current && setLoadout({ loadouts: null, loading: false, error: true }))
	}, [])

	useEffect(() => { loadLoadout() }, [loadLoadout])

	let viewLoadout = useCallback((loadout) => history.push(`${location.pathname}/${loadout.id}`), [history, location])

	if (loading) {
		return <LoadingOverlay />
	}

	if (error) {
		return <ErrorOverlay message='Could not load loadouts.' onRetry={ loadLoadout } />
	}
	
	return (
		<ResourceList
			items={ loadouts }
			showTitle={ false }
			resource={ database.loadouts }
			resourceType='loadout'
			onResourceClick={ viewLoadout }
			renderAddDialog={ (isOpen, onClose, onSave) => (
				<AddLoadoutDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
			) } 
		/>
	)
}

export default LoadoutList
