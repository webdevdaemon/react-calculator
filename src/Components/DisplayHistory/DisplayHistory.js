import './DisplayHistory.css'

import React from 'react'
import PropTypes from 'prop-types'

const DisplayHistory = ({historyValue, previousHistory, revealPreviousHistory}) => (
	<div className="DisplayHistory">
		<p className="previous-history">
			{
				(historyValue === 'GRAND TOTAL') ?
				(<p>{previousHistory}</p>) :
				''
			}
		</p>
		<p>{historyValue}</p>
	</div>
)

DisplayHistory.propTypes = {
	historyValue: PropTypes.string,
	previousHistory: PropTypes.string,
	revealPreviousHistory: PropTypes.func,
}

DisplayHistory.defaultProps = {
	previousHistory: ''
}


export default DisplayHistory
