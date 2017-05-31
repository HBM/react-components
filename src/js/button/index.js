
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Button = ({children, className, filled, raised, dense, ...rest}) => (
  <button
    className={classnames('mdc-Button', {
      'mdc-Button--raised': raised,
      'mdc-Button--filled': filled,
      'mdc-Button--dense': dense
    }, className)}
    {...rest}
  >
    {children}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  dense: PropTypes.bool,
  filled: PropTypes.bool,
  raised: PropTypes.bool
}

Button.defaultProps = {
  dense: false,
  filled: false,
  raised: false
}

export default Button
