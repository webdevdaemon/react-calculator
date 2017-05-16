import './Button.css'

import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div className="Button">
				{
					this.props.type === 'operator' ?
						<div
							className={`ButtonOp ${this.props.childClass}`}
							onClick={() => {this.props.pressOperator(this.props.keyValue)}}
						>
							{this.props.opIcon}
						</div> :
					<div
						className={`ButtonNum ${this.props.childClass}`}
						onClick={() => {this.props.pressNumber(this.props.keyValue)}}
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
	keyValue: PropTypes.any,
	childClass: PropTypes.string,
	children: PropTypes.any,
	type: PropTypes.string,
	pressNumber: PropTypes.any,
	pressOperator: PropTypes.any,
}

Button.defaultProps = {}

export default Button
