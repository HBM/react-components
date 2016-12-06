
import React from 'react'
import classnames from 'classnames'

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
    left: 'auto',
    visible: this.props.visible
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  hide = () => {
    this.setState({
      visible: false
    })
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
    var tooltipRect = this.tooltipRef.getBoundingClientRect()
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
    const {left} = this.state
    return (
      <div onMouseOver={this.show} onMouseOut={this.hide}>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            ref: 'content'
          })
        )}
        <div className={classnames(
          'Tooltip',
          {'is-active': this.state.visible})}
          ref={(component) => { this.tooltipRef = component }} style={{left}}
        >
          {this.props.content}
        </div>
      </div>
    )
  }

}
