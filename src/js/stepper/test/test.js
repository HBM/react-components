/* global describe, it */

import assert from 'assert'
import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {mount} from 'enzyme'
import {Stepper, StepperStepFooter} from '../'
import Button from '../../button/'

describe('Stepper', () => {
  it('should work', () => {
    const steps = [
      {
        title: 'first',
        href: '/first',
        component: () => <div>first</div>
      },
      {
        title: 'second',
        href: '/second',
        component: () => <div>second</div>
      }
    ]
    const wrapper = mount(
      <MemoryRouter>
        <Stepper steps={steps} />
      </MemoryRouter>
    )
    assert.equal(wrapper.find('.Stepper').length, 1)
  })

  it('should work horizontal', () => {
    const steps = [
      {
        title: 'first',
        href: '/first',
        component: () => <div>first</div>
      },
      {
        title: 'second',
        href: '/second',
        component: () => <div>second</div>
      }
    ]
    const wrapper = mount(
      <MemoryRouter>
        <Stepper steps={steps} horizontal />
      </MemoryRouter>
    )
    assert.equal(wrapper.find('.Stepper--horizontal').length, 1)
  })

  it('should work with optional text', () => {
    const optionalText = 'Optional'
    const steps = [
      {
        title: 'first',
        href: '/first',
        optional: optionalText,
        component: () => <div>first</div>
      },
      {
        title: 'second',
        href: '/second',
        component: () => <div>second</div>
      }
    ]
    const wrapper = mount(
      <MemoryRouter>
        <Stepper steps={steps} />
      </MemoryRouter>
    )
    assert.equal(wrapper.find('.Stepper-step-optional').length, 1)
    assert(wrapper.find('.Stepper-step-optional').text(), optionalText)
  })

  it('should work with error', () => {
    const errorText = 'my error'
    const steps = [
      {
        title: 'first',
        href: '/first',
        error: {message: errorText},
        component: () => <div>first</div>
      },
      {
        title: 'second',
        href: '/second',
        component: () => <div>second</div>
      }
    ]
    const wrapper = mount(
      <MemoryRouter>
        <Stepper steps={steps} />
      </MemoryRouter>
    )
    assert.equal(wrapper.find('.Stepper--error').length, 2)
    assert(wrapper.find('.Stepper--error > .Stepper-step-optional').text(), errorText)
  })

  it('should work StepperStepFooter', () => {
    const wrapper = mount(
      <StepperStepFooter />
    )
    assert.equal(wrapper.find('.Stepper-footer').length, 1)
  })

  it('should work StepperStepFooter with labels and callbacks', () => {
    const back = (index) => {}
    const cancel = () => {}
    const wrapper = mount(
      <StepperStepFooter
        labelBack='Back'
        labelNext='Next'
        labelCancel='Cancel'
        onBack={back}
        onNext={back}
        onCancel={cancel}
      />
    )
    assert.equal(wrapper.find('.Stepper-footer').length, 1)
    assert.equal(wrapper.find('.Stepper-step-back').length, 1)
    assert.equal(wrapper.find('.Stepper-step-next').length, 1)
    assert.equal(wrapper.find('.Stepper-step-cancel').length, 1)
  })

  it('should apply active class name to currently active step', () => {
    const steps = [
      {
        title: 'first',
        href: '/first',
        component: () => <div>first</div>
      },
      {
        title: 'second',
        href: '/second',
        component: () => <div>second</div>
      }
    ]
    const wrapper = mount(
      <MemoryRouter initialEntries={['/second']}>
        <Stepper steps={steps} />
      </MemoryRouter>
    )
    assert(wrapper.find('a[href="/second"]').hasClass('is-active'))
  })

  it.skip('should apply active class name to currently active step and StepperStepFooter test next', () => {
    const step = ({index, isLast, cancel, back, next, error}) => (
      <div>
        <h3>step second</h3>
        <div className='button-setError'>
          <Button onClick={() => error(new Error('My Error'))}>
            Set error
          </Button>
        </div>
        <div className='button-clearError'>
          <Button onClick={() => error()}>
            Clear error
          </Button>
        </div>
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

    const steps = [
      {
        title: 'first',
        href: '/first',
        component: () => <div>first</div>
      },
      {
        title: 'second',
        href: '/second',
        component: step
      },
      {
        title: 'third',
        href: '/third',
        component: () => <div>third</div>
      }
    ]

    const onCancel = (index) => {
      // let num = index + 1
      // console.log('canceled at step' + num)
    }

    const onError = (index, message) => {
      // let steps = this.state.steps.slice()
      // if (index > 0 && index < steps.length) {
      //   steps[index].error = message
      //   this.setState({
      //     steps: steps
      //   })
      // }
    }

    let wrapper = mount(
      <MemoryRouter initialEntries={['/second']}>
        <Stepper
          steps={steps}
          onError={(i, me) => onError(i, me)}
          onCancel={(i) => onCancel(i)}
        />
      </MemoryRouter>
    )
    assert(wrapper.find('a[href="/second"]').hasClass('is-active'))
    wrapper.find('.Stepper-step-cancel').childAt(0).simulate('click')
    wrapper.find('.button-setError').childAt(0).simulate('click')
    wrapper.find('.button-clearError').childAt(0).simulate('click')
    wrapper.find('.Stepper-step-next').childAt(0).simulate('click')
    assert(wrapper.find('a[href="/third"]').hasClass('is-active'))

    wrapper = mount(
      <MemoryRouter initialEntries={['/second']}>
        <Stepper
          steps={steps}
          onError={(i, me) => onError(i, me)}
          onCancel={(i) => onCancel(i)}
        />
      </MemoryRouter>
    )
    assert(wrapper.find('a[href="/second"]').hasClass('is-active'))
    wrapper.find('.Stepper-step-back').childAt(0).simulate('click')
    assert(wrapper.find('a[href="/first"]').hasClass('is-active'))
  })
})
