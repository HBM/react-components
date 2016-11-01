
/**
 * Spec
 * http://www.google.com/design/spec/patterns/navigation-drawer.html#
 * http://www.google.com/design/spec/patterns/app-structure.html#app-structure-top-level-navigation-strategies
 * http://www.google.com/design/spec/layout/structure.html#structure-side-nav
 */

import React from 'react'
import {Link} from 'react-router'
import classnames from 'classnames'
import {Logo, Button, Menu, ChevronRight} from '../icon/'

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
    if (item.links && !subItem) {
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
  componentWillMount () {
    if (this.props.location.pathname.includes(this.props.link)) {
      this.onClick(this.props.item, this.props.subItem)
    }
  }

  render () {
    const {index, link, text, onClick, links, item, subItem, location} = this.props
    const {isOpen} = this.state
    return (
      <li className='Navigation-item'>
        <Link
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
        </Link>
        {
          links &&
          <ul className='Navigation' style={{height: isOpen ? (links.length * height) : 0}}>
            {links.map((subItem, j) =>
              <Item
                index={index}
                subIndex={j}
                key={j}
                onClick={onClick}
                text={subItem.text}
                link={`${link}${subItem.link}`}
                item={item}
                subItem={subItem}
                location={location}
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
export class Navigation extends React.Component {

  static propTypes = {
    links: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  state = {
    visible: false
  }

  onClick = (item, subItem, event) => {
    this.props.onChange(item, subItem)
    this.close(event)
  }

  /**
   * Hide overlay
   */
  close = (event) => {
    this.setState({
      visible: false
    })
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
                location={this.props.location}
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
          onClick={this.close}
          onTouchEnd={this.close}
        />
      </div>
    )
  }

}

export default Navigation
