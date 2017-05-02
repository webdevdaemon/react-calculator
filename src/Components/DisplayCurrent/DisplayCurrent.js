import "./DisplayCurrent.css"

import React from "react"
import PropTypes from "prop-types"

class DisplayCurrent extends React.Component {
	render() {
		return (
			<div className="DisplayCurrent">
				<p>{this.props.display}</p>
			</div>
		)
	}
}

DisplayCurrent.propTypes = {
	display: PropTypes.string,
}

DisplayCurrent.defaultProps = {}

export default DisplayCurrent
