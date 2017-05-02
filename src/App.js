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

class App extends Component {
    constructor() {
        super()
        this.state = {
            currentNumber: [],
            display: '0',
            history: '0',
            equation: [],
            operator: ''
        }
    }

    _pushNumberToHistory = (disVal, hist = this.state.history) => {
		if (hist === '0') {
            this.setState({
                history: (disVal !== '0') ? disVal : '0',
				equation: this.state.equation.push((disVal !== '0') ? disVal : '')
            })
        } else {
			this.setState({
            	history: this.state.history.concat(disVal)
	        }, () => {
				console.log(`pushed ${disVal} to history. New History: ${this.state.history}`)
			})
		}
    }

	_pushOperatorToHistory = (operator, hist = this.state.history) => {
		if (hist === '0') {
            return
        } else {
			this.setState({
            	history: this.state.history.concat(operator)
	        }, () => {
				console.log(`pushed ${operator} to history. New History: ${this.state.history}`)
			})
		}
    }

    pressNumber = (newNum, oldNum = this.state.display) => {
        let dis = this.state.display
        if (dis === '0') {
            this.setState({
                display: dis.slice(1, dis.length).concat(newNum)
            })
        } else {
            this.setState({display: dis.concat(newNum)},
				() => { console.log(dis) }
			)
        }
    }

    pressOperator = ([operator]) => {
		// if (currDisVal){
			this._pushNumberToHistory(this.state.display)
        	this.setState({
            	display: [operator],
				operator
        	}, () => {
            	console.log(this.state.display)
        	})
		// }
    }

    render() {
        return (
            <div className="App">

                <div className="display-wrap">

                    <DigitalDisplay>
                        <DisplayCurrent display={this.state.display}/>
                        <DisplayHistory history={this.state.history}/>
                    </DigitalDisplay>
                </div>

                <Keypad>

                    <div className='H4 W3'>

                        <Horizontal pressNumber={this.pressNumber}>
                            <Button className='Button' childClass='bg-grey' keyValue='9' pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue='8' pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue='7' pressNumber={this.pressNumber}/>
                        </Horizontal>

                        <Horizontal pressNumber={this.pressNumber}>
                            <Button className='Button' childClass='bg-grey' keyValue='6' pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue='5' pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue='4' pressNumber={this.pressNumber}/>
                        </Horizontal>

                        <Horizontal pressNumber={this.pressNumber}>
                            <Button className='Button' childClass='bg-grey' keyValue='3' pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue='2' pressNumber={this.pressNumber}/>
                            <Button className='Button' childClass='bg-grey' keyValue='1' pressNumber={this.pressNumber}/>
                        </Horizontal>

                        <Horizontal>

                            <Button type='operator' className='Button' childClass='bg-black' opIcon={< IconFont color = 'white' icon = 'decimal' />} keyValue='.' pressOperator={this.pressOperator}/>
                            <Button className='Button' childClass='bg-grey' keyValue='0' pressNumber={this.pressNumber}/>
                            <Button type='operator' className='Button' childClass='bg-black' opIcon={< IconFont color = 'white' icon = 'plus-minus' />} keyValue='_' pressOperator={this.pressOperator}/>

                        </Horizontal>
                    </div>

                    <div className='H4 W1'>

                        <Vertical>
                            <Button type='operator' className='Button' childClass='bg-sky' opIcon={< IconFont color = 'white' icon = 'plus' />} keyValue='+' pressOperator={this.pressOperator}/>
                            <Button type='operator' className='Button' childClass='bg-pink' opIcon={< IconFont color = 'white' icon = 'minus' />} keyValue='-' pressOperator={this.pressOperator}/>
                            <Button type='operator' className='Button' childClass='bg-blue' opIcon={< IconFont color = 'white' icon = 'multiply' />} keyValue='*' pressOperator={this.pressOperator}/>
                            <Button type='operator' className='Button' childClass='bg-magenta' opIcon={< IconFont color = 'white' icon = 'divide' />} keyValue='/' pressOperator={this.pressOperator}/>
                        </Vertical>
                    </div>

                    <div className="H4 W1">

                        <div className='H2'>

                            <Vertical pressOperator={this.pressOperator}>
                                <Button type='operator' className='Button' childClass='bg-red' opIcon={< IconFont color = 'white' icon = 'AC' />} keyValue='AC' pressOperator={this.pressOperator}/>
                                <Button type='operator' className='Button' childClass='bg-red' opIcon={< IconFont color = 'white' icon = 'CE' />} keyValue='CE' pressOperator={this.pressOperator}/>
                            </Vertical>
                        </div>

                        <div className='H2'>

                            <Vertical pressOperator={this.pressOperator}>
                                <Button type='operator' className='Button' childClass='bg-green' opIcon={< IconFont color = 'white' icon = 'equals' />} keyValue='=' pressOperator={this.pressOperator}/>
                            </Vertical>
                        </div>
                    </div>
                </Keypad>
            </div>
        )
    }
}

export default App
