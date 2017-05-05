// <editor-fold desc=''> //
import React, {Component} from 'react'
import DigitalDisplay from './Components/DigitalDisplay'
import DisplayCurrent from './Components/DisplayCurrent'
import DisplayHistory from './Components/DisplayHistory'
import Horizontal from './Components/Horizontal'
import Vertical from './Components/Vertical'
import Keypad from './Components/Keypad'
import Button from './Components/Button/index.js'
import './App.css'
import IconFont from './Components/IconFont/index'
// </editor-fold> //

class App extends Component {
    constructor() {
        super()
        this.state = {
			hist_arr   : [],
			last_arr   : [],
			hist_val   : '0',
			curr_val   : '0',
			last_val   : '',
			prev_total : '',
			is_totaled : false,
			regex_op   : /[+]|[-]|[*]|[/]|[=]/,
			regex_dot  : /[.]/,
        }
    }

// =============== Display Handlers =============== //
// <editor-fold desc=''> //

	updateCurrentDisplayValue = (input, current_value = this.state.curr_val) => {
		if (this.state.regex_op.test(current_value)) {
			this.replaceCurrentValue(input)
		}
	}
	replaceCurrentValue = (new_value, cv = this.state.curr_val) => {
		if (this.state.is_totaled) {
			this.dismissTotal()
			this.replaceCurrentValue(new_value)
			return
		}
	}
	addToCurrentValue = (input, current_value = this.state.curr_val) => {
		this.setState({
			curr_val: [current_value, input].toString(),
		}, () => {
			console.log('DISPLAY UPDATED TO: ', this.state.curr_val.toString())
		})
	}

// </editor-fold> //
// =============== History Methods =============== //
// <editor-fold desc=''> //

	updateHistoryArray = (next_step = this.state.curr_val) => {
		this.setState({
			hist_arr: this.state.hist_arr.push(next_step)
		}, () => {
				console.log('updateHistoryArray(): history array updated')
			}
		)
	}
	updateHistoryValue = (history_array = this.state.hist_arr) => {
		this.setState({
			hist_val: this.state.hist_arr.join("")
		}, () => {
				console.log('updateHistoryValue(): history display updated')
			}
		)
	}
	updateHistory = () => {
		this.updateHistoryArray()
		this.updateHistoryValue()
		console.log('updateHistory(): history operation protocols COMPLETE')
	}
	clearHistory = () => {
		this.setState((state, props) => {
			return {
				hist_arr: [], hist_val: '0', last_arr: state.hist_arr
			}
		})
	}

// </editor-fold> //
// =============== Button Handlers ===============//


    pressNumber = (input_number) => {
		// this.updateHistoryArray()
		if (this.state.is_totaled) {
			this.setState({
				is_totaled: false,
				hist_arr: [],
				curr_val: input_number,
			})
			 // update hist_arr with ttl value
			// view.html(input_number) // replace ttl w/ new input_number in the display
			return // terminate handler early
		}
		else if (this.state.regex_op.test(this.state.curr_val)) {
			// if operator is displayed
			// send current display value to history, replace it with new value
			this.updateHistoryArray(this.state.curr_val)
			this.setState({curr_val : input_number})
			return
		}
		else {
			this.addToCurrentValue(input_number)
			return
		}
	}

	pressOperator = (operator, cv = this.state.curr_val) => {

		if (cv === '+' || cv === '-' || cv === '*' || cv === '/') {

		} else if (this.state.regex_op.test(this.state.curr_val)) {
			this.setState((state, props) => {
				return {
					curr_val: operator,
					hist_arr: state.hist_arr.push(state.curr_val)
				}
			})
			console.log('pressOperator: ', this.state.curr_val, this.state.hist_arr)
		} else {
			this.addToCurrentValue(operator)
		}
	}

    aC = () => { // 'AC' - all clear - re-initialize calculator state
		this.setState({
			hist_arr: [],
			hist_val: "",
			last_arr: [],
			last_val: "",
			curr_val: '',
			is_totaled: false
		})
	}

	cE = () => { // 'CE' - clear entry - re-initialize current value only
		this.setState(
			(this.state.hist_arr.length <= 1) ?
			{curr_val: '', hist_arr: []} :
			{curr_val: ''}
		)
	}

	eQ = () => { // '=' - return result
		if (this.state.is_totaled) return

		let total = this.calculateTotal()

		this.setState((state, props) => {
			return {
				hist_val: 'GRAND TOTAL',
				hist_arr: [],
				is_totaled: true,
				last_arr: state.hist_arr,
				curr_val: total,
			}
		})
		console.log('TOTAL', total, '\n === \n', this.state)
	}

	calculateTotal = (historyArray = this.state.hist_arr) => {
		let next_operator = ""
		let total = historyArray.reduce((accumulator, current, index) => {
			if (index === 0) {
				accumulator += parseFloat(current)
			} else if (this.state.regex_op.test(current)) {
				next_operator = current
			} else {
				switch (next_operator) {
					case "+":
					accumulator += parseFloat(current)
					next_operator = ''
					break
					case "-":
					accumulator -= parseFloat(current)
					next_operator = ''
					break
					case "*":
					accumulator *= parseFloat(current)
					next_operator = ''
					break
					case "/":
					accumulator /= parseFloat(current)
					next_operator = ''
					break
					default :
					console.error('calculateTotal(): function error - no operator present');
				}
			}
			return accumulator
		}, 0)
		return (total.length > 20) ? "chill, bro... jeez." : total.toString()
		// return total.toString()
	}

	dismissTotal = () => {
		this.setState({
			is_totaled: false,
			hist_arr: [],
			curr_val: '',
		})
	}

	decimalToggle = () => {
		this.setState(
			(this.state.regex_dot.test(this.state.curr_val)) ?
			{curr_val: this.state.curr_val.slice(0, -1)} :
			{curr_val: this.state.curr_val.concat('.')}
		)
	}

    render() {
        return (
            <div className="App">

                <div className="display-wrap">

                    <DigitalDisplay>
                        <DisplayCurrent currVal={this.state.curr_val}/>
                        <DisplayHistory histVal={this.state.hist_val}/>
                    </DigitalDisplay>
                </div>

                <Keypad>

                    <div className='H4 W3'>

                        <Horizontal pressNumber={this.pressNumber}>
                            <Button className='Button' childClass='bg-grey' keyValue={9} pressNumber={this.pressNumber}/>
							<Button className='Button' childClass='bg-grey' keyValue={8} pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue={7} pressNumber={this.pressNumber}/>
						</Horizontal>

						<Horizontal pressNumber={this.pressNumber}>
							<Button className='Button' childClass='bg-grey' keyValue={6} pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue={5} pressNumber={this.pressNumber}/>
							<Button className='Button' childClass='bg-grey' keyValue={4} pressNumber={this.pressNumber}/>
                        </Horizontal>

                        <Horizontal pressNumber={this.pressNumber}>
                            <Button className='Button' childClass='bg-grey' keyValue={3} pressNumber={this.pressNumber}/>
							<Button className='Button' childClass='bg-grey' keyValue={2} pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue={1} pressNumber={this.pressNumber}/>
						</Horizontal>

						<Horizontal>

							<Button type='operator' className='Button' childClass='bg-black' opIcon={<IconFont color='white' icon='decimal' />} keyValue='.' pressOperator={this.decimalToggle}/>
							<Button className='Button' childClass='bg-grey' keyValue={0} pressNumber={this.pressNumber}/>
                            <Button type='operator' className='Button' childClass='bg-black' opIcon={<IconFont color='white' icon='plus-minus' />} keyValue='_' pressOperator={this.invertNumber}/>
                        </Horizontal>
                    </div>

                    <div className='H4 W1'>

                        <Vertical>
                            <Button
								type='operator'
								className='Button'
								childClass='bg-sky'
								opIcon={<IconFont color='white' icon='plus'/>}
								keyValue='+'
								pressOperator={this.pressOperator}
                            />

                            <Button
								type='operator'
								className='Button'
								childClass='bg-pink'
								opIcon={<IconFont color='white' icon='minus'/>}
								keyValue='-'
								pressOperator={this.pressOperator}
                            />
							<Button
								type='operator'
								className='Button'
								childClass='bg-pink'
								opIcon={<IconFont color='white' icon='multiply'/>}
								keyValue='*'
								pressOperator={this.pressOperator}
							/>
                            <Button
								type='operator'
								className='Button'
								childClass='bg-magenta'
								opIcon={<IconFont color='white' icon='divide' />}
								keyValue='/'
								pressOperator={this.pressOperator}
                            />
                        </Vertical>
                    </div>

                    <div className="H4 W1">

                        <div className='H2'>

                            <Vertical>
                                <Button type='operator' className='Button' childClass='bg-red' opIcon={< IconFont color='white' icon='AC' />} keyValue='AC' pressOperator={this.aC}/>
                                <Button type='operator' className='Button' childClass='bg-red' opIcon={< IconFont color='white' icon='CE' />} keyValue='CE' pressOperator={this.cE}/>
                            </Vertical>
                        </div>

                        <div className='H2'>

                            <Vertical pressOperator={this.pressOperator}>
                                <Button type='operator' className='Button' childClass='bg-green' opIcon={< IconFont color='white' icon='equals' />} keyValue='=' pressOperator={this.eQ}/>
                            </Vertical>
                        </div>
                    </div>
                </Keypad>
            </div>
        )
    }
}

export default App
