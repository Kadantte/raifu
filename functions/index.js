const armory = require('./src/armory')
const loadout = require('./src/loadout')
const loadoutWeapon = require('./src/loadout-weapon')
const loadoutWeaponAttachments = require('./src/loadout-weapon-attachment')

exports.weapons = armory.weapons
exports.attachments = armory.attachments
exports.gear = armory.gear
exports.loadouts = loadout
exports.loadouts.weapons = loadoutWeapon
exports.loadouts.weapons.attachments = loadoutWeaponAttachments