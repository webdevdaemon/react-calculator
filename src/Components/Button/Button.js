import './Button.css'

import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => (
	<div className='Button'>
		{
			(props.type === 'operator') ? (
				<div
					className={`ButtonOp ${props.childClass}`}
					pressOperator={props.pressOperator}
				>{props.children}</div>
			) :	(
				<div
					className={`ButtonNum ${props.childClass}`}
					pressNumber={props.pressNumber}
				><span>{props.keyValue}</span>
				</div>
			)
		}
	</div>
)

Button.propTypes = {
	keyValue: PropTypes.string,
	childClass: PropTypes.string,
	children: PropTypes.any,
	type: PropTypes.string,
	pressNumber: PropTypes.function,
	pressOperator: PropTypes.function,
}
Button.defaultProps = {}

export default Button
