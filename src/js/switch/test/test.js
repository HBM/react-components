/* global it, describe */

import assert from 'assert'
import React from 'react'
import Switch from '../'
import {mount} from 'enzyme'

describe('Switch', () => {
  it('should be off by default', () => {
    const wrapper = mount(<Switch name='' onChange={() => {}} />)
    assert.equal(wrapper.find('.mdc-Switch-input').props().checked, false)
  })

  it('should be able to set to checked', () => {
    const wrapper = mount(<Switch name='' checked onChange={() => {}} />)
    assert(wrapper.find('.mdc-Switch-input').props().checked)
  })

  it('should be able to be set to disabled', () => {
    const wrapper = mount(<Switch name='' disabled onChange={() => {}} />)
    assert(wrapper.find('.mdc-Switch-input').props().disabled)
  })

  it('should allow toggle on/off', (done) => {
    const callback = (event) => {
      assert(event.target.checked)
      done()
    }
    const wrapper = mount(<Switch name='' onChange={callback} />)
    wrapper.find('.mdc-Switch-input').simulate('change', {
      target: {
        checked: true
      }
    })
  })
})
