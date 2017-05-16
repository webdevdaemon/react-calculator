import "./DisplayCurrent.css"

import React from "react"
import PropTypes from "prop-types"

class DisplayCurrent extends React.Component {
	render() {
		return (
			<div className="DisplayCurrent">
				<p className='negative'>{(this.props.stateObj.is_negative) ? '-' : ''}</p>
				<p>{this.props.displayValue}</p>
			</div>
		)
	}
}

DisplayCurrent.propTypes = {
	displayValue: PropTypes.string,
	stateObj: PropTypes.object,
}

DisplayCurrent.defaultProps = {}

export default DisplayCurrent
