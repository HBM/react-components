
import React from 'react'
import Playground from 'component-playground'
import {Button} from '../../../'

const defaultButton =
`<button type='button'>
  Default
</button>`

const buttonComponent =
`<Button onClick={e => console.log(e)}>
  Button
</Button>`

const buttonDisabled =
`<Button onClick={e => console.log(e)} disabled>
  Disabled
</Button>`

const buttonRaised =
`<Button onClick={e => console.log(e)} raised>
  Raised
</Button>`

export default class ButtonRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Default button</h2>
          <Playground
            codeText={defaultButton}
            scope={{React, Button}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Button Component</h2>
          <Playground
            docClass={Button}
            codeText={buttonComponent}
            propDescriptionMap={{
              type: 'submit || reset || button'
            }}
            scope={{React, Button}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Disabled Button</h2>
          <Playground
            codeText={buttonDisabled}
            scope={{React, Button}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Raised Button</h2>
          <Playground
            codeText={buttonRaised}
            scope={{React, Button}}
            collapsableCode
          />
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
