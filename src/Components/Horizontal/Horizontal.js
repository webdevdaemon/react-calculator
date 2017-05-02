import './Horizontal.css'

import React from 'react'
import PropTypes from 'prop-types'

const Horizontal = (props) => (
	<div className="Horizontal">
		{props.children}
	</div>
)

Horizontal.propTypes = {
	children: PropTypes.node.isRequired,
}

Horizontal.defaultProps = {}

export default Horizontal
