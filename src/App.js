import React, { Component } from 'react'
import DigitalDisplay from './Components/DigitalDisplay'
import DisplayCurrent from './Components/DisplayCurrent'
import DisplayHistory from './Components/DisplayHistory'
import Horizontal from './Components/Horizontal'
import Vertical from './Components/Vertical'
import Keypad from './Components/Keypad'
import Button from './Components/Button/index.js'
import './App.css'
import IconFont from './Components/IconFont/index'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentNumber: [],
			display: '0',
			history: '0',
			equation: [],
			currentOperator: ''
		}
	}



	_pushDisplayValueToHistory = (displayValue) => {
		this.setState({history: this.state.history.push(this.state.display)})
	}

	pressNumber = (newNum, oldNum) => {
		if (oldNum === '0') {this.setState}
		this.setState({display: this.state.display.concat(number)}, () => {console.log(this.state.display)})
	}


	pressOperator = (operator) => {
		this.setState({})
		this.setState({display: operator}, () => {console.log(this.state.display)})
	}




	render() {
		return (
			<div className="App">

				<div className="display-wrap">

					<DigitalDisplay>
						<DisplayCurrent
							display={this.state.display}
						/>
						<DisplayHistory
							history={this.state.history}
						/>
					</DigitalDisplay>
				</div>

				<Keypad>

					<div className='H4 W3'>

						<Horizontal pressNumber={this.pressNumber}>
							<Button className='Button' childClass='bg-grey' keyValue='9' />
							<Button className='Button' childClass='bg-grey' keyValue='8' />
							<Button className='Button' childClass='bg-grey' keyValue='7' />
						</Horizontal>

						<Horizontal pressNumber={this.pressNumber}>
							<Button className='Button' childClass='bg-grey' keyValue='6' />
							<Button className='Button' childClass='bg-grey' keyValue='5' />
							<Button className='Button' childClass='bg-grey' keyValue='4' />
						</Horizontal>

						<Horizontal pressNumber={this.pressNumber}>
							<Button className='Button' childClass='bg-grey' keyValue='3' />
							<Button className='Button' childClass='bg-grey' keyValue='2' />
							<Button className='Button' childClass='bg-grey' keyValue='1' />
						</Horizontal>

						<Horizontal pressOperator={this.pressOperator} pressNumber={this.pressNumber}>

							<Button
								type='operator'
								className='Button'
								childClass='bg-black'
								opIcon={<IconFont color='white' icon='decimal' />}
								keyValue='.'
							/>
							<Button className='Button' childClass='bg-grey' keyValue='0' />
							<Button
								type='operator'
								className='Button'
								childClass='bg-black'
								opIcon={<IconFont color='white' icon='plus-minus' />}
								keyValue='_'
							/>

						</Horizontal>
					</div>

					<div className='H4 W1'>

						<Vertical pressOperator={this.pressOperator}>
							<Button
								type='operator'
								className='Button'
								childClass='bg-sky'
								opIcon={<IconFont color='white' icon='plus'/>}
								keyValue='+'
							/>
							<Button
								type='operator'
								className='Button'
								childClass='bg-pink'
								opIcon={<IconFont color='white' icon='minus' />}
								keyValue='-'
							/>
							<Button
								type='operator'
								className='Button'
								childClass='bg-blue'
								opIcon={<IconFont color='white' icon='multiply' />}
								keyValue='*'
							/>
							<Button
								type='operator'
								className='Button'
								childClass='bg-magenta'
								opIcon={<IconFont color='white' icon='divide' />}
								keyValue='/'
							/>
						</Vertical>
					</div>

					<div className="H4 W1">

						<div className='H2'>

							<Vertical pressOperator={this.pressOperator}>
								<Button
									type='operator'
									className='Button'
									childClass='bg-red'
									opIcon={<IconFont color='white' icon='AC' />}
									keyValue='AC'
								/>
								<Button
									type='operator'
									className='Button'
									childClass='bg-red'
									opIcon={<IconFont color='white' icon='CE' />}
									keyValue='CE'
								/>
							</Vertical>
						</div>

						<div className='H2'>

							<Vertical pressOperator={this.pressOperator}>
								<Button
									type='operator'
									className='Button'
									childClass='bg-green'
									opIcon={<IconFont color='white' icon='equals' />}
									keyValue='='
								/>
							</Vertical>
						</div>
					</div>
				</Keypad>
			</div>
		)
	}
}

export default App
