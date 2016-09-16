
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Progress} from '../../../'

const linearProgress =
`class App extends React.Component {

  state = {
    progress: 0
  }

  componentDidMount () {
    this.interval = window.setInterval(() => {
      const progress = this.state.progress + 5
      if (progress > 100) {
        return window.clearInterval(this.interval)
      }
      this.setState({progress})
    }, 500)
  }

  render () {
    return (
      <div>
        <Progress.Linear percentage={this.state.progress} />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)`

const circularProgress =
`class App extends React.Component {

  state = {
    progress: 0
  }

  componentDidMount () {
    this.interval = window.setInterval(() => {
      const progress = this.state.progress + 5
      if (progress > 100) {
        return window.clearInterval(this.interval)
      }
      this.setState({progress})
    }, 500)
  }

  render () {
    return (
        <div style={{width: 100, height: 100}}>
          <Progress.Circular percentage={this.state.progress} />
        </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)`

export default class ProgressRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Linear progress</h2>
          <Playground
            docClass={Progress.Linear}
            codeText={linearProgress}
            scope={{React, ReactDOM, Progress}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Circular progress</h2>
          <Playground
            codeText={circularProgress}
            scope={{React, ReactDOM, Progress}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/progress-activity.html'>
            https://material.google.com/components/progress-activity.html
          </a>
        </section>
      </div>
    )
  }

}
