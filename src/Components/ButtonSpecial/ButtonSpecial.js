import './ButtonSpecial.css'

import React from 'react'
import PropTypes from 'prop-types'

const ButtonSpecial = (props) => {
	let toggle = props.pressToggle
	// console.log(toggle, toggle.toString())
	return (
		<div className="Button" onClick={toggle}>
			<div className={`ButtonOp ${props.childClass}`}>{props.opIcon}</div>
		</div>
	)
}

ButtonSpecial.propTypes = {
	childClass:  PropTypes.string,
	className:   PropTypes.string,
	pressToggle: PropTypes.any,
	opIcon:      PropTypes.any,
	type:        PropTypes.string,
}

ButtonSpecial.defaultProps = {}

export default ButtonSpecial
