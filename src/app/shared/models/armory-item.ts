import PropTypes from 'prop-types'

import { Resource, ResourcePropShape } from './resource'

export type Armory = {
	weapons: Weapon[]
	attachments: Attachment[]
	gear: Gear[]
	clothing: Clothing[]
}

export interface ArmoryItem extends Resource {
	type: string
	platform: string
	brand?: string | null
	model?: string | null
	nickname?: string | null
}

export interface Weapon extends ArmoryItem {}
export interface Attachment extends ArmoryItem {}
export interface Gear extends ArmoryItem {}
export interface Clothing extends ArmoryItem {}

export const ArmoryItemPropShape = {
	...ResourcePropShape,
	type: PropTypes.string.isRequired,
	platform: PropTypes.string.isRequired,
	brand: PropTypes.string,
	model: PropTypes.string,
	nickname: PropTypes.string,
}
