import './DisplayHistory.css'

import React from 'react'
import PropTypes from 'prop-types'

const DisplayHistory = ({history}) => (
	<div className="DisplayHistory">
		<p>{((history[1]) ? history.join() : 0 ).toString()}</p>
	</div>
)

DisplayHistory.propTypes = {
	history: PropTypes.string
}

DisplayHistory.defaultProps = {}


export default DisplayHistory
