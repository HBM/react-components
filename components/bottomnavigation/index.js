import React from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'

export default class BottomNavigation extends React.Component {

  state = {
    scrolling: false
  }

  onScroll = () => {
    const scrollTop = this.contentNode.scrollTop
    const lastScrollTop = this.lastScrollTop
    this.lastScrollTop = scrollTop
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }
    /* only hide menu on scroll down */
    if (lastScrollTop > scrollTop) {
      this.setState({
        scrolling: false
      })
      return
    }
    if (!this.state.scrolling) {
      this.setState({
        scrolling: true
      })
    }
    this.scrollTimer = setTimeout(() => {
      this.setState({
        scrolling: false
      })
    }, 800)
  }

  componentWillMount () {
    this.lastScrollTop = 0
  }

  componentWillUnmount () {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }
  }

  componentWillReceiveProps (props) {
    if (this.contentNode) {
      this.scrollingTop = false
      this.contentNode.scrollTop = 0
    }
  }

  scrollTop = () => {
    if (!this.contentNode) {
      return
    }
    const scrollDuration = 800
    const cosParameter = this.contentNode.scrollTop / 2
    let scrollCount = 0
    const _window = this.props.window || window
    let oldTimestamp = _window.performance.now()
    const step = (newTimestamp) => {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
      if (scrollCount >= Math.PI) {
        this.contentNode.scrollTop = 0
      }
      if (this.contentNode.scrollTop === 0) {
        return
      }
      this.contentNode.scrollTop = Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
      oldTimestamp = newTimestamp
      _window.requestAnimationFrame(step)
    }
    _window.requestAnimationFrame(step)
  }

  render () {
    const {children, links, inverted, location} = this.props
    return (
      <div onScroll={this.onScroll} className={classNames('BottomNavigation', {scrolling: this.state.scrolling})}>
        <div ref={(content) => { this.contentNode = content }} className='BottomNavigation-content'>
          {children}
        </div>
        <div className={classNames('BottomNavigation-menu', {'BottomNavigation-menu--inverted': inverted})}>
          {links.map(link => {
            if (link.link === location.pathname) {
              return (
                <div className='BottomNavigation-menu-item active' key={link.text} onClick={this.scrollTop}>
                  {link.icon}
                  <div className='BottomNavigation-menu-item-text'>{link.text}</div>
                </div>
              )
            } else {
              return (
                <Link to={link.link} className='BottomNavigation-menu-item' key={link.text}>
                  {link.icon}
                  {links.length < 4 && <div className='BottomNavigation-menu-item-text'>{link.text}</div>}
                </Link>
              )
            }
          })}
        </div>
      </div>
    )
  }
}
