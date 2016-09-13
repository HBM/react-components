
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Snackbar, Button} from '../../../'

const snackbarComponent =
`class App extends React.Component {
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
        <Button onClick={this.toggle}>
          Toggle
        </Button>
        <Snackbar
          text='Ethernet settings saved'
          action='Undo'
          onAction={this.toggle}
          visible={this.state.visible}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)`

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
          <Playground
            docClass={Snackbar}
            noRender={false}
            codeText={snackbarComponent}
            scope={{React, ReactDOM, Snackbar, Button}}
          />
        </section>
      </div>
    )
  }

}
