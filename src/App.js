import React, {Component} from 'react'
import './App.css'

import Button from './Components/Button/index'
import DigitalDisplay from './Components/DigitalDisplay/index'
import DisplayCurrent from './Components/DisplayCurrent/index'
import DisplayHistory from './Components/DisplayHistory/index'
import Horizontal from './Components/Horizontal/index'
import Vertical from './Components/Vertical/index'
import Keypad from './Components/Keypad/index'
import IconFont from './Components/IconFont/index'

class App extends Component {
	constructor() {
		super()
		this.state = {
			current_value_array: [],
			hidden_history_array: [],
			visible_display_string: '0',
			visible_history_string: '0',
			is_totaled: false
		}
	}

	pressNumber = (number, vd_str = this.state.visible_display_string) => {
		if (isNaN(parseFloat(this.state.visible_display_string))) { // (IF IS NOT) - if vis_dis_val IS NOT A NUMBER...
			this.setState((state, props) => {
				return {
					hidden_history_array: state.hidden_history_array.concat(vd_str),
					visible_display_string: number.toString(),
					visible_history_string: state.hidden_history_array.concat(vd_str).join(""),
					current_value_array: state.current_value_array.concat(number)
				}
			})
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
		this.setState(
			// (IF IS) - if vis_dis_str IS a NUMBER...
			(!isNaN(parseFloat(this.state.visible_display_string))) ?
			{
				hidden_history_array: this.state.hidden_history_array.concat(this.state.visible_display_string),
				current_value_array: [],
				visible_display_string: operator
			} :
			{
				visible_display_string: operator
			} ,
			() => {
				if (!isNaN(parseFloat(vd_str))) { // (IF IS)
					this.setState({visible_history_string: this.state.hidden_history_array.join("")})
				} else {
					return
				}
			}
		)
	}

	aC = () => {
		this.setState({
			current_value_array: [],
			hidden_history_array: [],
			visible_display_string: '0',
			visible_history_string: '0',
			is_totaled: false
		})
	}

	cE = () => {

	}
	
render() {
	return (
			<div className="App">
				<div className="display-wrap">
					<DigitalDisplay>
						<DisplayCurrent
							displayValue={this.state.visible_display_string}
						/>
						<DisplayHistory
							historyValue={this.state.visible_history_string}
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
							<Button type='operator' className='Button' childClass='bg-black' opIcon={<IconFont color='white' icon='decimal'/>} keyValue='.' pressOperator={this.decimalToggle} />
							<Button className='Button' childClass='bg-grey' keyValue={0} pressNumber={this.pressNumber} />
							<Button type='operator' className='Button' childClass='bg-black' opIcon={<IconFont color='white' icon='plus-minus'/>} keyValue='_' pressOperator={this.invertNumber} />
						</Horizontal>
					</div>
					<div className='H4 W1'>
						<Vertical>
							<Button type='operator' className='Button' childClass='bg-sky' opIcon={<IconFont color='white' icon='plus'/>} keyValue='+' pressOperator={this.pressOperator} />
							<Button type='operator' className='Button' childClass='bg-pink' opIcon={<IconFont color='white' icon='minus'/>} keyValue='-' pressOperator={this.pressOperator} />
							<Button type='operator' className='Button' childClass='bg-pink' opIcon={<IconFont color='white' icon='multiply'/>} keyValue='*' pressOperator={this.pressOperator} />
							<Button type='operator' className='Button' childClass='bg-magenta' opIcon={<IconFont color='white' icon='divide' />} keyValue='/' pressOperator={this.pressOperator} />
						</Vertical>
					</div>
					<div className="H4 W1">
						<div className='H2'>
							<Vertical>
								<Button type='operator' className='Button' childClass='bg-red' opIcon={< IconFont color='white' icon='AC' />} keyValue='AC' pressOperator={this.aC} />
								<Button type='operator' className='Button' childClass='bg-red' opIcon={< IconFont color='white' icon='CE' />} keyValue='CE' pressOperator={this.cE} />
							</Vertical>
						</div>
						<div className='H2'>
							<Vertical pressOperator={this.pressOperator}>
								<Button type='operator' className='Button' childClass='bg-green' opIcon={< IconFont color='white' icon='equals' />} keyValue='=' pressOperator={this.eQ} />
							</Vertical>
						</div>
					</div>
				</Keypad>
			</div>
		)
	}
}

export default App
