// @flow

import React from 'react'
import {Button} from 'md-components'

export default class ButtonRoute extends React.Component<{}> {
  onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    console.log(event)
    console.log(event.currentTarget.name)
  }

  render () {
    return (
      <div>
        <section>
          <h2>Button Component</h2>
          <Button name='ButtonComponent' onClick={this.onClick}>
            Button
          </Button>
        </section>
        <section>
          <h2>Filled Button</h2>
          <Button name='FilledButton' filled onClick={this.onClick}>
            Button
          </Button>
        </section>
        <section>
          <h2>Raised Button</h2>
          <Button name='RaisedButton' onClick={this.onClick} raised>
            Button
          </Button>
        </section>
        <section>
          <h2>Raised & Filled Button</h2>
          <Button name='RaisedFilledButton' onClick={this.onClick} raised filled>
            Button
          </Button>
        </section>
        <section>
          <h2>Dense & Filled Button</h2>
          <Button name='DenseFilledButton' onClick={this.onClick} dense filled>
            Button
          </Button>
        </section>
        <section>
          <h2>Disabled Button</h2>
          <Button name='DisabledButton' onClick={this.onClick} disabled>
            Button
          </Button>
        </section>
        <section>
          <h2>Default button</h2>
          <button type='button'>
            Button
          </button>
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/buttons.html'>
            https://material.google.com/components/buttons.html
          </a>
        </section>
      </div>
    )
  }
}
