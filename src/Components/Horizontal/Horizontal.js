import './Horizontal.css'

import React from 'react'
import PropTypes from 'prop-types'

const Horizontal = ({children, pressNumber, pressOperator}) => (
	<div className="Horizontal">
		{
			React.Children.map(children, (child) => {
				return React.cloneElement(
					child, {pressNumber, pressOperator}
				)
			})
		}
	</div>
)

Horizontal.propTypes = {
	children: PropTypes.node,
	pressNumber: PropTypes.any,
	pressOperator: PropTypes.any,
}

Horizontal.defaultProps = {}


export default Horizontal
