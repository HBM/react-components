import React from 'react'
import classNames from 'classnames'

export class BottomNavigation extends React.Component {
  static propTypes = {
    scrollDuration: React.PropTypes.number
  }

  static defaultProps = {
    scrollDuration: 800
  }

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
    }, this.props.scrollDuration)
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
    const scrollDuration = this.props.scrollDuration
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

  scrollTopOrResetTop = event => {
    const linkNode = event.currentTarget.firstElementChild
    if (linkNode.classList.contains('active')) {
      this.scrollTop()
    } else {
      this.resetScrollTop()
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

  render () {
    const {children, links, inverted} = this.props
    const menuClassName = classNames('BottomNavigation-menu', {
      'BottomNavigation-menu--inverted': inverted,
      'BottomNavigation-menu--narrow': links.length > 3
    })
    return (
      <div onScroll={this.onScroll} className={classNames('BottomNavigation', {scrolling: this.state.scrolling})}>
        <div ref={this.updateContentNode} className='BottomNavigation-content'>
          {children}
        </div>
        <div className={menuClassName} >
          {links.map((link, index) => {
            return (
              <div key={index} className='BottomNavigation-menu-item' onClick={this.scrollTopOrResetTop} >
                {link}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export const BottomNavigationText = ({children}) => <div className='BottomNavigation-menu-item-text'>{children}</div>
