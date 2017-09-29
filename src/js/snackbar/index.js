
import React from 'react'
import PropTypes from 'prop-types'
import {CSSTransition} from 'react-transition-group'

// 1. 'mdc-Snackbar' makes sure all children are centered on page
// 2. 'mdc-Snackbar-background' creates dark background
// 3. 'mdc-Snackbar-content' wraps content so it can animate opacity independently from background
const Snackbar = ({text, action, onAction, visible}) => (
  <CSSTransition in={visible} timeout={500} classNames='fade' unmountOnExit mountOnEnter appear>
    <div className='mdc-Snackbar'>
      <div className='mdc-Snackbar-background'>
        <div className='mdc-Snackbar-content'>
          <span className='mdc-Snackbar-text'>
            {text}
          </span>
          {
            action &&
            <input
              type='button'
              className='mdc-Snackbar-action'
              onClick={onAction}
              value={action}
            />
          }
        </div>
      </div>
    </div>
  </CSSTransition>
)

Snackbar.propTypes = {
  text: PropTypes.string,
  action: PropTypes.string,
  onAction: PropTypes.func,
  visible: PropTypes.bool
}

export default Snackbar
