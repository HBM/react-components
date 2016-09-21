
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Modal, Button} from '../../../'

const defaultModal =
`<button type='button' onClick={(event) => {window.confirm('Alert')}}>
  Alert
</button>`

const modalAlert =
`class App extends React.Component {

  state = {
    visible: false
  }

  modal = () => {
    this.setState({
      visible: true
    })
  }

  toggle = () => {
    this.setState({
      visible: false
    })
  }

  render () {
    const header = (
      <h3>Header</h3>
    )
    const body = (
      <div>Body</div>
    )
    const footer = (
      <div>
        <Button onClick={this.toggle}>Cancel</Button>
        <Button onClick={this.toggle}>OK</Button>
      </div>
    )
    return (
      <div>
        <section>
          <Button onClick={this.modal}>
            Button
          </Button>
        </section>
        <Modal
          header={header}
          body={body}
          footer={footer}
          visible={this.state.visible}
          toggle={this.toggle}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)`

export default class ModalRoute extends React.Component {
  render () {
    return (
      <div>
        <section>
          <h2>Default alert</h2>
          <Playground
            codeText={defaultModal}
            scope={{React}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Modal</h2>
          <Playground
            docClass={Modal}
            codeText={modalAlert}
            scope={{React, ReactDOM, Modal, Button}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a className='examplesLink' href='https://material.google.com/components/dialogs.html'>
            https://material.google.com/components/dialogs.html
          </a>
        </section>
      </div>
    )
  }
}
