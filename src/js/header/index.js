
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {ChevronRight} from '../icon'

export default class Header extends React.Component {
  state = {
    hasShadow: false
  }

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    this.setState({
      hasShadow: window.scrollY > 0
    })
  }

  render () {
    const {title, subtitle, children, className} = this.props
    const klass = classnames('Header', {
      'has--shadow': this.state.hasShadow
    }, className)
    return (
      <header className={klass}>
        <div className='Header-block'>
          <span className='Header-title'>
            {title}
          </span>
          {
            subtitle &&
            <span className='Header-subtitle'>
              <ChevronRight className='Header-chevron' />
              {subtitle}
            </span>
          }
        </div>
        <div className='Header-block'>
          {children}
        </div>
      </header>
    )
  }
}
