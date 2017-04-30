import './DisplayHistory.css'

import React from 'react'
import PropTypes from 'prop-types'

const DisplayHistory = (props) => (
	<div className="DisplayHistory">
		<p>{props.history}</p>
	</div>
)

DisplayHistory.propTypes = {
	history: PropTypes.string
}

DisplayHistory.defaultProps = {}


export default DisplayHistory
