
import React from 'react'
import {ArrowDropDown} from '../icon'
import classnames from 'classnames'

export default class SelectNative extends React.Component {
  state = {
    focus: false
  }

  onFocus = () => {
    this.setState({
      focus: true
    })
  }

  onBlur = () => {
    this.setState({
      focus: false
    })
  }

  render () {
    return (
      <div>
        <label className={classnames('mdc-SelectNative', {
          'mdc-SelectNative--error': this.props.error,
          'is-focused': this.state.focus
        })}>
          <div className={classnames('mdc-SelectNative-label', {
            'is-focused': this.state.focus
          })}>
            {this.props.label}
          </div>
          <div className='mdc-SelectNative-wrapper'>
            <select
              className='mdc-SelectNative-select'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.props.onChange}
              value={this.props.value}
            >
              {this.props.children}
            </select>
            <ArrowDropDown
              className='mdc-SelectNative-icon'
              width={22}
              height={22}
              fill='rgba(0, 0, 0, 0.24)'
            />
          </div>
        </label>
        <div className={classnames('mdc-SelectNative-helper', {
          'mdc-SelectNative-helper--error': this.props.error
        })}>
          {this.props.error || this.props.helper}
        </div>
      </div>
    )
  }
}
