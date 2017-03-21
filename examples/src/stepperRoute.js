
import React from 'react'
import {HashRouter} from 'react-router-dom'
import {Stepper, StepperStepFooter, Textfield} from '../../lib'

const step1 = () => (
  <div style={{width: '100%', height: 300, background: '#607D8B'}}>
    <h1 style={{padding: '2em', color: '#FFFFFF'}}>Step1: Your custom content</h1>
  </div>
)

class step2 extends React.Component {
  state = {
    name: '',
    error: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: !event.target.value.match(/^[A-Z]/) && 'The name must start with capital letter.'
    })
    if (!event.target.value.match(/^[A-Z]/)) {
      this.props.error(new Error('Attention. Check all inputs.'))
    } else {
      this.props.error()
    }
  }

  render () {
    return (
      <div>
        <h3>Step2</h3>
        <Textfield
          label='Name'
          name='name'
          value={this.state.name}
          onChange={this.onChange}
          error={this.state.error}
          length={10}
        />
        <StepperStepFooter
          labelBack='Back'
          labelNext='Next'
          labelCancel='Cancel'
          onBack={this.props.back}
          onNext={this.props.next}
          onCancel={this.props.cancel}
        />
      </div>
    )
  }
}

const step3 = () => (
  <div style={{width: '100%', background: '#B39DDB', padding: '2em'}}>
    <p>
      well done! you've completed all steps and you're the best.
    </p>
    <p>
      <a href='#'>go to main page</a>
    </p>
  </div>
)

export default class StepperRoute extends React.Component {
  state = {
    steps: [
      {
        title: 'Select campaign settings',
        href: '/stepper/settings',
        component: step1
      },
      {
        title: 'Create user',
        href: '/stepper/add',
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
      <div>
        <section>
          <h2>Stepper Component</h2>
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
