
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import keycode from 'keycode'

const scrollKeys = [
  keycode('left'),
  keycode('right'),
  keycode('up'),
  keycode('down'),
  keycode('space'),
  keycode('pgup'),
  keycode('pgdn'),
  keycode('end'),
  keycode('home')
].reduce((scrollKeys, key) => {
  scrollKeys[key] = true
  return scrollKeys
}, {})

const preventDefault = (e) => {
  e.preventDefault()
  e.returnValue = false
}

/**
 * Modal component
 */
class Modal extends React.Component {
  handleScrollAndEscKeys = (e) => {
    if (scrollKeys[e.keyCode]) {
      preventDefault(e)
      return false
    } else if (e.keyCode === keycode('esc')) {
      this.props.toggle(false)
    }
  }

  disableScroll () {
    this.onwheel = window.onwheel
    this.ontouchmove = window.ontouchmove
    this.onkeydown = document.onkeydown
    window.addEventListener('DOMMouseScroll', preventDefault, false)
    window.onwheel = preventDefault
    window.ontouchmove = preventDefault
    document.onkeydown = this.handleScrollAndEscKeys
  }

  enableScroll () {
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
    window.onwheel = this.onwheel
    window.ontouchmove = this.ontouchmove
    document.onkeydown = this.onkeydown
  }

  componentWillReceiveProps (props) {
    if (props.visible && !this.props.visible) {
      document.activeElement.blur()
      this.disableScroll()
    } else if (!props.visible && this.props.visible) {
      this.enableScroll()
    }
  }

  render () {
    const {header, body, footer, visible, toggle} = this.props
    return (
      <div
        className={classNames('mdc-Modal-overlay', {'is-visible': visible})}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggle(false)
        }}
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
  }
}

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
