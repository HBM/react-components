import React from 'react'
import {Link} from 'react-router'

export default class BottomNavigation extends React.Component {
  render () {
    const {children, links} = this.props
    return (
      <div className='BottomNavigation'>
        <div className='BottomNavigation-content'>
          {children}
        </div>
        <div className='BottomNavigation-menu'>
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
