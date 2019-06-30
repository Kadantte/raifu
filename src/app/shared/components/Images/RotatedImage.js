import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function calculateAddedXMargin(ref, rotateBy) {
	let boundingBoxWidth = calculateBoundingBoxWidth(ref, rotateBy)
	let diff = boundingBoxWidth - ref.current.offsetWidth

	return diff / 2
}

function calculateBoundingBoxWidth(ref, rotateBy) {
	// We want to make sure the container expands its bounding box
	// to contain the new length of the rotated image
	// https://stackoverflow.com/questions/3231176/how-to-get-size-of-a-rotated-rectangle
	let x = ref.current.offsetWidth
	let y = ref.current.offsetHeight

	let rads = rotateBy * (Math.PI / 180)

	return Math.abs(x * Math.cos(rads)) + Math.abs(y * Math.sin(rads))
}

function RotatedImage({image, rotateBy, style}) {
	let [containerRef] = useState(React.createRef())
	let [xMargin, setXMargin] = useState(0)

	useEffect(() => {
		window.addEventListener('resize', setNewXMargin)
		setTimeout(setNewXMargin, 10) // Hack for offsetHeight being unreliable? Idk whats going on

		return () => window.removeEventListener('resize', setNewXMargin)
	}, [])
	
	function setNewXMargin() {
		if (containerRef.current) {
			let newXMargin = calculateAddedXMargin(containerRef, rotateBy)
			setXMargin(newXMargin)
		}
	}
	
	return (
		<div ref={ containerRef } style={ { width: '100%', marginLeft: xMargin, marginRight: xMargin } }>
			<img alt=''
				src={ image }
				style={ { ...style, transform: `rotate(${rotateBy}deg)` } }
				onLoad={ () => setNewXMargin() } 
			/>
		</div>
	)
}

RotatedImage.propTypes = {
	image: PropTypes.string.isRequired,
	rotateBy: PropTypes.number,
	style: PropTypes.object
}

RotatedImage.defaultProps = {
	rotateBy: 0,
	style: {}
}

export default RotatedImage
