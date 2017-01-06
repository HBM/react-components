
import React from 'react'
import classnames from 'classnames'

const Button = ({children, className, filled, raised, ...rest}) => (
  <button
    className={classnames('Button', {
      'Button--raised': raised,
      'Button--filled': filled
    }, className)}
    {...rest}
  >
    {children}
  </button>
)

Button.propTypes = {
  className: React.PropTypes.string,
  filled: React.PropTypes.bool,
  raised: React.PropTypes.bool
}

Button.defaultProps = {
  filled: false,
  raised: false
}

export default Button
