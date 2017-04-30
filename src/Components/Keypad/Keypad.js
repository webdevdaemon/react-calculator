import './Keypad.css'

import React from 'react'
import PropTypes from 'prop-types'


class Keypad extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div className="Keypad">
				{this.props.children}
			</div>
		)
	}
}
Keypad.propTypes = {
	children: PropTypes.node
}
Keypad.defaultProps = {

}

export default Keypad
