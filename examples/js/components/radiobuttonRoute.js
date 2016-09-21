
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Radiobutton} from '../../../'

const defaultRadiobutton =
`<div>
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
</div>`

const radiobuttonComponent =
`class App extends React.Component {
  state = {
    selectedValue: 'Germany'
  }

  onChange = (value) => {
    this.setState({
      selectedValue: value
    })
  }

  render () {
    return (
          <Radiobutton
            name='country'
            selectedValue={this.state.selectedValue}
            items={['Germany', 'Spain', 'Sweden']}
            onChange={this.onChange}
          />
    )
  }
}

ReactDOM.render(<App />, mountNode)`

export default class RadiobuttonRoute extends React.Component {

  state = {
    selectedValue: 'Germany'
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
          <Playground
            docClass={Radiobutton}
            codeText={radiobuttonComponent}
            scope={{React, ReactDOM, Radiobutton}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Default radiobutton</h2>
          <Playground
            codeText={defaultRadiobutton}
            scope={{React}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a className='examplesLink' href='https://material.google.com/components/selection-controls.html#selection-controls-radio-button'>
            https://material.google.com/components/selection-controls.html#selection-controls-radio-button
          </a>
        </section>
      </div>
    )
  }

}
