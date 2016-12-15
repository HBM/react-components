
import React from 'react'
import classnames from 'classnames'
import {Subscriber} from 'react-broadcast'
import Icon from '../icon/'
import Button from '../button/'
import {Link, Match} from 'react-router'

export const StepperStepFooter = ({labelBack, labelNext, labelCancel, onBack, onNext, onCancel}) => (
  <div className='Stepper-footer'>
    {(labelBack)
      ? <div className='Stepper-step-back'>
        <Button onClick={onBack}>
          {labelBack}
        </Button>
      </div>
      : null
    }
    {(labelNext && onNext)
      ? <div className='Stepper-step-next'>
        <Button onClick={onNext}>
          {labelNext}
        </Button>
      </div>
      : null
    }
    {(labelCancel && onCancel)
      ? <div className='Stepper-step-cancel'>
        <Button onClick={onCancel}>
          {labelCancel}
        </Button>
      </div>
      : null
    }
  </div>
)

const StepLink = ({index, step, isActive}) => (
  <Link
    className='Stepper-title'
    activeClassName='is-active'
    to={step.href}
  >
    <div className={classnames(
      'Stepper-circle-wrapper',
      {'Stepper-circle-wrapper--alternative': step.alternative}
    )}>
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
      <StepLine />
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
          {step.error ? step.error.message : step.optional}
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

const Step = ({index, step, isActive, isLast, onNext, onCancel, onError}) => (
  <div className='Stepper-step'>
    <div className={classnames('Stepper-body', {
      'is-last': isLast
    })}>
      <StepLine />
      <div className='Stepper-content-wrapper'>
        <div className='Stepper-content'>
          <Match pattern={step.href} render={() => (
            <step.component
              index={index}
              isLast={isLast}
              cancel={() => onCancel()}
              back={() => onNext(index - 1)}
              next={() => onNext(index + 1)}
              error={(message) => onError(message)}
            />
          )} />
        </div>
      </div>
    </div>
  </div>
)

export class Stepper extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  onNext = (index) => {
    const next = this.props.steps[index]
    if (next) {
      this.context.router.transitionTo(next.href)
    }
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
                onNext={(index) => this.onNext(index)}
                onCancel={() => this.props.onCancel(i)}
                onError={(message) => this.props.onError(i, message)}
              />
            ))}
          </div>
        )}
      </Subscriber>
    )
  }
}

Stepper.propTypes = {
  steps: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    component: React.PropTypes.func.isRequired,
    optional: React.PropTypes.string
  })).isRequired,
  horizontal: React.PropTypes.bool,
  onCancel: React.PropTypes.func,
  onError: React.PropTypes.func
}
