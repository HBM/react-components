
import React from 'react'
import classNames from 'classnames'

/**
 * Radio button off - ic_radio_button_off_24px.svg
 */
const RadioButtonOff = () => (
  <svg width='24' height='24' viewBox='0 0 24 24'>
    <path
      d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
    />
  </svg>
)

/**
 * Radio button on - ic_radio_button_on_24px.svg
 */
const RadioButtonOn = () => (
  <svg width='24' height='24' viewBox='0 0 24 24'>
    <path
      d='M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
    />
  </svg>
)

class RadioButton extends React.Component {
  state = {
    kbPressed: false
  }

  setKbPressed = () => {
    this.setState({kbPressed: true})
  }

  resetKbPressed = () => {
    this.setState({kbPressed: false})
  }

  render () {
    const {name, selectedValue, items, onChange} = this.props
    return (
      <div className={classNames('RadioButton', {'RadioButton--keyboard': this.state.kbPressed})}
        onKeyUp={this.setKbPressed}
        onClick={this.resetKbPressed}
        onBlur={this.resetKbPressed}
        >
        {items.map((item, index) => {
          var checked = item.toLowerCase() === selectedValue.toLowerCase()
          return (
            <label key={index} className='RadioButton-item'>
              <input
                checked={checked}
                className='RadioButton-input'
                name={name}
                onChange={onChange.bind(this, item)}
                type='radio'
                value={item}
              />
              <div className='RadioButton-icon'>
                {checked
                  ? <RadioButtonOn />
                  : <RadioButtonOff />
                }
              </div>
              <span className='RadioButton-label'>
                {item}
              </span>
            </label>
          )
        })}
      </div>
    )
  }
}

RadioButton.propTypes = {
  name: React.PropTypes.string.isRequired,
  selectedValue: React.PropTypes.string,
  items: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired
}

RadioButton.defaultProps = {
  selectedValue: 'two',
  items: ['one', 'two', 'three']
}

export default RadioButton
