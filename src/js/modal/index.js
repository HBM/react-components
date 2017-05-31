
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * Modal component
 */
var Modal = ({header, body, footer, visible, toggle}) => (
  <div
    className={classNames('mdc-Modal-overlay', {'is-visible': visible})}
    onClick={() => toggle(false)}
    onTouchEnd={() => toggle(false)}
  >
    <div
      className={classNames('mdc-Modal', {'is-visible': visible})}
      onClick={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <div className='mdc-Modal-content'>
        <div className='mdc-Modal-header'>
          {header}
        </div>
        <div className='mdc-Modal-body'>
          {body}
        </div>
      </div>
      <div className='mdc-Modal-footer'>
        {footer}
      </div>
    </div>
  </div>
)

Modal.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  footer: PropTypes.element,
  visible: PropTypes.bool,
  toggle: PropTypes.func
}

Modal.defaultProps = {
  visible: false,
  toggle: () => {}
}

export default Modal
