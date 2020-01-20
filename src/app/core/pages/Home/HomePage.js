import React from 'react'

import useIsMobileMode from 'app/shared/hooks/useIsMobileMode'
import Logo from 'app/core/layout/Logo'
import HomePageSegment from './HomePageSegment'

import ArmoryImage from 'assets/home/armory.png'
import LoadoutImage from 'assets/home/loadout.png'
import EventsImage from 'assets/home/events.png'
import EventLoadoutsImage from 'assets/home/eventloadouts.png'

import './HomePage.css'

const segments = [
	{
		title: 'Inventory Management',
		image: ArmoryImage,
		text: 'Keep track and manage all of your airsoft weaponry, attachments, and gear.'
	},
	{
		title: 'Loadout Creation',
		image: LoadoutImage,
		text: 'Create your custom loadouts by creating combinations with your airsoft inventory, then share your loadouts online.'
	},
	{
		title: 'Event Planning',
		image: EventsImage,
		text: 'Manage upcoming events and assign a loadout to each. View a simple agenda of your upcoming events, and the loadout you plan to take'
	},	
	{
		title: 'Squad Management',
		image: EventLoadoutsImage,
		text: 'Coordinate between you and your friends, keeping up to date with your entire squad\'s gear for the event.'
	}
]

export default function HomePage() {
	let isMobileMode = useIsMobileMode(768)

	return (
		<React.Fragment>
			<div className='logo-container'>
				<Logo height={ isMobileMode ? '300px' : '400px' } subtitle='Airsoft loadout management' />
			</div>

			{ segments.map((segment, i) => 
				<HomePageSegment key={ i } 
					title={ segment.title } 
					text={ segment.text } 
					image={ segment.image } 
					flip={ i % 2 === 0 }
					isMobileMode={ isMobileMode }
				/>
			) }
		</React.Fragment>
	)
}