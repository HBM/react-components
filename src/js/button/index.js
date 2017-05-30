
import React from 'react'
import classnames from 'classnames'

const Button = ({children, className, filled, raised, dense, ...rest}) => (
  <button
    className={classnames('Button', {
      'Button--raised': raised,
      'Button--filled': filled,
      'Button--dense': dense
    }, className)}
    {...rest}
  >
    {children}
  </button>
)

Button.propTypes = {
  className: React.PropTypes.string,
  dense: React.PropTypes.bool,
  filled: React.PropTypes.bool,
  raised: React.PropTypes.bool
}

Button.defaultProps = {
  dense: false,
  filled: false,
  raised: false
}

export default Button
