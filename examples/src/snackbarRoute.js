
import React from 'react'
import {Snackbar, Button} from 'md-components'

export default class SnackbarRoute extends React.Component {
  state = {
    visible: false
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Snackbar</h2>
          <Button onClick={this.toggle}>
            Toggle
          </Button>
          <Snackbar
            text='Ethernet settings saved'
            action='Undo'
            onAction={this.toggle}
            visible={this.state.visible}
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/snackbars-toasts.html'>
            https://material.google.com/components/snackbars-toasts.html
          </a>
        </section>
      </div>
    )
  }
}
