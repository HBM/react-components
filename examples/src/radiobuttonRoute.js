
import React from 'react'
import {Radiobutton} from 'md-components'

export default class RadiobuttonRoute extends React.Component {
  state = {
    selectedValue: ''
  }

  onChange = (value) => {
    this.setState({
      selectedValue: value
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Radiobutton</h2>
          <Radiobutton
            name='country'
            selectedValue={this.state.selectedValue}
            items={['Germany', 'Spain', 'Sweden']}
            onChange={this.onChange}
          />
        </section>
        <section>
          <h2>Default radiobutton</h2>
          <div>
            <label>
              Apple
              <input type='radio' name='fruit' value='apple' />
            </label>
            <label>
              Banana
              <input type='radio' name='fruit' value='banana' />
            </label>
            <label>
              Plum
              <input type='radio' name='fruit' value='plum' />
            </label>
          </div>
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/selection-controls.html#selection-controls-radio-button'>
            https://material.google.com/components/selection-controls.html#selection-controls-radio-button
          </a>
        </section>
      </div>
    )
  }
}
