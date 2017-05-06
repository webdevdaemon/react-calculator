import React, {Component} from 'react'

// <editor-fold desc='IMPORTS'> //
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
			
        }
    }

// =============== Display Handlers =============== //
// <editor-fold desc='DISPLAY'> //

// </editor-fold> //
// =============== History Methods =============== //
// <editor-fold desc='HISTORY'> //

// </editor-fold> //
// =============== Button Handlers =============== //
// <editor-fold desc='BUTTON'> //
	seperateCurrentValueFromOperator = (cv = this.state.curr_val) => {

	}
    pressNumber = (input_number) => {

	}
	pressOperator = (operator, cv = this.state.curr_val) => {

	}
	dot = () => {

	}
    aC = () => { // 'AC' - all clear - re-initialize calculator state

	}
	cE = () => { // 'CE' - clear entry - re-initialize current value only

	}
	eQ = () => { // '=' - return result

	}

// </editor-fold> //
// =============== Total Handlers =============== //
// <editor-fold desc='TOTAL'> //

// </editor-fold> //

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
