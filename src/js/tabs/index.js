
import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'

class Tabs extends React.Component {
  static propTypes = {
    tabs: React.PropTypes.array,
    location: React.PropTypes.object
  }

  static defaultProps = {
    tabs: []
  }

  state = {
    index: -1,
    direction: ''
  }

  /**
   * Handle click on tab
   */
  onClick = (index) => {
    var direction = index > this.state.index ? 'right' : 'left'
    this.setState({
      index,
      direction
    })
  }

  componentDidMount () {
    this.setInkBarPosition(this.props)
  }

  /**
   * Make sure ink bar is removed when no active tab is found anymore.
   */
  componentWillReceiveProps (nextProps) {
    this.setInkBarPosition(nextProps)
  }

  setInkBarPosition = (props) => {
    var activeRouteIndex = -1
    props.tabs.forEach((tab, index) => {
      if (props.location.pathname === tab.href) {
        activeRouteIndex = index
      }
    })
    this.setState({
      index: activeRouteIndex
    })
  }

  /**
   * Render component
   */
  render () {
    var width = 100 / this.props.tabs.length
    var left = this.state.index * width
    var right = (this.props.tabs.length - this.state.index - 1) * width

    return (
      <div className='Tabs'>
        {this.props.tabs.map((tab, index) =>
          <NavLink
            key={index}
            activeClassName='active'
            to={tab.href}
            className='Tabs-Item'
            onClick={() => this.onClick(index)}
          >
            {tab.text}
          </NavLink>
        )}
        {this.state.index === -1
          ? null
          : <div
            className={`Tabs-InkBar transition-${this.state.direction}`}
            style={{
              left: `${left}%`,
              right: `${right}%`
            }}
          />
        }
      </div>
    )
  }
}

export default withRouter(Tabs)
