import './DisplayHistory.css'

import React from 'react'
import PropTypes from 'prop-types'

const DisplayHistory = ({histVal}) => (
	<div className="DisplayHistory">
		<p>{histVal}</p>
	</div>
)

DisplayHistory.propTypes = {
	histVal: PropTypes.any
}

DisplayHistory.defaultProps = {}


export default DisplayHistory
