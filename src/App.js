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
			display: '0',
			history: '0',
			equation: [0],
			currentOperator: ''
		}
		this.pressNumber = this.pressNumber.bind(this)
		this.pressOperator = this.pressOperator.bind(this)

	}

	pressNumber(e) {
		console.log(this.state.display)
		let nextNum = e.target.props.keyValue
		this.setState({display: this.state.display.concat(nextNum)}, () => {console.log(this.state.display)})
	}


	pressOperator(e) {
		console.log(this.state.display)
		let nextOp = e.target.props.keyValue
		this.setState({display: this.state.display.concat(nextOp)}, () => {console.log(this.state.display)})
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
							<Button type='operator' className='Button' childClass='bg-black' keyValue='.'>
								<IconFont color='white' icon='decimal' />
							</Button>
							<Button className='Button' childClass='bg-grey' keyValue='0' />
							<Button type='operator' className='Button' childClass='bg-black' keyValue='+/-'>
								<IconFont color='white' icon='plus-minus' />
							</Button>
						</Horizontal>
					</div>

					<div className='H4 W1'>

						<Vertical pressOperator={this.pressOperator}>
							<Button type='operator' className='Button' childClass='bg-sky' keyValue='+'>
								<IconFont color='white' icon='plus' />
							</Button>
							<Button type='operator' className='Button' childClass='bg-pink' keyValue='-'>
								<IconFont color='white' icon='minus' />
							</Button>
							<Button type='operator' className='Button' childClass='bg-blue' keyValue='x'>
								<IconFont color='white' icon='multiply' />
							</Button>
							<Button type='operator' className='Button' childClass='bg-magenta' keyValue='/'>
								<IconFont color='white' icon='divide' />
							</Button>
						</Vertical>
					</div>

					<div className="H4 W1">

						<div className='H2'>

							<Vertical pressOperator={this.pressOperator}>
								<Button type='operator' className='Button' childClass='bg-red' keyValue='AC'>
									<IconFont color='white' icon='AC' />
								</Button>
								<Button type='operator' className='Button' childClass='bg-red' keyValue='CE'>
									<IconFont color='white' icon='CE' />
								</Button>
							</Vertical>
						</div>

						<div className='H2'>

							<Vertical pressOperator={this.pressOperator}>
								<Button type='operator' className='Button' childClass='bg-green' keyValue='='>
									<IconFont color='white' icon='equals' />
								</Button>
							</Vertical>
						</div>
					</div>
				</Keypad>
			</div>
		)
	}
}

export default App
