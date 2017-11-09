
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Switch component
 */
const Switch = ({checked, disabled, name, onChange, id}) => (
  <label className='mdc-Switch'>
    <input
      checked={checked}
      className='mdc-Switch-input'
      disabled={disabled}
      id={id}
      name={name}
      onChange={onChange}
      type='checkbox'
    />
    <div className='mdc-Switch-track' >
      <div className='mdc-Switch-thumb' />
    </div>
  </label>
)

/**
 * Property types
 */
Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

/**
 * Default properties
 */
Switch.defaultProps = {
  checked: false,
  disabled: false
}

/**
 * Export switch component
 */
export default Switch
