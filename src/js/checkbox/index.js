
import React from 'react'
import PropTypes from 'prop-types'
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
      <label className='mdc-Checkbox' title={this.props.label} onKeyUp={this.onKeyUp} onBlur={this.onCleanUp}>
        <input
          checked={this.props.checked}
          className={classnames('mdc-Checkbox-input', {'mdc-Checkbox-input--keyboard': this.state.active})}
          defaultChecked={this.props.defaultChecked}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={this.props.onChange}
          type='checkbox'
        />
        <div className='mdc-Checkbox-focus' />
        <div className='mdc-Checkbox-icon'>
          {this.props.checked || this.props.defaultChecked
            ? <CheckBox />
            : <CheckBoxOutlineBlank />
          }
        </div>
        <span className='mdc-Checkbox-label'>
          {this.props.label}
        </span>
      </label>
    )
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
}

Checkbox.defaultProps = {
  disabled: false,
  label: 'Label'
}
