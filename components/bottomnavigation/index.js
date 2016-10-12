import React from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'

export default class BottomNavigation extends React.Component {
  render () {
    const {children, links, inverted} = this.props
    return (
      <div className='BottomNavigation'>
        <div className='BottomNavigation-content'>
          {children}
        </div>
        <div className={classNames('BottomNavigation-menu', {'BottomNavigation-menu--inverted': inverted})}>
          {links.map(link => (
            <Link activeClassName='active' to={link.link} className='BottomNavigation-menu-item' key={link.text}>
              {link.icon}
              <div className='BottomNavigation-menu-item-text'>{link.text}</div>
            </Link>
            ))}
        </div>
      </div>
    )
  }
}
