
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
    if (this.props.shadowOnScroll) {
      window.addEventListener('scroll', this.onScroll)
    }
  }

  componentWillUnmount () {
    if (this.props.shadowOnScroll) {
      window.removeEventListener('scroll', this.onScroll)
    }
  }

  onScroll = () => {
    this.setState({
      hasShadow: window.scrollY > 0
    })
  }

  render () {
    const {title, subtitle, children, className} = this.props
    const klass = classnames('mdc-Header', {
      'has--shadow': this.state.hasShadow
    }, className)
    return (
      <header className={klass}>
        <div className='mdc-Header-left'>
          <span className='mdc-Header-title'>
            {title}
          </span>
          {
            subtitle &&
            <span className='mdc-Header-subtitle'>
              <ChevronRight className='mdc-Header-chevron' />
              <div className='mdc-Header-subtitle-text'>{subtitle}</div>
            </span>
          }
        </div>
        <div className='mdc-Header-block'>
          {children}
        </div>
      </header>
    )
  }
}
