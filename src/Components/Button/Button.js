import './Button.css'

import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => (
	<div className='Button'>
		{
			(props.type === 'operator') ? (
				<div
					className={`ButtonOp ${props.childClass}`}
					onClick={
						() => {
							props.pressOperator(props.keyValue)
							console.log(props.keyValue)
						}
					}
				>
					{props.opIcon}
				</div>
			) :	(
				<div
					className={`ButtonNum ${props.childClass}`}
					onClick={() => { props.pressNumber(props.keyValue); console.log(props.keyValue);}}
				>
					<span>{props.keyValue}</span>
				</div>
			)
		}
	</div>
)



Button.propTypes = {
	opIcon: PropTypes.node,
	keyValue: PropTypes.string,
	childClass: PropTypes.string,
	children: PropTypes.any,
	type: PropTypes.string,
	pressNumber: PropTypes.function,
	pressOperator: PropTypes.function,
}
Button.defaultProps = {}

export default Button
