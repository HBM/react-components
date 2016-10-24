
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {HashRouter} from 'react-router'
import {Stepper} from '../../../'

const stepperComponent =
`
const step1 = () => (
  <div style={{width: '100%', height: 300, background: '#bdbdbd'}} />
)

const step2 = () => (
  <div>step2</div>
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

  render () {
    const steps = [
      {
        title: 'Select campaign settings',
        href: '/stepper/settings',
        component: step1
      },
      {
        title: 'Create an ad group',
        href: '/stepper/group',
        component: step2
      },
      {
        title: 'Create an ad',
        href: '/stepper/create',
        component: step3
      }
    ]
    return (
      <HashRouter>
        <div>
          <Stepper steps={steps} horizontal />
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
            scope={{React, ReactDOM, Stepper, HashRouter}}
            noRender={false}
            collapsableCode
          />
        </section>
      </div>
    )
  }

}
