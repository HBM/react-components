
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export const Divider = 'DIVIDER'

/**
 * Menu component
 */
export function Menu ({items, children, visible, onClick, transformX, transformY}) {
  var hasIcon = false
  for (let i = 0; i < items.length; i++) {
    var item = items[i]
    if (item.icon) {
      hasIcon = true
      break
    }
  }

  return (
    <div className='mdc-Menu'>
      {children}
      <ul className={classnames('mdc-Menu-list', {
        'is-visible': visible
      })} style={{
        top: transformY === 'top' ? 0 : null,
        bottom: transformY === 'bottom' ? 0 : null,
        left: transformX === 'left' ? 0 : null,
        right: transformX === 'right' ? 0 : null,
        transformOrigin: `${transformX} ${transformY}`
      }}>
        {items.map((item, index) => {
          if (item === Divider) {
            return <li key={index} className='mdc-Menu-divider' />
          }
          return (
            <li key={index} className={classnames('mdc-Menu-list-item', {
              'is-visible': visible
            })}>
              <a href='#' className='mdc-Menu-list-item-link' onClick={e => {
                e.preventDefault()
                onClick(item)
              }}>
                {
                  hasIcon &&
                  <div className='mdc-Menu-icon'>
                    {item.icon}
                  </div>
                }
                {item.content || item}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Property types
 */
Menu.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool
}

/**
 * Default properties
 */
Menu.defaultProps = {
  items: ['One', 'Two'],
  visible: false
}
