
import React from 'react'
import classnames from 'classnames'
import {ChevronRight} from '../icon/'

export default class ExpansionPanel extends React.Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <div className={classnames('mdc-ExpansionPanel', {
        'is-open': this.state.isOpen
      })}>
        <div>
          <button
            className='mdc-ExpansionPanel-toggle'
            onClick={this.toggle}
          >
            {this.props.top}
            <ChevronRight className={classnames('mdc-ExpansionPanel-chevron', {
              'is-open': this.state.isOpen
            })} />
          </button>
          <div className={classnames('mdc-ExpansionPanel-content', {
            'is-open': this.state.isOpen
          })}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
