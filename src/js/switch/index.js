
import React from 'react'

/**
 * Switch component
 */
var Switch = ({checked, disabled, name, onChange}) => (
  <label className='Switch'>
    <input
      checked={checked}
      className='Switch-input'
      disabled={disabled}
      name={name}
      onChange={onChange}
      type='checkbox'
    />
    <div className='Switch-track' >
      <div className='Switch-thumb' />
    </div>
  </label>
)

/**
 * Property types
 */
Switch.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
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
