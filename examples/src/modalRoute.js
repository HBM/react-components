
import React from 'react'
import {Modal, Button} from '../../lib'

export default class ModalRoute extends React.Component {

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
    return (
      <div>
        <section>
          <h2>Modal</h2>
          <div>
            <section>
              <Button onClick={this.modal} raised>
                Show Modal
              </Button>
            </section>
            <Modal
              header={<h3>Header</h3>}
              body={<div>Body</div>}
              footer={
                <div>
                  <Button onClick={this.toggle}>Cancel</Button>
                  <Button onClick={this.toggle}>OK</Button>
                </div>
              }
              visible={this.state.visible}
              toggle={this.toggle}
            />
          </div>
        </section>
        <section>
          <h2>Default alert</h2>
          <button type='button' onClick={(event) => { window.confirm('Alert') }}>
            Alert
          </button>
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/dialogs.html'>
            https://material.google.com/components/dialogs.html
          </a>
        </section>
      </div>
    )
  }
}
