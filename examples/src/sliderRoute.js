
import React from 'react'
import {Slider} from '../../lib'

export default class SliderRoute extends React.Component {

  state = {
  }

  onMove = (value) => {
    this.setState({value})
  }

  onChange = (settledValue) => {
    this.setState({settledValue})
  }

  render () {
    const min = -20
    const max = 110
    const step = 10
    return (
      <div>
        <section>
          <h2>Slider</h2>
          <Slider
            onChange={this.onChange}
            onMove={this.onMove}
            value={this.state.value}
            step={step}
            min={min}
            max={max}
          />
          <h4>onMove: {this.state.value === undefined ? '-' : this.state.value}</h4>
          <h4>onChange: {this.state.settledValue === undefined ? '-' : this.state.settledValue}</h4>
          <h4>min: {min}</h4>
          <h4>max: {max}</h4>
          <h4>step: {step}</h4>
        </section>
        <section>
          <h2>Default slider</h2>
          <input
            type='range'
            min='0'
            max='100'
          />
        </section>
        <section>
          <h2>Default slider with steps</h2>
          <input
            type='range'
            min='0'
            max='100'
            step='10'
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/sliders.html'>
            https://material.google.com/components/sliders.html
          </a>
        </section>
      </div>
    )
  }

}
