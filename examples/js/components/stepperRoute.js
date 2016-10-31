
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {HashRouter} from 'react-router'
import {Stepper, StepperStepFooter, Button} from '../../../'

const stepperComponent =
`
const step1 = () => (
  <div style={{width: '100%', height: 300, background: '#bdbdbd'}} />
)

const step2 = ({index, isLast, cancel, back, next, error}) => (
  <div>
    <h3>step2</h3>
    <pre>{JSON.stringify({index, isLast, cancel, back, next, error}, null, 2)}</pre>
    <Button onClick={() => error(new Error('My Error'))}>
      Set error
    </Button>
    <Button onClick={() => error()}>
      Clear error
    </Button>
    <StepperStepFooter
      labelBack='Back'
      labelNext='Next'
      labelCancel='Cancel'
      onBack={back}
      onNext={next}
      onCancel={cancel}
    />
  </div>
)

const step3 = () => (
  <div>
    <p>
      well done! you've completed all steps and you're the best.
    </p>
    <p>
      <a href='#'>go to main page</a>
    </p>
  </div>
)

class App extends React.Component {

  state = {
    steps: [
      {
        title: 'Select campaign settings',
        href: '/stepper/settings',
        component: step1
      },
      {
        title: 'Create an ad group',
        href: '/stepper/group',
        optional: 'Optional',
        component: step2
      },
      {
        title: 'Create an ad',
        href: '/stepper/create',
        component: step3
      }
    ]
  }

  onCancel = (index) => {
    let num = index + 1
    console.log('canceled at step' + num)
  }

  onError = (index, message) => {
    let steps = this.state.steps.slice()
    if (index > 0 && index < steps.length) {
      steps[index].error = message
      this.setState({
        steps: steps
      })
    }
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Stepper
            steps={this.state.steps}
            onError={(i, me) => this.onError(i, me)}
            onCancel={(i) => this.onCancel(i)}
            horizontal
          />
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, mountNode)`

export default class StepperRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Stepper Component</h2>
          <Playground
            docClass={Stepper}
            codeText={stepperComponent}
            scope={{React, ReactDOM, Stepper, StepperStepFooter, Button, HashRouter}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/steppers.html'>
            https://material.google.com/components/steppers.html
          </a>
        </section>
      </div>
    )
  }
}
