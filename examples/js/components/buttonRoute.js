
import React from 'react'
import Playground from 'component-playground'
import {Button} from '../../../'

const defaultButton =
`<button type='button'>
  Default
</button>`

const buttonComponent =
`<Button onClick={(event) => {console.log(event)}}>
  Button
</Button>`

const buttonDisabled =
`<Button onClick={() => {}} disabled>
  Disabled
</Button>`

const buttonRaised =
`<Button onClick={(event) => {console.log(event)} raised>
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
          />
        </section>
        <section>
          <h2>Button Component</h2>
          <Playground
            docClass={Button}
            propDescriptionMap={{
              type: 'submit || reset || button'
            }}
            codeText={buttonComponent}
            scope={{React, Button}}
          />
        </section>
        <section>
          <h2>Disabled Button</h2>
          <Playground
            codeText={buttonDisabled}
            scope={{React, Button}}
          />
        </section>
        <section>
          <h2>Raised Button</h2>
          <Playground
            codeText={buttonRaised}
            scope={{React, Button}}
          />
        </section>
      </div>
    )
  }

}
