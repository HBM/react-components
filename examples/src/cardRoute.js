
import React from 'react'
import {Button, Card, Title, Text, Actions} from 'md-components'

export default class CardRoute extends React.Component {
  render () {
    return (
      <div>
        <section>
          <h2>Card</h2>
          <Card>
            <Title>
              Title
            </Title>
            <Text>
              Greyhound divisively hello coldly wonderfully marginally far upon excluding.
            </Text>
            <Actions>
              <Button onClick={(event) => { console.log(event) }}>
                Cancel
              </Button>
              <Button onClick={(event) => { console.log(event) }}>
                Submit
              </Button>
            </Actions>
          </Card>
        </section>
        <section>
          <h2>Card without title</h2>
          <Card>
            <Text>
              Greyhound divisively hello coldly wonderfully marginally far upon excluding.
            </Text>
            <Actions>
              <Button onClick={(event) => { console.log(event) }}>
                Cancel
              </Button>
              <Button onClick={(event) => { console.log(event) }}>
                Submit
              </Button>
            </Actions>
          </Card>
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/cards.html'>
            https://material.google.com/components/cards.html
          </a>
        </section>
      </div>
    )
  }
}
