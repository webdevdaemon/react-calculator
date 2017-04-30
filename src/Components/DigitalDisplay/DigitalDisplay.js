import './DigitalDisplay.css'

import React from 'react'
import PropTypes from 'prop-types'


const DigitalDisplay = (props) => (
	<div className="DigitalDisplay">
		{props.children}
	</div>
)

DigitalDisplay.propTypes = {
	children: PropTypes.any,
}
DigitalDisplay.defaultProps = {}


export default DigitalDisplay
