import './Button.css'

import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
	constructor(props) {
		super(props)
		this.state={
			...props
		}
	}

	render() {
		console.log(this.state);
		return (
			<div className="Button">
				{
					this.props.type === 'operator' ?

						<div className={`ButtonOp ${this.props.childClass}`}
							onClick={
								() => {
									this.props.pressOperator(this.props.keyValue)
									console.log(this.props.keyValue)
								}
							}
						>
							{this.props.opIcon}</div> :

					<div className={`ButtonNum ${this.props.childClass}`}
						onClick={
							() => {
								this.props.pressNumber(this.props.keyValue)
								console.log(this.props.keyValue)
							}
						}
					>
						<span>
							{this.props.keyValue}
						</span>
					</div>
				}
			</div>
		)
	}
}

Button.propTypes = {
	opIcon: PropTypes.node,
	keyValue: PropTypes.string,
	childClass: PropTypes.string,
	children: PropTypes.any,
	type: PropTypes.string,
	pressNumber: PropTypes.function,
	pressOperator: PropTypes.function
}

Button.defaultProps = {}

export default Button
