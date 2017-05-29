
import React from 'react'
import {Checkbox} from 'md-components'

export default class CheckboxRoute extends React.Component {
  state = {
    checked: false
  }

  onChange = (event) => {
    this.setState({
      checked: !this.state.checked
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Checkbox</h2>
          <Checkbox
            onChange={this.onChange}
            checked={this.state.checked}
          />
        </section>
        <section>
          <h2>Disabled checkbox</h2>
          <Checkbox checked disabled />
        </section>
        <section>
          <h2>Default checkbox</h2>
          <label>
            Label
            <input type='checkbox' />
          </label>
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/selection-controls.html#selection-controls-checkbox'>
            https://material.google.com/components/selection-controls.html#selection-controls-checkbox
          </a>
        </section>
      </div>
    )
  }
}
