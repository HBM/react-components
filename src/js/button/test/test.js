/* global describe, it */

import assert from 'assert'
import React from 'react'
import {shallow} from 'enzyme'
import Button from '../'

describe('Button', () => {
  it('should bubble up click events', (done) => {
    const click = () => done()
    const wrapper = shallow(<Button onClick={click} />)
    wrapper.find('.Button').simulate('click')
  })

  it('should have `Button--raised` class when raised property is true', () => {
    const wrapper = shallow(<Button onClick={() => {}} raised />)
    assert.ok(wrapper.find('.Button').hasClass('Button--raised'))
  })

  it('should be disabled when told so', () => {
    const wrapper = shallow(<Button onClick={() => {}} disabled />)
    assert.ok(wrapper.find('.Button').props().disabled)
  })
  it('should have extra class `myStyle`', () => {
    const wrapper = shallow(<Button className='myStyle' onClick={() => {}} />)
    assert.ok(wrapper.find('.Button').hasClass('myStyle'))
  })
})
