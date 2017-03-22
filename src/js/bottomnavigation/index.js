import React from 'react'
import {NavLink, Route, withRouter} from 'react-router-dom'
import classNames from 'classnames'

class BottomNavigation extends React.Component {
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
    if (lastScrollTop >= scrollTop) {
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

  resetScrollTop = () => {
    if (this.contentNode) {
      this.contentNode.scrollTop = 0
    }
  }

  updateContentNode = content => {
    if (!content) {
      return
    }
    const scrollTop = this.contentNode ? this.contentNode.scrollTop : 0
    this.contentNode = content
    this.contentNode.scrollTop = scrollTop
  }

  renderLink (link, key) {
    return (
      <Route path={link.link} key={key} children={({match}) => (
        <NavLink to={link.link} className='BottomNavigation-menu-item' activeClassName='active' onClick={match ? this.scrollTop : this.resetScrollTop}>
          {link.icon}
          {(this.props.links.length < 4 || match) && <div className='BottomNavigation-menu-item-text'>{link.text}</div>}
        </NavLink>
      )} />
    )
  }

  render () {
    const {children, links, inverted} = this.props
    return (
      <div onScroll={this.onScroll} className={classNames('BottomNavigation', {scrolling: this.state.scrolling})}>
        <div ref={this.updateContentNode} className='BottomNavigation-content'>
          {children}
        </div>
        <div className={classNames('BottomNavigation-menu', {'BottomNavigation-menu--inverted': inverted})}>
          {links.map((link, index) => this.renderLink(link, index))}
        </div>
      </div>
    )
  }
}

export default withRouter(BottomNavigation)
