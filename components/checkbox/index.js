
import React from 'react'
import classnames from 'classnames'

/**
 * Check box - ic_check_box_24px.svg
 */
const IconCheckbox = () => (
  <svg width='24' height='24' viewBox='0 0 24 24'>
    <path
      d='M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
    />
  </svg>
)

/**
 * Check box outline blank - ic_check_box_outline_blank_24px.svg
 */
const IconCheckboxOutline = () => (
  <svg width='24' height='24' viewBox='0 0 24 24'>
    <path
      d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'
    />
  </svg>
)

export default class Checkbox extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
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
            ? <IconCheckbox />
            : <IconCheckboxOutline />
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
