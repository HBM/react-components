
import React from 'react'
import {Motion, spring} from 'react-motion'

/**
 * Tooltip
 */
export default class Tooltip extends React.Component {

  /**
   * Property types
   */
  static propTypes = {
    content: React.PropTypes.string,
    visible: React.PropTypes.bool
  }

  /**
   * Default properties
   */
  static defaultProps = {
    content: 'tooltip content',
    visible: false
  }

  /**
   * Initial state
   */
  state = {
    left: 'auto'
  }

  /**
   * Get width of tooltip
   */
  componentDidMount () {
    // to get the right width we have to make sure
    // that the tooltip is scaled properly
    // invisible tooltips are scaled down to 0
    // and there we aren't able to get the right width

    // when initially hidden we do not have any refs
    if (!this.tooltipRef) { return }
    var tooltipDOM = this.tooltipRef
    tooltipDOM.style.transform = 'scale(1)'
    var tooltipRect = tooltipDOM.getBoundingClientRect()
    var contentRect = this.refs.content.getBoundingClientRect()
    var left = (contentRect.width / 2) + contentRect.left - (tooltipRect.width / 2)
    this.setState({left})
  }

  /**
   * Placeholder for tooltip ref
   * first-class references
   * https://github.com/reactjs/react-future/blob/master/01%20-%20Core/06%20-%20Refs.js
   * https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
   */
  tooltipRef = null

  /**
   * Render component
   */
  render () {
    return (
      <div>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            ref: 'content'
          })
        )}
        <Motion style={{val: spring(this.props.visible ? 1 : 0)}}>
          {style => {
            return (
              <div className='Tooltip' ref={(component) => { this.tooltipRef = component }} style={{
                left: this.state.left,
                opacity: style.val,
                transform: `scale(${style.val})`
              }}>
                {this.props.content}
              </div>
            )
          }}
        </Motion>
      </div>
    )
  }

}
