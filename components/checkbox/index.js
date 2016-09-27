
import React from 'react'
import classnames from 'classnames'
import {CheckBox, CheckBoxOutlineBlank} from '../icon'

export default class Checkbox extends React.Component {

  state = {
    active: false
  }

  onCleanUp = (e) => {
    this.setState({
      active: false
    })
  }

  onKeyUp = (e) => {
    if (e.keyCode === 9) {
      this.setState({
        active: true
      })
    }
  }

  render () {
    return (
      <label className='Checkbox' title={this.props.label} onKeyUp={this.onKeyUp} onBlur={this.onCleanUp}>
        <input
          checked={this.props.checked}
          className={classnames('Checkbox-input', {'Checkbox-input--keyboard': this.state.active})}
          defaultChecked={this.props.defaultChecked}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={this.props.onChange}
          type='checkbox'
        />
        <div className='Checkbox-focus' />
        <div className='Checkbox-icon'>
          {this.props.checked || this.props.defaultChecked
            ? <CheckBox />
            : <CheckBoxOutlineBlank />
          }
        </div>
        <span className='Checkbox-label'>
          {this.props.label}
        </span>
      </label>
    )
  }
}

Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  defaultChecked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func
}

Checkbox.defaultProps = {
  disabled: false,
  label: 'Label'
}
