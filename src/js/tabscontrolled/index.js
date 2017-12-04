
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class TabsControlled extends React.PureComponent {
  static propTypes = {
    tabs: PropTypes.array
  }

  static defaultProps = {
    tabs: [
      'germany',
      'spain',
      'sweden'
    ]
  }

  state = {
    direction: ''
  }

  componentWillReceiveProps (nextProps) {
    const direction = nextProps.index > this.props.index ? 'right' : 'left'
    this.setState({
      direction
    })
  }

  onClick = (event, index) => {
    event.preventDefault()
    this.props.onChange(index)
  }

  render () {
    const width = 100 / this.props.tabs.length
    const left = this.props.index * width
    const right = (this.props.tabs.length - this.props.index - 1) * width
    return (
      <div className='mdc-TabsControlled'>
        {this.props.tabs.map((tab, index) => (
          <a
            key={tab}
            onClick={event => this.onClick(event, index)}
            className={classnames('mdc-TabsControlled-item', {
              'is-active': this.props.index === index
            })}
            href=''
          >
            {tab}
          </a>
        ))}
        {this.props.index === -1 ? null : (
          <div
            className={`mdc-Tabs-InkBar transition-${this.state.direction}`}
            style={{
              left: `${left}%`,
              right: `${right}%`
            }}
          />
        )}
      </div>
    )
  }
}

export default TabsControlled
