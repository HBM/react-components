
import React from 'react'
import {Button} from '../../lib'

export default class ButtonRoute extends React.Component {
  render () {
    return (
      <div>
        <section>
          <h2>Button Component</h2>
          <Button name='ButtonComponent' onClick={e => console.log(e)}>
            Button
          </Button>
        </section>
        <section>
          <h2>Filled Button</h2>
          <Button name='FilledButton' filled onClick={e => console.log(e)}>
            Button
          </Button>
        </section>
        <section>
          <h2>Raised Button</h2>
          <Button name='RaisedButton' onClick={e => console.log(e)} raised>
            Button
          </Button>
        </section>
        <section>
          <h2>Raised & Filled Button</h2>
          <Button name='RaisedFilledButton' onClick={e => console.log(e)} raised filled>
            Button
          </Button>
        </section>
        <section>
          <h2>Disabled Button</h2>
          <Button name='DisabledButton' onClick={e => console.log(e)} disabled>
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
