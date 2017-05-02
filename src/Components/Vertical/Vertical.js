import './Vertical.css'

import React from 'react'
import PropTypes from 'prop-types'

const Vertical = (props) => (
	<div className="Vertical">
		{props.children}
	</div>
)

Vertical.propTypes = {
	children: PropTypes.node.isRequired,
}

Vertical.defaultProps = {}

export default Vertical
