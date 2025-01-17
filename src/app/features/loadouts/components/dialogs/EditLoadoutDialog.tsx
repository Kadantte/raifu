import { useCallback, useState, useEffect, FC } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'

import { Error } from 'app/shared/state'
import { Loadout, LoadoutPropType } from '../../models'
import { TextFieldError } from 'app/shared/extensions/material/TextFieldError'

type EditLoadoutDialogProps = {
	loadout?: Loadout | null
	action: 'Add' | 'Edit'
	isOpen: boolean
	onSave: (loadout: Loadout) => Promise<any>
	onClose: () => any
}

export type LoadoutUpdate = {
	name: string
}

export const EditLoadoutDialog: FC<EditLoadoutDialogProps> = ({
	loadout,
	action,
	isOpen,
	onSave,
	onClose,
}) => {
	let [error, setError] = useState<string | null>(null)

	let { register, handleSubmit, formState } = useForm<LoadoutUpdate>({
		mode: 'onChange',
		defaultValues: {
			name: loadout?.name,
		},
	})

	let handleSave = useCallback(
		(loadout) => {
			setError(null)

			return onSave(loadout)
				.then(onClose)
				.catch((err) => setError('An error occurred while saving loadout.'))
		},
		[onClose, onSave]
	)

	useEffect(() => {
		!isOpen && setError(null)
	}, [isOpen])

	return (
		<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
			<form onSubmit={ handleSubmit(handleSave) }>
				<DialogTitle>{action} loadout</DialogTitle>

				<DialogContent>
					{error && <Error error={ error } fillBackground={ true } />}

					<TextFieldError
						inputRef={ register({
							required: { value: true, message: 'Name is required.' },
							maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
						}) }
						name='name'
						label='Name'
						type='text'
						fullWidth={ true }
						formState={ formState }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !formState.isValid || formState.isSubmitting }
						variant='contained'
						color='primary'
						type='submit'
					>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

EditLoadoutDialog.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType),
	action: PropTypes.oneOf(['Add', 'Edit'] as const).isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
}

EditLoadoutDialog.defaultProps = {
	loadout: {
		name: '',
		id: '',
		shared: false,
		getTitle: () => '',
		getSubtitle: () => '',
		weapons: [],
		gear: [],
		clothing: [],
		createdAt: '',
		updatedAt: '',
	},
}

export default EditLoadoutDialog
