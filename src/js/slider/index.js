
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Slider
 */

const clip = (v, min, max) => {
  if (v < min) {
    return min
  }
  if (v > max) {
    return max
  }
  return v
}

export default class Slider extends React.Component {
  getSteppedValue = (value) => {
    if (this.props.step) {
      const steps = (value - this.state.prevValue) / this.props.step
      if (Math.round(steps)) {
        return this.state.prevValue + Math.round(steps) * this.props.step
      }
    } else {
      return value
    }
  }

  updateMoveValue = (value) => {
    const newValue = this.getSteppedValue(value)
    if (newValue !== undefined && newValue !== this.state.prevValue) {
      this.setState({value: newValue, prevValue: newValue})
      if (this.props.onMove) {
        this.props.onMove(newValue)
      }
    }
  }

  setValue = function (value) {
    this.setState({value, prevValue: value})
    if (this.props.onChange) {
      this.props.onChange(value)
    }
    if (this.props.onMove) {
      this.props.onMove(value)
    }
  }

  onChange = (event) => {
    const value = parseFloat(event.target.value, 10)
    this.setValue(clip(value, this.props.min, this.props.max))
  }

  constructor (props) {
    super(props)
    this.state = {
      mouseDown: false,
      isAnimating: false,
      value: props.value || 0,
      prevValue: props.value || 0,
      step: 1,
      // ratio between actual dom element width and range value (min -> max)
      ratio: 1
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({value: nextProps.value, prevValue: nextProps.value})
    }
  }

  // get initial width of dom element
  componentDidMount () {
    // const {slider} = this.refs
    const width = this.c.getBoundingClientRect().width - 16
    this.setState({
      ratio: width / (this.props.max - this.props.min)
    })
  }

  onMouseUp = (event) => {
    this.setState({
      mouseDown: false
    })
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('touchmove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('touchend', this.onMouseUp)
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }

  getValueFromSlider = (event) => {
    // const {slider} = this.refs
    const pageX = event.pageX || event.touches[0].pageX
    const x = pageX - 8 - this.c.getBoundingClientRect().left
    return clip(x / this.state.ratio + this.props.min, this.props.min, this.props.max)
  }

  onMouseDown = (event) => {
    event.preventDefault()
    this.setState({
      mouseDown: true
    })
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('touchmove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('touchend', this.onMouseUp)
  }

  onMouseMove = (event) => {
    if (this.state.mouseDown) {
      const value = this.getValueFromSlider(event)
      this.updateMoveValue(value)
    }
  }

  onClick = (event) => {
    const value = this.getValueFromSlider(event)
    const steppedValue = this.getSteppedValue(value)
    if (steppedValue !== undefined) {
      this.setValue(steppedValue)
    }
  }

  render () {
    const position = (this.state.value - this.props.min) * this.state.ratio

    return (
      <label className='mdc-Slider'>
        <input
          className='mdc-Slider-input'
          max={this.props.max}
          min={this.props.min}
          onChange={this.onChange}
          type='range'
          value={this.state.value}
          step={this.props.step}
        />
        <div
          className='mdc-Slider-track'
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onTouchMove={this.onMouseMove}
          onClick={this.onClick}
          ref={(c) => { this.c = c }}
        >
          <div className='mdc-Slider-track-off'>
            <div className='mdc-Slider-track-on' style={{width: `${position}px`}} />
          </div>
          <div
            className={`mdc-Slider-thumb${this.state.value === this.props.min ? ' is-zero' : ''}`}
            style={{left: `${position}px`}}
          />
        </div>
      </label>
    )
  }
}

Slider.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  onChange: PropTypes.func,
  onMove: PropTypes.func
}

Slider.defaultProps = {
  value: 0
}
