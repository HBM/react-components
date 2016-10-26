
import React from 'react'
import classnames from 'classnames'
import {Subscriber} from 'react-broadcast'
import {Button, Icon} from '../../'
import {Link, Match} from 'react-router'

const StepLink = ({index, step, isActive}) => (
  <Link
    className='Stepper-title'
    activeClassName='is-active'
    to={step.href}
  >
    <div className={classnames(
      'Stepper-circle',
      {'Stepper--error': step.error},
      {'is-active': isActive}
    )}>
      {step.error
        ? Icon['ReportProblem']()
        : index + 1
      }
    </div>
    <div className={classnames(
        'Stepper-title-text-wrapper',
        {'Stepper--error': step.error}
      )}>
      <div className='Stepper-title-text'>
        {step.title}
      </div>
      {step.optional || step.error
        ? <div className={'Stepper-step-optional'}>
          {step.error ? step.error : step.optional}
        </div>
        : null
      }
    </div>
    <StepLine />
  </Link>
)

const StepLine = () => (
  <div className='Stepper-line-wrapper'>
    <div className='Stepper-line' />
  </div>
)

const Step = ({index, step, isActive, isLast, onContinue, onCancel}) => (
  <div className='Stepper-step'>
    <div className={classnames('Stepper-body', {
      'is-last': isLast
    })}>
      <StepLine />
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
          <div className={classnames('Stepper', {
            'Stepper--horizontal': this.props.horizontal
          })}>
            {this.props.steps.map((s, i) => (
              <StepLink
                key={i}
                index={i}
                step={s}
                isActive={location.pathname === s.href}
              />
            ))}
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

Stepper.propTypes = {
  horizontal: React.PropTypes.bool,
  steps: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    component: React.PropTypes.func.isRequired,
    optional: React.PropTypes.string
  })).isRequired
}
