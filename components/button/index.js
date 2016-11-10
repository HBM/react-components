
import React from 'react'
import classnames from 'classnames'

const Button = ({disabled, children, className, filled, onClick, raised, type}) => (
  <button
    className={classnames('Button', {
      'Button--raised': raised,
      'Button--filled': filled
    }) + ' ' + className}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
)

Button.propTypes = {
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  filled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  raised: React.PropTypes.bool,
  type: React.PropTypes.oneOf(['submit', 'reset', 'button'])
}

Button.defaultProps = {
  className: '',
  disabled: false,
  filled: false,
  raised: false,
  type: 'button'
}

export default Button
