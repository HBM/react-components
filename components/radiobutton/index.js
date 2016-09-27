
import React from 'react'
import classNames from 'classnames'
import {RadioButtonChecked, RadioButtonUnchecked} from '../icon'

const spaceKey = 32

class RadioButton extends React.Component {
  state = {
    kbPressed: false
  }

  setKbPressed = (e) => {
    if (e.which === spaceKey) {
      e.preventDefault()
      if (this.props.selectedValue !== e.target.value) {
        this.props.onChange(e.target.value)
      }
    }
    this.setState({kbPressed: true})
  }

  resetKbPressed = () => {
    this.setState({kbPressed: false})
  }

  render () {
    const {name, selectedValue, items, onChange} = this.props
    const {kbPressed} = this.state
    const focusFirst = kbPressed && items.indexOf(selectedValue) < 0
    return (
      <div className={classNames('RadioButton', {'RadioButton--keyboard': kbPressed})}
        onKeyUp={this.setKbPressed}
        onClick={this.resetKbPressed}
        onBlur={this.resetKbPressed}
        >
        {items.map((item, index) => {
          var checked = item.toLowerCase() === selectedValue.toLowerCase()
          return (
            <label key={index} className={classNames('RadioButton-item', {'RadioButton-item--keyboard': index === 0 && focusFirst})}>
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
                  ? <RadioButtonChecked />
                  : <RadioButtonUnchecked />
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
