import "./DisplayCurrent.css"

import React from "react"
import PropTypes from "prop-types"

class DisplayCurrent extends React.Component {
	render() {
		let dis_val = this.props.displayValue
		return (
			<div className="DisplayCurrent">
				<p>{dis_val}</p>
			</div>
		)
	}
}

DisplayCurrent.propTypes = {
	displayValue: PropTypes.string,
}

DisplayCurrent.defaultProps = {}

export default DisplayCurrent
