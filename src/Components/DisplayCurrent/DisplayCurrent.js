import "./DisplayCurrent.css"

import React from "react"
import PropTypes from "prop-types"

class DisplayCurrent extends React.Component {
	render() {
		let currentValue = this.props.currVal
		return (
			<div className="DisplayCurrent">
				<p>{currentValue.toString()}</p>
			</div>
		)
	}
}

DisplayCurrent.propTypes = {
	currVal: PropTypes.any,
}

DisplayCurrent.defaultProps = {}

export default DisplayCurrent
