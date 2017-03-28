
/**
 * Spec
 * http://www.google.com/design/spec/patterns/navigation-drawer.html#
 * http://www.google.com/design/spec/patterns/app-structure.html#app-structure-top-level-navigation-strategies
 * http://www.google.com/design/spec/layout/structure.html#structure-side-nav
 */

import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import classnames from 'classnames'
import {Logo, Button, Menu, ChevronRight} from '../icon/'

// height is menu item height.
// we need it in JS instead CSS to calculate overall height of submenu.
// e.g. 10 items in submenu => height = 10 * 48 = 480px.
// we have to know the overall height to animate between height 0 and height 480.
// unfortunately we cannot animate between height 0 and height: auto.
// that's why we cannot set the height in css.
const height = 48

/**
 * Navigation item
 */
class Item extends React.Component {
  state = {
    isOpen: false
  }

  onClick = (item, subItem, e) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
    if ((item.links && !subItem) || (subItem && subItem.links)) {
      // simply open submenu without notifying parent or changing url
      if (e) {
        e.preventDefault()
      }
      return
    }
    this.props.onClick(item, subItem, e)
  }

  /**
   * Update parent component and open submenu on initial render
   */
  componentDidMount () {
    if (this.props.match.isExact) {
      this.onClick(this.props.item, this.props.subItem)
    }
  }

  render () {
    const {index, link, text, onClick, links, item, subItem, match} = this.props
    const {isOpen} = this.state
    return (
      <li className={classnames('Navigation-item', {
        'has-children': links && links.length
      })}>
        <NavLink
          activeClassName='active'
          to={link}
          className='Navigation-link'
          title={text}
          style={{height}}
          onClick={(e) => this.onClick(item, subItem, e)}
        >
          <span>{text}</span>
          {
            links
            ? <ChevronRight className={classnames('Navigation-chevron', {
              'is-open': isOpen
            })} />
            : null
          }
        </NavLink>
        {
          links &&
          <ul className='Navigation' style={{
            display: isOpen ? null : 'none'
          }}>
            {links.map((subItem, j) =>
              <Item
                index={index}
                subIndex={j}
                key={j}
                onClick={subItem.links ? this.onClick : onClick}
                text={subItem.text}
                link={`${link}${subItem.link}`}
                links={subItem.links}
                item={item}
                subItem={subItem}
                match={match}
              />
            )}
          </ul>
        }
      </li>
    )
  }
}

/**
 * Navigation
 */
class Navigation extends React.Component {
  static propTypes = {
    links: React.PropTypes.array,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    links: [],
    onChange: () => {}
  }

  state = {
    visible: false
  }

  onClick = (item, subItem, event) => {
    this.props.onChange(item, subItem)
    this.close()
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
      <div>
        <nav className={this.state.visible ? 'is-visible' : ''}>
          <div className='Navigation-logo'>
            <a href='#' onClick={this.close}>
              <Logo fill='#A7A5A5' />
            </a>
          </div>
          <ul className='Navigation'>
            {this.props.links.map((item, index) =>
              <Item
                index={index}
                key={index}
                onClick={this.onClick}
                text={item.text}
                link={item.link}
                links={item.links}
                item={item}
                match={this.props.match}
              />
            )}
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

export default withRouter(Navigation)
