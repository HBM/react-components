import React from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'

export default class BottomNavigation extends React.Component {

  state = {
    scrolling: false
  }

  onScroll = () => {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }
    if (!this.state.scrolling) {
      this.setState({
        scrolling: true
      })
    }
    this.scrollTimeout = setTimeout(() => {
      this.setState({
        scrolling: false
      })
    }, 1000)
  }

  componentWillUnmount () {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }
  }

  render () {
    const {children, links, inverted} = this.props
    return (
      <div onScroll={this.onScroll} className={classNames('BottomNavigation', {scrolling: this.state.scrolling})}>
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
