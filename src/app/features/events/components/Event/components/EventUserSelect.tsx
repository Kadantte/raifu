import { FC } from 'react'
import PropTypes from 'prop-types'

import { Tabs, Tab } from '@material-ui/core'
import { EventUser, EventUserPropShape } from '../../../models'

type UserSelectProps = {
	users: EventUser[]
	userIndex: number
	onUserIndexChange: (index: number) => any
}

const EventUserSelect: FC<UserSelectProps> = ({
	users,
	userIndex,
	onUserIndexChange,
}) => {
	return (
		<Tabs centered={ true } value={ userIndex } onChange={ (e, idx) => onUserIndexChange(idx) }>
			{users.map((user, idx) => (
				<Tab key={ user.uid } label={ `${user.displayName} ${idx === 0 ? '(You)' : ''}` } />
			))}
		</Tabs>
	)
}

EventUserSelect.propTypes = {
	users: PropTypes.arrayOf(PropTypes.shape(EventUserPropShape).isRequired).isRequired,
	userIndex: PropTypes.number.isRequired,
	onUserIndexChange: PropTypes.func.isRequired,
}

export default EventUserSelect