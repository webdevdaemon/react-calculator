import React, {Component} from 'react'
import './App.css'

import ButtonSpecial from './Components/ButtonSpecial/index'
import Button from './Components/Button/index'
import DigitalDisplay from './Components/DigitalDisplay/index'
import DisplayCurrent from './Components/DisplayCurrent/index'
import DisplayHistory from './Components/DisplayHistory/index'
import Horizontal from './Components/Horizontal/index'
import IconFont from './Components/IconFont/index'
import Keypad from './Components/Keypad/index'
import Vertical from './Components/Vertical/index'

const decimal_regex = /\.$/gi
const init_state = {
	current_value_array: [],
	hidden_history_array: [],
	previous_operation_history_array: [],
	is_decimal: false,
	is_negative: false,
	is_totaled: false,
	visible_display_string: '0',
	visible_history_string: '0',

}
// const ops = {
// 	PLUS: '+',
// 	MINUS: '-',
// 	MULTIPLY: '*',
// 	DIVIDE: '/',
// 	EQUALS: '=',
// 	INVERT: '_',
// 	DECIMAL: '.',
// }

class App extends Component {
	constructor() {
		super()
		this.state = init_state
	}

	// =============== Utility Button Hnadlers =============== //

	aC = () => {
		this.setState(init_state)
	}

	cE = (hh_arr = this.state.hidden_history_array) => {
		if (this.state.is_totaled) {
			this.setState(init_state)
			return
		}
		this.setState(
			(!isNaN(parseFloat(this.state.visible_display_string))) ? // (IF IS) - if vis_dis_val IS a number...
			{
				current_value_array: [],
				visible_display_string: '0'
			} : {
				visible_display_string: hh_arr[hh_arr.length-1],
				current_value_array: hh_arr[hh_arr.length-1].split(""),
				hidden_history_array: hh_arr.slice(0, -1),
				visible_history_string: hh_arr.slice(0, -1).join(""),
			}
		)
	}

	eQ = () => {
		if (this.state.is_totaled) {return}
		else if (this.state.hidden_history_array.length <= 1) {return}
		else if (isNaN(Number(this.state.visible_display_string))) {return}
		else {
			this.setState(
				{
					hidden_history_array: this.state.hidden_history_array.concat(this.state.current_value_array.join("")),
					previous_operation_history_array: this.state.hidden_history_array.concat(this.state.current_value_array.join("")),
				}, () => {
					this.setState((state, props) => {
						return {
							visible_display_string: this.calculateSolution(),
							visible_history_string: 'GRAND TOTAL',
							is_totaled: true,
							is_negative: false,
							is_decimal: false,
						}
					})
				}
			)
		}
	}

	// decimalToggle = () => {
		// if (this.state.is_totaled) {
		// 	return
		// }
		// if (this.state.is_decimal) {
		// 	this.setState(
		// 		((this.state.decimal_regex.test(this.state.visible_display_string)) ?
		// 			{
		// 				is_decimal: false,
		// 				visible_display_string: this.state.visible_display_string.split("").slice(0,-1).join(""),
		// 			} : {},
		// 			() => {
		// 				this.setState(
		// 					(this.state.current_value_array[this.state.current_value_array.length-1] === '.') ?
		// 					{
		// 						current_value_array: this.state.current_value_array.slice(0,-1),
		// 					} : {}
		// 				)
		// 			}
		// 		)
		// 	)
		// }
		// else if (!this.state.is_decimal) {
		// 	this.setState({
		// 		is_decimal: true,
		// 	})
		// }
		// else {
		// 	return
		// }
	// }

	decimalToggle = () => {
		if (!this.state.is_decimal) {this.setState({is_decimal: true}, () => {console.log('decimal toggled')})}
		else {this.setState({is_decimal: false})}
	}

	negativeToggle = () => {
		if (isNaN(parseFloat(this.state.visible_display_string))) { // (IF IS NOT) If curr_dis_str IS NOT a number...
			return // eject
		}

		if (!this.state.is_negative) {
			this.setState({
				is_negative: true,
				current_value_array: ['-'].concat(this.state.current_value_array),
			}, () => {console.log('negative toggled')})
		}
		else {
			this.setState({
				is_negative: false,
				current_value_array: this.state.current_value_array.slice(1)
			}, () => {console.log('negative toggled')})
		}
	}

	pressNumber = (number, vd_str = this.state.visible_display_string) => {
		// special case: if GRAND TOTAL is currently displayed...
		if (this.state.is_totaled) {
			this.setState({
					current_value_array: [number],
					visible_display_string: '',
					is_totaled: false,
					hidden_history_array: [],
					visible_history_string: '0',
				},
				() => {
					this.setState({
						visible_display_string: number.toString(),
					})
				}
			)
		}
		// if operator is currently displayed...
		else if (isNaN(parseFloat(this.state.visible_display_string))) { // (IF IS NOT) - if vis_dis_val IS NOT A NUMBER...
			this.setState((state, props) => {
				return {
					hidden_history_array: state.hidden_history_array.concat(vd_str),
					visible_display_string: number.toString(),
					visible_history_string: state.hidden_history_array.concat(vd_str).join(""),
					// current_value_array: state.current_value_array.concat(number)
					current_value_array: [].concat(number)
				}
			})
			// if anything else is displayed (Hopefully a number!!!)...
		} else {
			this.setState({
				current_value_array: this.state.current_value_array.concat(number),
			}, () => {
				this.setState({
					visible_display_string: this.state.current_value_array.join("")
				})
			})

		}
	}

	pressOperator = (operator, vd_str = this.state.visible_display_string) => {
		if (this.state.is_totaled) {
			this.setState({
				is_totaled: false,
				hidden_history_array: [vd_str],
				// visible_history_string: this.state.previous_operation_history_array.join(""),
				visible_history_string: vd_str,
				visible_display_string: operator,
				current_value_array: [],
			})
		} else if (!isNaN(parseFloat(this.state.visible_display_string))) { // (IF IS) - if vis_dis_str IS a NUMBER...
			let curr_val = this.state.current_value_array.join("")
			this.setState({
					// hidden_history_array: this.state.hidden_history_array.concat(this.state.visible_display_string),
					hidden_history_array: this.state.hidden_history_array.concat(curr_val),
					current_value_array: [],
					visible_display_string: operator,
					is_negative: false,
					is_decimal: false,
				},  () => {
					if (!isNaN(parseFloat(vd_str))) { // (IF IS) - if vis_dis_val IS a number...
						this.setState({visible_history_string: this.state.hidden_history_array.join("")})
					} else {
						return
					}
				}
			)
		} else { // (IF IS NOT) - if vis_dis_str IS NOT NUMBER...
			this.setState({
					visible_display_string: operator,
					current_value_array: [],
				},  () => {
					if (!isNaN(parseFloat(vd_str))) { // (IF IS) - if vis_dis_val IS a number...
						this.setState({visible_history_string: this.state.hidden_history_array.join("")})
					} else {
						return
					}
				}
			)
		}
	}

	calculateSolution = (maths = this.state.hidden_history_array) => {
		let current_operator = '',
		solution = maths.reduce((accumulate, current, index, array) => {
			// special case - first round handler
			if (index === 0) {return accumulate += parseFloat(current)}
			// if current index = number...
			if (!isNaN(parseFloat(current))) { // (IF IS) - if current IS a number...
				current = parseFloat(current)
				switch (current_operator) {
					case '+':
					accumulate += current
					break
					case '-':
					accumulate -= current
					break
					case '*':
					accumulate *= current
					break
					case '/':
					accumulate /= current
					break
					default:
					console.log('CALCULATION ERROR - NO current operator')
				}
				// if current index = operator - store operator for use in the next iteration
			} else if (isNaN(parseFloat(current))) { // (IF IS NOT) - if current IS NOT a number...
				current_operator = current
			} else {
				console.log("CALCULATION ERROR, CURRENT HISTORY ITEM NEITHER A NUMBER, NOR AN OPERATOR...")
			}
			return parseFloat(accumulate)
		}, 0)
		return solution.toString()
	}

	render() {
		return (
			<div className="App">
				<div className="display-wrap">
					<DigitalDisplay>
						<DisplayCurrent
							stateObj={this.state}
							displayValue={this.state.visible_display_string}
						/>
						<DisplayHistory
							historyValue={this.state.visible_history_string}
							previousHistory={this.state.previous_operation_history_array.join("")}
						/>
					</DigitalDisplay>
				</div>
				<Keypad>
					<div className='H4 W3'>
						<Horizontal pressNumber={this.pressNumber}>
							<Button className='Button' childClass='bg-grey' keyValue={9} pressNumber={this.pressNumber} />
							<Button className='Button' childClass='bg-grey' keyValue={8} pressNumber={this.pressNumber} />
							<Button className='Button' childClass='bg-grey' keyValue={7} pressNumber={this.pressNumber} />
						</Horizontal>
						<Horizontal pressNumber={this.pressNumber}>
							<Button className='Button' childClass='bg-grey' keyValue={6} pressNumber={this.pressNumber} />
							<Button className='Button' childClass='bg-grey' keyValue={5} pressNumber={this.pressNumber} />
							<Button className='Button' childClass='bg-grey' keyValue={4} pressNumber={this.pressNumber} />
						</Horizontal>
						<Horizontal pressNumber={this.pressNumber}>
							<Button className='Button' childClass='bg-grey' keyValue={3} pressNumber={this.pressNumber} />
							<Button className='Button' childClass='bg-grey' keyValue={2} pressNumber={this.pressNumber} />
							<Button className='Button' childClass='bg-grey' keyValue={1} pressNumber={this.pressNumber} />
						</Horizontal>


						<Horizontal>
							<ButtonSpecial type='decimalToggle' className='Button' childClass='bg-black' opIcon={<IconFont color='white' icon='decimal'/>} keyValue='.' pressToggle={this.decimalToggle} />
							<Button className='Button' childClass='bg-grey' keyValue={0} pressNumber={this.pressNumber} />
							<ButtonSpecial type='invertToggle' className='Button' childClass='bg-black' opIcon={<IconFont color='white' icon='plus-minus'/>} keyValue='_' pressToggle={this.negativeToggle} />
						</Horizontal>


					</div>
					<div className='H4 W1'>
						<Vertical>
							<Button type='operator' className='Button' childClass='bg-plus' opIcon={<IconFont color='white' icon='plus'/>} keyValue='+' pressOperator={this.pressOperator} />
							<Button type='operator' className='Button' childClass='bg-minus' opIcon={<IconFont color='white' icon='minus'/>} keyValue='-' pressOperator={this.pressOperator} />
							<Button type='operator' className='Button' childClass='bg-multiply' opIcon={<IconFont color='white' icon='multiply'/>} keyValue='*' pressOperator={this.pressOperator} />
							<Button type='operator' className='Button' childClass='bg-divide' opIcon={<IconFont color='white' icon='divide' />} keyValue='/' pressOperator={this.pressOperator} />
						</Vertical>
					</div>
					<div className="H4 W1">
						<div className='H2'>
							<Vertical>
								<Button type='operator' className='Button' childClass='bg-red' opIcon={<IconFont color='white' icon='AC' />} keyValue='AC' pressOperator={this.aC} />
								<Button type='operator' className='Button' childClass='bg-red' opIcon={<IconFont color='white' icon='CE' />} keyValue='CE' pressOperator={this.cE} />
							</Vertical>
						</div>
						<div className='H2'>
							<Vertical pressOperator={this.pressOperator}>
								<Button type='operator' className='Button' childClass='bg-green' opIcon={<IconFont color='white' icon='equals' />} keyValue='=' pressOperator={this.eQ} />
							</Vertical>
						</div>
					</div>
				</Keypad>
			</div>
		)
	}
}

export default App
