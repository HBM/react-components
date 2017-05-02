
/**
 * Spec
 * http://www.google.com/design/spec/patterns/navigation-drawer.html#
 * http://www.google.com/design/spec/patterns/app-structure.html#app-structure-top-level-navigation-strategies
 * http://www.google.com/design/spec/layout/structure.html#structure-side-nav
 */

import React from 'react'
import classnames from 'classnames'
import {Logo, Button, Menu, ChevronRight} from '../icon/'

// height is menu item height.
// we need it in JS instead CSS to calculate overall height of submenu.
// e.g. 10 items in submenu => height = 10 * 48 = 480px.
// we have to know the overall height to animate between height 0 and height 480.
// unfortunately we cannot animate between height 0 and height: auto.
// that's why we cannot set the height in css.
const height = 44

class NavigationGroup extends React.Component {
  state = {
    isOpen: false
  }

  toggleOpen = event => {
    event.stopPropagation()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentDidMount () {
    const children = Array.prototype.slice.call(this.listNode.children)
    this.setState({
      isOpen: children.find(child => child.classList.contains('active'))
    })
  }

  render () {
    const {isOpen} = this.state
    const {children} = this.props
    const maxHeight = isOpen ? React.Children.count(children) * height : 0
    return (
      <li className='Navigation-group'>
        <span className={classnames('Navigation-group-title', {'Navigation-group--opened': isOpen})} onClick={this.toggleOpen} >
          {this.props.title}
          <ChevronRight className='Navigation-group-icon' />
        </span>
        <ul className='Navigation-group-links' ref={node => { this.listNode = node }} style={{maxHeight}}>
          {children}
        </ul>
      </li>
    )
  }
}

/**
 * Navigation
 */
class Navigation extends React.Component {
  state = {
    visible: false
  }

  /**
   * Hide overlay
   */
  close = () => {
    this.setState({
      visible: false
    })
  }

  closeOverlay = (event) => {
    this.close()
    event.preventDefault()
  }

  /**
   * Open overlay
   */
  open = () => {
    this.setState({
      visible: true
    })
  }

  render () {
    return (
      <div className='Navigation'>
        <nav className={classnames('Navigation-sidebar', {'is-visible': this.state.visible})}>
          <div className='Navigation-logo'>
            <a href='#' onClick={this.close}>
              <Logo fill='#A7A5A5' />
            </a>
          </div>
          <ul className='Navigation-links' onClick={this.close} >
            {this.props.children}
          </ul>
        </nav>
        <div className='Navigation-hamburger'>
          <Button onClick={this.open}>
            <Menu />
          </Button>
        </div>
        <div
          className={classnames('Navigation-overlay', {
            'is-visible': this.state.visible
          })}
          onClick={this.closeOverlay}
          onTouchEnd={this.closeOverlay}
        />
      </div>
    )
  }
}

Navigation.Group = NavigationGroup

export default Navigation
