
import React from 'react'

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
    const direction = index > this.state.index ? 'right' : 'left'
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
    const tabs = Array.prototype.slice.call(this.tabRoot.children)
    const index = tabs.findIndex(tab => tab.firstElementChild.classList.contains('active'))
    this.setState({
      index
    })
  }

  /**
   * Render component
   */
  render () {
    const width = 100 / this.props.tabs.length
    const left = this.state.index * width
    const right = (this.props.tabs.length - this.state.index - 1) * width

    return (
      <div ref={node => { this.tabRoot = node }} className='Tabs'>
        {this.props.tabs.map((tab, index) =>
          <div key={index} onClick={() => this.onClick(index)} className='Tabs-Item'>
            {tab}
          </div>
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

export default Tabs
