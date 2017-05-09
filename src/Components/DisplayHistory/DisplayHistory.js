import './DisplayHistory.css'

import React from 'react'
import PropTypes from 'prop-types'

const DisplayHistory = ({historyValue}) => (
	<div className="DisplayHistory">
		<p>{historyValue}</p>
	</div>
)

DisplayHistory.propTypes = {
	historyValue: PropTypes.string
}

DisplayHistory.defaultProps = {}


export default DisplayHistory
