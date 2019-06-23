import { CloudFunction } from '../../../functions'
import { toEntity } from '../entity.model'

export default (loadoutId, weaponId) => ({
	add: (attachmentId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/weapons/${weaponId}/attachments/${attachmentId}`)
			.post()
			.then(toEntity),
	delete: (attachmentId) =>
		new CloudFunction()
			.path(`/loadouts/${loadoutId}/weapons/${weaponId}/attachments/${attachmentId}`)
			.delete()
			.then(toEntity),
})