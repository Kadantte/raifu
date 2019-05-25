import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'

import { Error, Loading } from 'app/shared/components'
import CardList from 'app/shared/components/Cards/CardList'


// A little hacky, but we only use the isAddDialogOpen state in children classes
/* eslint-disable react/no-unused-state */
class CardListBaseComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			loading: true,
			isAddDialogOpen: false,
			error: null
		}
	}

	get items() {
		return []
	}

	componentDidMount() {
		this.loadItems()
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}

	loadItems() {
		this.setState({loading: true}, () => {
			this.items
				.get()
				.then((items) => {
					if (!this.isUnmounted) {
						this.setState({ items, error: null, loading: false })
					}
				})
				.catch((err) => {
					if (!this.isUnmounted) {
						this.setState({ error: err.message || err, loading: false })
					}
				})
		})
	}

	setDialogOpen(isOpen) {
		this.setState({ isAddDialogOpen: isOpen })
	}

	view(id) {}

	delete(id) {
		return this.items
			.delete(id)
			.then(() => this.setState((prevState) => ({ items: prevState.items.filter((item) => item.id !== id) })))
	}

	save(value) {		
		return this.items
			.add(value)
			.then((item) => {
				if (!this.isUnmounted) {
					this.setState((prevState) => {
						return { items: prevState.items.concat(item), isAddDialogOpen: false }
					})
				}
			})
	}

	render() {
		let { items, error, loading } = this.state

		return (
			<React.Fragment>
				<Typography variant='h3'>{this.title}</Typography>
				{loading ? (
					<Loading />
				) : error ? (
					<Error error={ error } onRetry={ () => this.loadItems() } />
				) : (
					<CardList
						items={ items }
						cardType={ this.cardType }
						onAdd={ () => this.setDialogOpen(true) }
						onCardClick={ (item) => this.view(item) }
						onCardDelete={ (id) => this.delete(id) }
					/>
				)}
			</React.Fragment>
		)
	}
}

export default CardListBaseComponent
