import './Vertical.css'

import React from 'react'
import PropTypes from 'prop-types'

const Vertical = ({pressOperator, children}) => (
	<div className="Vertical">
		{
			React.Children.map(children, (child) => {
				return React.cloneElement(
					child, {pressOperator}
				)
			})
		}
	</div>
)

Vertical.propTypes = {
	children: PropTypes.node,
	pressOperator: PropTypes.any,
}

Vertical.defaultProps = {}

export default Vertical
