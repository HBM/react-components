import React from 'react'
import {Link, Match} from 'react-router'
import classNames from 'classnames'
import {Subscriber} from 'react-broadcast'

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

  renderLink (link, key) {
    return (
      <Match pattern={link.link} key={key} children={({matched}) => (
        <Link to={link.link} className='BottomNavigation-menu-item' activeClassName='active' onClick={matched && this.scrollTop}>
          {link.icon}
          {(this.props.links.length < 4 || matched) && <div className='BottomNavigation-menu-item-text'>{link.text}</div>}
        </Link>
      )} />
    )
  }

  render () {
    const {children, links, inverted} = this.props
    return (
      <Subscriber channel='location'>
        {location => (
          <div onScroll={this.onScroll} className={classNames('BottomNavigation', {scrolling: this.state.scrolling})}>
            <div ref={(content) => { this.contentNode = content }} className='BottomNavigation-content'>
              {children}
            </div>
            <div className={classNames('BottomNavigation-menu', {'BottomNavigation-menu--inverted': inverted})}>
              {links.map((link, index) => this.renderLink(link, index))}
            </div>
          </div>
        )}
      </Subscriber>
    )
  }
}
