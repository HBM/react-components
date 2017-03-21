
import React from 'react'
import {Switch} from '../../lib'

export default class SwitchRoute extends React.Component {
  state = {
    switch: false
  }

  onChange = (event) => {
    const {name, checked} = event.target
    this.setState({
      [name]: checked
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Switch</h2>
          <Switch
            name='switch'
            checked={this.state.switch}
            onChange={this.onChange}
          />
        </section>
        <section>
          <h2>Switch on</h2>
          <Switch
            name='switch'
            checked
            onChange={(event) => console.log(event)}
          />
        </section>
        <section>
          <h2>Switch disabled</h2>
          <Switch
            disabled
            name='switch'
            checked
            onChange={(event) => console.log(event)}
          />
        </section>
        <section>
          <h2>Default checkbox</h2>
          <label>
            <input type='checkbox' />
            Checkbox
          </label>
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/selection-controls.html#selection-controls-switch'>
            https://material.google.com/components/selection-controls.html#selection-controls-switch
          </a>
        </section>
      </div>
    )
  }
}
