
import React from 'react'
import classnames from 'classnames'
import Icon from '../icon/'

export default class Header extends React.Component {

  state = {
    hasShadow: false
  }

  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string
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
    const {title, subtitle, children, color} = this.props
    const klass = classnames({
      'Header--shadow': this.state.hasShadow
    })
    return (
      <header className={klass} style={{backgroundColor: color}}>
        <div className='Header'>
          <div className='Header-block'>
            <span className='Header-title'>
              {title}
            </span>
            {
              subtitle &&
              <span className='Header-subtitle'>
                <Icon.ChevronRight className='Header-chevron' />
                {subtitle}
              </span>
            }
          </div>
          <div className='Header-block'>
            {children}
          </div>
        </div>
      </header>
    )
  }

}
