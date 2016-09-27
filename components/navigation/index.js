
/**
 * Spec
 * http://www.google.com/design/spec/patterns/navigation-drawer.html#
 * http://www.google.com/design/spec/patterns/app-structure.html#app-structure-top-level-navigation-strategies
 * http://www.google.com/design/spec/layout/structure.html#structure-side-nav
 */

import React from 'react'
import {Link} from 'react-router'
import classnames from 'classnames'
import Icon from '../icon/'

/**
 * Navigation item
 */
const Item = ({index, onClick, item}) => (
  <li key={index} className='Navigation-item' onClick={onClick}>
    <Link
      activeClassName='active'
      to={item.link}
      className='Navigation-link'
      title={item.text}
    >
      {item.text}
    </Link>
    {item.links &&
      <ul className='Navigation'>
        {item.links.map((item, index) =>
          <Item
            key={index}
            onClick={onClick}
            item={item}
          />
        )}
      </ul>
    }
  </li>
)

/**
 * Navigation
 */
// also export to enable tests (which don't require the router)
export class Navigation extends React.Component {

  /**
   * Property types
   */
  static propTypes = {
    links: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func
  }

  /**
   * Default properties
   */
  static defaultProps = {
    onChange: () => {}
  }

  /**
   * State
   */
  state = {
    visible: false
  }

  /**
   * Handle click on navigation link
   */
  onClick = (event, index) => {
    const item = this.props.links[index]
    this.props.onChange(item)
    this.close(event)
  }

  /**
   * Hide overlay
   */
  close = (event) => {
    event.preventDefault()
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

  /**
   * Update parent component on initial render
   */
  componentDidMount () {
    let activeRouteIndex = 0
    this.props.links.forEach((link, index) => {
      if (this.props.location.pathname === link.link) {
        activeRouteIndex = index
      }
    })
    this.props.onChange(this.props.links[activeRouteIndex])
  }

  /**
   * Render component
   */
  render () {
    return (
      <div>
        <nav className={this.state.visible ? 'is-visible' : ''}>
          <div className='Navigation-logo'>
            <a href='#' onClick={this.close}>
              <Icon.Logo fill='#A7A5A5' />
            </a>
          </div>
          <ul className='Navigation'>
            {this.props.links.map((item, index) =>
              <Item
                key={index}
                onClick={(event) => this.onClick(event, index)}
                item={item}
              />
            )}
          </ul>
        </nav>
        <div className='Navigation-hamburger'>
          <Icon.Button onClick={this.open}>
            <Icon.Menu />
          </Icon.Button>
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
