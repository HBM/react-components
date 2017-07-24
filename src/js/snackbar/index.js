
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * Snackbar component
 */

// 1. 'mdc-Snackbar' makes sure all children are centered on page
// 2. 'mdc-Snackbar-background' creates dark background
// 3. 'mdc-Snackbar-content' wraps content so it can animate opacity independently from background
var Snackbar = ({text, action, onAction, visible}) => (
  <div className={classnames('mdc-Snackbar', {
    'is-visible': visible
  })}>
    <div className='mdc-Snackbar-background'>
      <div className={classnames('mdc-Snackbar-content', {
        'is-visible': visible
      })}>
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
