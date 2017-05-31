
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import keycode from 'keycode'

/**
 * List components
 * TODO:
 *  - borders (spec not clear about borders)
 *  - condensed
 */
export const List = ({children, style}) => {
  return (
    <ol className='mdc-List' style={style}>
      {children}
    </ol>
  )
}

export const Row = ({
  avatar,
  className,
  icon,
  onBlur,
  onClick,
  onFocus,
  primary,
  secondary,
  style,
  subheader
  }) => {
  const onKeyDown = (event) => {
    if (event.which === keycode('down') && event.target.nextSibling) {
      event.preventDefault()
      event.target.nextSibling.focus()
    } else if (event.which === keycode('up') && event.target.previousSibling) {
      event.preventDefault()
      event.target.previousSibling.focus()
    }
  }

  const avatarElement =
    avatar &&
    <div className='mdc-List-row-avatar' key='avatar'>
      {(typeof avatar === 'string' ? <img src={avatar} /> : avatar)}
    </div>

  const iconLeftElement =
    !avatar && icon &&
    <div className='mdc-List-row-icon-left' key='icon-left'>
      {icon}
    </div>

  const iconRightElement =
    avatar && icon &&
    <div className='mdc-List-row-icon-right' key='icon-right'>
      {icon}
    </div>

  const isSelectable = onFocus || onBlur

  const dynamicClasses = {
    'mdc-List-row--oneline': (!secondary && !subheader),
    'mdc-List-row--twoline': (secondary && !subheader),
    'mdc-List-row--threeline': (secondary && subheader),
    'mdc-List-row--selectable': isSelectable
  }

  const textElement = (
    <div className='mdc-List-row-text' key='text'>
      <div className='mdc-List-row-text-primary'>{primary}</div>
      {subheader && <div className='mdc-List-row-text-subheader'>{subheader}</div>}
      {secondary && <span className='mdc-List-row-text-secondary'>{secondary}</span>}
    </div>
  )

  const rowContent = [avatarElement, iconLeftElement, textElement, iconRightElement]
  const rowProps = {
    className: classNames('mdc-List-row', dynamicClasses, className),
    onClick,
    style,
    onKeyDown,
    onFocus,
    onBlur,
    tabIndex: isSelectable ? '0' : null
  }
  return <li {...rowProps}>{rowContent}</li>
}

const stringOrElement = () => {
  return PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string
  ])
}

Row.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  className: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  primary: stringOrElement().isRequired,
  secondary: stringOrElement(),
  style: PropTypes.object,
  subheader: stringOrElement()
}
