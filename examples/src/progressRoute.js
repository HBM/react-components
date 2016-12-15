
import React from 'react'
import {Progress} from '../../lib'

export default class ProgressRoute extends React.Component {

  state = {
    progress: 0
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
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
        <section>
          <h2>Linear progress</h2>
          <Progress.Linear percentage={this.state.progress} />
        </section>
        <section>
          <h2>Circular progress</h2>
          <div style={{width: 24, height: 24}}>
            <Progress.Circular percentage={this.state.progress} />
          </div>
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
