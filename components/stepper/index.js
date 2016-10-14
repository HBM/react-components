
import React from 'react'
import classnames from 'classnames'
import {Subscriber} from 'react-broadcast'
import {Button} from '../../'
import {Link, Match} from 'react-router'

const Step = ({index, step, isActive, isLast, onContinue, onCancel}) => (
  <div className='Stepper-step'>
    <Link
      className='Stepper-title'
      activeClassName='is-active'
      to={step.href}
    >
      <div className={classnames('Stepper-circle', {
        'is-active': isActive
      })}>
        {index + 1}
      </div>
      {step.title}
    </Link>
    <div className={classnames('Stepper-body', {
      'is-last': isLast
    })}>
      <div className='Stepper-line-wrapper'>
        <div className='Stepper-line' />
      </div>
      <div className='Stepper-content-wrapper'>
        <div className='Stepper-content'>
          <Match pattern={step.href} component={step.component} />
        </div>
        {(!isActive || isLast) ? null : <div className='Stepper-footer'>
          <Button onClick={onContinue}>
            Continue
          </Button>
          <Button onClick={onCancel}>
            Cancel
          </Button>
        </div>}
      </div>
    </div>
  </div>
)

export default class Stepper extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  onContinue = (index) => {
    const next = this.props.steps[index + 1]
    if (next) {
      this.context.router.transitionTo(next.href)
    }
  }

  onCancel = (index) => {
    console.log(`canceled at step ${index + 1}`)
  }

  render () {
    return (
      <Subscriber channel='location'>
        {location => (
          <div className='Stepper'>
            {this.props.steps.map((s, i) => (
              <Step
                key={i}
                index={i}
                step={s}
                isActive={location.pathname === s.href}
                isLast={this.props.steps.length - 1 === i}
                onContinue={() => this.onContinue(i)}
                onCancel={() => this.onCancel(i)}
              />
            ))}
          </div>
        )}
      </Subscriber>
    )
  }

}

