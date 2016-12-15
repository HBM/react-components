import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

/**
 * List components
 * TODO:
 *  - borders (spec not clear about borders)
 *  - condensed
 */
export const List = ({children, style}) => {
  let hasLinks
  React.Children.forEach(children, child => {
    if (!hasLinks) {
      hasLinks = child.props.linkTo !== undefined
    }
  })
  if (hasLinks) {
    return (
      <div className='List' style={style}>
        {children}
      </div>
    )
  }
  return (
    <ol className='List' style={style}>
      {children}
    </ol>
  )
}

export const Row = ({
  avatar,
  className,
  icon,
  linkTo,
  onBlur,
  onClick,
  onFocus,
  primary,
  secondary,
  style,
  subheader
  }) => {
  const onKeyDown = (event) => {
    const arrowUp = 38
    const arrowDown = 40

    if (event.which === arrowDown && event.target.nextSibling) {
      event.preventDefault()
      event.target.nextSibling.focus()
    } else if (event.which === arrowUp && event.target.previousSibling) {
      event.preventDefault()
      event.target.previousSibling.focus()
    }
  }

  const avatarElement =
    avatar &&
    <div className='List-row-avatar' key='avatar'>
      {(typeof avatar === 'string' ? <img src={avatar} /> : avatar)}
    </div>

  const iconLeftElement =
    !avatar && icon &&
    <div className='List-row-icon-left' key='icon-left'>
      {icon}
    </div>

  const iconRightElement =
    avatar && icon &&
    <div className='List-row-icon-right' key='icon-right'>
      {icon}
    </div>

  const isSelectable = onFocus || onBlur

  const dynamicClasses = {
    'List-row--islink': linkTo !== undefined,
    'List-row--oneline': (!secondary && !subheader),
    'List-row--twoline': (secondary && !subheader),
    'List-row--threeline': (secondary && subheader),
    'List-row--selectable': isSelectable
  }

  const textElement = (
    <div className='List-row-text' key='text'>
      <div className='List-row-text-primary'>{primary}</div>
      {subheader && <div className='List-row-text-subheader'>{subheader}</div>}
      {secondary && <span className='List-row-text-secondary'>{secondary}</span>}
    </div>
  )

  const rowContent = [avatarElement, iconLeftElement, textElement, iconRightElement]
  const rowProps = {
    className: classNames(className ? className + ' List-row' : 'List-row', dynamicClasses),
    onClick,
    style,
    onKeyDown,
    onFocus,
    onBlur,
    tabIndex: isSelectable ? '0' : null
  }
  if (linkTo) {
    return <Link to={linkTo} activeClassName='active' {...rowProps}>{rowContent}</Link>
  } else {
    return <li {...rowProps}>{rowContent}</li>
  }
}

const stringOrElement = () => {
  return React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element),
    React.PropTypes.string
  ])
}

Row.propTypes = {
  avatar: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  className: React.PropTypes.string,
  icon: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ]),
  linkTo: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  primary: stringOrElement().isRequired,
  secondary: stringOrElement(),
  style: React.PropTypes.object,
  subheader: stringOrElement()
}
