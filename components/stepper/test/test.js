/* global describe, it */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import {Broadcast} from 'react-broadcast'
import Stepper from '../'

describe('Stepper', () => {
  it('should work', () => {
    const location = {pathname: '', search: '', hash: ''}
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
      <Broadcast channel='location' value={location}>
        <Stepper steps={steps} />
      </Broadcast>
    )
    assert.equal(wrapper.find('.Stepper').length, 1)
  })

  it('should apply active class name to currently active step', () => {
    const location = {pathname: '/second', search: '', hash: ''}
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
      <Broadcast channel='location' value={location}>
        <Stepper steps={steps} />
      </Broadcast>
    )
    assert(wrapper.find('a[href="/second"]').hasClass('is-active'))
  })

  it('should automatically show continue and cancel buttons for all steps except the last one', () => {
    const location = {pathname: '/first', search: '', hash: ''}
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
      <Broadcast channel='location' value={location}>
        <Stepper steps={steps} />
      </Broadcast>
    )
    assert.equal(wrapper.find('.Stepper-step').at(0).find('Button').length, 2)
    assert.equal(wrapper.find('.Stepper-step').at(1).find('Button').length, 0)
  })

  // it('should continue to next step when clicking on continue button', () => {
  //   const location = {pathname: '/first', search: '', hash: ''}
  //   const steps = [
  //     {
  //       title: 'first',
  //       href: '/first',
  //       component: () => <div>first</div>
  //     },
  //     {
  //       title: 'second',
  //       href: '/second',
  //       component: () => <div>second</div>
  //     }
  //   ]
  //   const wrapper = mount(
  //     <Broadcast channel='location' value={location}>
  //       <Stepper steps={steps} />
  //     </Broadcast>
  //   , {
  //     context: {router: HashRouter}
  //   })
  //   wrapper.find('.Stepper-step').at(0).find('Button').at(0).simulate('click')
  //   console.log(wrapper.html())
  //   // assert.equal(wrapper.find('.Stepper-step').at(0).find('Button').length, 2)
  //   // assert.equal(wrapper.find('.Stepper-step').at(1).find('Button').length, 0)
  // })
})
