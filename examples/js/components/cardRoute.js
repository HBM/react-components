
import React from 'react'
import Playground from 'component-playground'
import {Button, Card, Title, Text, Actions} from '../../../'

const cardWithTitle =
`<Card>
  <Title>
    Title
  </Title>
  <Text>
    Greyhound divisively hello coldly wonderfully marginally far upon excluding.
  </Text>
  <Actions>
    <Button onClick={(event) => {console.log(event)}}>
      Cancel
    </Button>
    <Button onClick={(event) => {console.log(event)}}>
      Submit
    </Button>
  </Actions>
</Card>`

const cardWithoutTitle =
`<Card>
  <Text>
    Greyhound divisively hello coldly wonderfully marginally far upon excluding.
  </Text>
  <Actions>
    <Button onClick={(event) => {console.log(event)}}>
      Cancel
    </Button>
    <Button onClick={(event) => {console.log(event)}}>
      Submit
    </Button>
  </Actions>
</Card>`

export default class CardRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Card</h2>
          <Playground
            docClass={Card}
            codeText={cardWithTitle}
            scope={{React, Button, Card, Title, Text, Actions}}
          />
        </section>
        <section>
          <h2>Card without title</h2>
          <Playground
            docClass={Card}
            codeText={cardWithoutTitle}
            scope={{React, Button, Card, Title, Text, Actions}}
          />
        </section>
      </div>
    )
  }

}
