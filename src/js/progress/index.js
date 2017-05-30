
import React from 'react'
import PropTypes from 'prop-types'
import {Motion, spring} from 'react-motion'

class Linear extends React.Component {
  static propTypes = {
    percentage: PropTypes.number
  }

  static defaultProps = {
    percentage: 75
  }

  state = {
    isDone: false
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.percentage >= 100) {
      window.setTimeout(() => {
        this.setState({
          isDone: true
        })
      }, 500)
    }
  }

  render () {
    return (
      <Motion defaultStyle={{x: 0}} style={{x: spring(this.state.isDone ? 0 : 4)}}>
        {
          (value) => value.x !== 0 &&
          <div className='Progress-linear'>
            <div className='Progress-linear-background' style={{height: value.x}}>
              <div className='Progress-linear-inner' style={{width: `${this.props.percentage}%`}} />
            </div>
          </div>
        }
      </Motion>
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
        className='Progress-circular'
        width={svgSize}
        height={svgSize}
        viewBox={viewBox}
      >
        <circle
          style={style}
          className='Progress-circular-path'
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
