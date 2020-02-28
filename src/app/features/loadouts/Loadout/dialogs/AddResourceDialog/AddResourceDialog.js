import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
	Button
} from '@material-ui/core'

import { Loading, Error } from 'app/shared/state'
import ResourceSelect from './ResourceSelect'

class AddResourceDialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedIds: [],
			loading: false,
			error: null
		}
	}

	componentWillUnmount = () => this.isUnmounted = true	

	onItemSelected(itemId) {
		this.setState(({ selectedIds }) => {
			let selectedItemIndex = selectedIds.findIndex(id => id === itemId)

			let newSelectedIds = [ ...selectedIds ]

			if (selectedItemIndex === -1) {
				if (!this.props.allowMultiple && selectedIds.length > 0) {
					// If we're not allowing multiple, replace
					newSelectedIds = [ itemId ]
				} else {
					// Otherwise add
					newSelectedIds.push(itemId)
				}
			} else {
				// If it existed, remove from the selection
				newSelectedIds.splice(selectedItemIndex, 1)
			}

			return { selectedIds: newSelectedIds }
		})
	}

	formValid() {
		return this.state.selectedIds.length > 0
	}

	onSave(itemIds) {
		let data = this.props.allowMultiple ? itemIds : itemIds[0]

		this.setState({ loading: true, error: false }, () => {
			this.props.onSave(data)
				.then(() => !this.isUnmounted && this.setState({ selectedIds: [], loading: false }))
				.catch(err => !this.isUnmounted && this.setState({ loading: false, error: `An error occurred while saving ${this.props.category}.` }))
		})
	}

	render() {
		let { selectedIds, loading, error } = this.state
		let { items, title, category, isOpen, onClose, allowMultiple } = this.props

		return (
			<Dialog open={ isOpen } onClose={ onClose }>
				<DialogTitle>{ title }</DialogTitle>

				<DialogContent>
					{ loading && <Loading /> }

					{ error && <Error error={ error } fillBackground={ true } /> }

					{ allowMultiple && selectedIds.length > 0 && 
						<DialogContentText>{ selectedIds.length } items selected.</DialogContentText> 
					}

					<ResourceSelect
						items={ items } 
						category={ category }
						selectedItemIds={ selectedIds } 
						onItemSelected={ itemId => this.onItemSelected(itemId) } 
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !this.formValid() || loading }
						variant='contained'
						onClick={ () => this.onSave(selectedIds) }
						color='primary'
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

AddResourceDialog.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
	}),).isRequired,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
	allowMultiple: PropTypes.bool,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

AddResourceDialog.defaultProps = {
	allowMultiple: false
}

export default AddResourceDialog
