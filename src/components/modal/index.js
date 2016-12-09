
import React from 'react'
import classNames from 'classnames'

/**
 * Modal component
 */
var Modal = ({header, body, footer, visible, toggle}) => (
  <div
    className={classNames('Modal-overlay', {'is-visible': visible})}
    onClick={() => toggle(false)}
    onTouchEnd={() => toggle(false)}
  >
    <div
      className={classNames('Modal', {'is-visible': visible})}
      onClick={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <div className='Modal-content'>
        <div className='Modal-header'>
          {header}
        </div>
        <div className='Modal-body'>
          {body}
        </div>
      </div>
      <div className='Modal-footer'>
        {footer}
      </div>
    </div>
  </div>
)

Modal.propTypes = {
  header: React.PropTypes.element,
  body: React.PropTypes.element,
  footer: React.PropTypes.element,
  visible: React.PropTypes.bool,
  toggle: React.PropTypes.func
}

Modal.defaultProps = {
  visible: false,
  toggle: () => {}
}

export default Modal
