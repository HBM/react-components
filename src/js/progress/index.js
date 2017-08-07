
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const isActive = percentage => (percentage > 0) && (percentage < 99)

class Linear extends React.Component {
  static propTypes = {
    percentage: PropTypes.number
  }

  static defaultProps = {
    percentage: 75
  }

  render () {
    return (
      <div className='mdc-Progress-linear'>
        <div className={classnames('mdc-Progress-linear-background', {
          'is-active': isActive(this.props.percentage)
        })}>
          <div className='mdc-Progress-linear-inner' style={{width: `${this.props.percentage}%`}} />
        </div>
      </div>
    )
  }
}

class Circular extends React.Component {
  static propTypes = {
    percentage: PropTypes.number
  }

  static defaultProps = {
    percentage: 0
  }

  render () {
    const radius = 30
    const strokeWidth = 6
    const length = 2 * Math.PI * 30
    const size = 2 * radius + strokeWidth
    const svgSize = '100%'
    const viewBox = '0 0 ' + size + ' ' + size
    const center = size / 2
    const style = {
      strokeDasharray: length + ' ' + length,
      strokeDashoffset: length - (this.props.percentage * length / 100),
      strokeWidth: strokeWidth
    }
    return (
      <svg
        className='mdc-Progress-circular'
        width={svgSize}
        height={svgSize}
        viewBox={viewBox}
      >
        <circle
          style={style}
          className='mdc-Progress-circular-path'
          fill='none'
          cx={center}
          cy={center}
          r={radius}
        />
      </svg>
    )
  }
}

export default {Linear, Circular}
