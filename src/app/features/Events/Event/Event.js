import React from 'react'
import withRouter from 'react-router-dom/withRouter'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import LoadoutSeparator from 'app/shared/components/Views/Loadout/LoadoutSeparator'
import LoadoutAdd from 'app/shared/components/Views/Loadout/LoadoutAdd'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'
import { Loading, Error } from 'app/shared/components'

import EditEventDialog from '../EditEventDialog'
import AddLoadoutToEventDialog from './AddLoadoutToEventDialog/AddLoadoutToEventDialog'

import database from '../../../../firebase/database'

class Event extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			error: null,
			activeDialog: null,
			event: null
		}
	}

	get rawEvent() {
		let event = this.state.event

		// Filter out any functions or joins before passing back up to api
		return Object.keys(event)
			.reduce((p, c) => {
				if (typeof event[c] !== 'function' && typeof event[c] !== 'object' && c !== 'loadout') {
					p[c] = event[c]
				}

				return p
			}, { loadout_id: event.loadout ? event.loadout.id : null })
	}

	componentDidMount() {	
		this.loadEvent()	
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}	

	loadEvent() {
		this.setState({loading: true, error: null}, () => {
			database.events.getById(this.props.match.params.id)
				// Convert from JSON date format
				.then(event => ({
					...event,
					date: new Date(event.date)
				}))
				.then(event => {
					if (!this.isUnmounted) {
						this.setState({ event: event, loading: false })
					}
				})
				.catch(err => {
					if (!this.isUnmounted) {
						this.setState({ error: err.message || err, loading: false})
					}
				})
		})
	}

	openDialog(activeDialog) {
		this.setState({ activeDialog })
	}

	setLoadout(loadout) {
		// Filter out any functions or joins before passing back up
		let updatedEvent = this.rawEvent
		updatedEvent.loadout_id = loadout ? loadout.id : null

		return database.events.edit(updatedEvent)
			.then(() => this.setState((prevState) => {
				return {
					event: {...prevState.event, loadout: loadout}
				}
			}))
			.then(() => this.openDialog(null))
	}

	updateEvent(event) {
		let updatedEvent = {
			...this.rawEvent,
			...event
		}

		// Firebase functions don't like date objects...
		if (updatedEvent.date) {
			updatedEvent.date = updatedEvent.date.toISOString()
		}

		return database.events.edit(updatedEvent)
			.then(() => this.setState((prevState) => {
				return {
					event: {
						...prevState.event, 
						...event,
						loadout: prevState.event.loadout
					}
				}
			}))
			.then(() => this.openDialog(null))
	}

	deleteEvent() {
		return database.events.delete(this.state.event.id)
			.then(() => this.props.history.push('/events'))
	}

	render() {
		let { loading, error, event, activeDialog } = this.state

		if (loading) {			
			return <Loading />
		}
	
		if (error) {
			return <Error error={ error } onRetry={ () => this.loadEvent() } />
		}

		return (
			<React.Fragment>
				<React.Fragment>
					<Typography variant='h3' >
						{ event.name }
						<i onClick={ () => this.openDialog('edit') } className='fa fa-pen icon-action' />						
						<i onClick={ () => this.openDialog('delete') } className='fa fa-times icon-action' />
					</Typography>

					<Typography variant='h4'>
						{ event.location } @ { event.date.toLocaleString() }
					</Typography>
				</React.Fragment>

				{ !event.loadout && 
					<LoadoutSeparator showBottom={ true } >
						<LoadoutAdd onClick={ () => this.openDialog('add') } />
					</LoadoutSeparator>
				}

				{ event.loadout && 
				<div style={ {width: '100%'} }>
					<Button 
						color='primary' 
						variant='outlined'
						style={ {
							width: '100%',
							marginBottom: '-24px'
						} }
						onClick={ () => this.openDialog('remove') }
					>
						Remove Loadout ({ event.loadout.getTitle() })
					</Button>
					
					<LoadoutView loadout={ event.loadout } /> 

					<ConfirmDeleteDialog 
						verb='Remove'
						title={ `${event.loadout.getTitle()} from ${event.getTitle()}` }
						isOpen={ activeDialog === 'remove' }
						onClose={ () => this.openDialog(null) }
						onConfirm={ () => this.setLoadout(null) }
					/>
				</div>
				}

				<AddLoadoutToEventDialog 
					eventTitle={ event.getTitle() }
					isOpen={ activeDialog === 'add' }
					onSave={ (loadoutId) => this.setLoadout(loadoutId) }
					onClose={ () => this.openDialog(null) } />

				<EditEventDialog 
					event={ event }
					isOpen={ activeDialog === 'edit' }
					onSave={ (event) => this.updateEvent(event) }
					onClose={ () => this.openDialog(null) } />

				<ConfirmDeleteDialog 
					verb='Delete'
					title={ event.getTitle() }
					isOpen={ activeDialog === 'delete' }
					onClose={ () => this.openDialog(null) }
					onConfirm={ () => this.deleteEvent() }
				/>
			</React.Fragment>
		)
	}
}

export default withRouter(Event)