
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Switch} from '../../../'

const defaultCheckbox =
`<label>
  <input type='checkbox' />
  Checkbox
</label>`

const switchComponent =
`class App extends React.Component {

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
      <Switch
        name='switch'
        checked={this.state.switch}
        onChange={this.onChange}
      />
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const switchOn =
`<Switch
  name='switch'
  checked
  onChange={(event) => console.log(event)}
/>`

const switchDisabled =
`<Switch
  disabled
  name='switch'
  checked
  onChange={(event) => console.log(event)}
/>`

export default class SwitchRoute extends React.Component {

  state = {
    second: true,
    third: false
  }

  render () {
    return (
      <div>
        <section>
          <h2>Switch</h2>
          <Playground
            docClass={Switch}
            codeText={switchComponent}
            scope={{React, ReactDOM, Switch}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Switch on</h2>
          <Playground
            codeText={switchOn}
            scope={{React, Switch}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Switch disabled</h2>
          <Playground
            codeText={switchDisabled}
            scope={{React, Switch}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Default checkbox</h2>
          <Playground
            codeText={defaultCheckbox}
            scope={{React}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a className='examplesLink' href='https://material.google.com/components/selection-controls.html#selection-controls-switch'>
            https://material.google.com/components/selection-controls.html#selection-controls-switch
          </a>
        </section>
      </div>
    )
  }

}
