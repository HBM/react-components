
import React from 'react'
import {ArrowDropDown} from '../icon'
import classnames from 'classnames'

export default class Selectnative extends React.Component {
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
        <label className={classnames('mdc-Selectnative', {
          'is-focused': this.state.focus
        })}>
          <div className='mdc-Selectnative-label'>
            {this.props.label}
          </div>
          <div className='mdc-Selectnative-wrapper'>
            <select
              className='mdc-Selectnative-select'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            >
              {this.props.children}
            </select>
            <ArrowDropDown width={22} height={22} fill='rgba(0, 0, 0, 0.24)'/>
          </div>
        </label>
        <div className='mdc-Selectnative-helper'>
          {this.props.helper}
        </div>
      </div>
    )
  }
}
