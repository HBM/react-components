
import React from 'react'
import PropTypes from 'prop-types'
import {Motion, spring} from 'react-motion'

/**
 * Snackbar component
 */

// 1. 'mdc-Snackbar' makes sure all children are centered on page
// 2. 'mdc-Snackbar-background' creates dark background
// 3. 'mdc-Snackbar-content' wraps content so it can animate opacity independently from background
var Snackbar = ({text, action, onAction, visible}) => (
  <Motion style={{
    transform: spring(visible ? 0 : 48),
    opacity: spring(visible ? 1 : 0)
  }}>
    {style => {
      if (style.opacity === 0) { return <span /> }
      return (
        <div className='mdc-Snackbar' style={{
          transform: `translate3d(0, ${style.transform}px, 0)`
        }}>
          <div className='mdc-Snackbar-background'>
            <div className='mdc-Snackbar-content' style={{
              opacity: style.opacity
            }}>
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
      )
    }}
  </Motion>
)

/**
 * Snackbar property types
 */
Snackbar.propTypes = {
  text: PropTypes.string,
  action: PropTypes.string,
  onAction: PropTypes.func,
  visible: PropTypes.bool
}

/**
 * Export Snackbar component
 */
export default Snackbar
