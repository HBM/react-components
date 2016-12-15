/* global describe, it */

import assert from 'assert'
import React from 'react'
import {shallow} from 'enzyme'
import Checkbox from '../'

describe('Checkbox', () => {
  it('should render a simple example', () => {
    const wrapper = shallow(<Checkbox onChange={() => {}} />)
    assert.equal(wrapper.find('.Checkbox').length, 1)
  })

  it('should not be checked by default', () => {
    const wrapper = shallow(<Checkbox onChange={() => {}} />)
    assert(!wrapper.find('.Checkbox-input').props().checked)
  })

  it('should render a checked checkbox', () => {
    const wrapper = shallow(<Checkbox checked onChange={() => {}} />)
    assert(wrapper.find('.Checkbox-input').props().checked)
  })

  it('should render a disabled checkbox', () => {
    const wrapper = shallow(<Checkbox disabled onChange={() => {}} />)
    assert(wrapper.find('.Checkbox-input').props().disabled)
  })

  it('should have a default label', () => {
    const wrapper = shallow(<Checkbox onChange={() => {}} />)
    assert.equal(wrapper.find('.Checkbox-label').text(), 'Label')
  })

  it('should render a custom label', () => {
    const wrapper = shallow(<Checkbox label='custom label' onChange={() => {}} />)
    assert(wrapper.find('.Checkbox-label').text(), 'custom label')
  })

  it('should callback when clicked', (done) => {
    const change = () => done()
    const wrapper = shallow(<Checkbox onChange={change} />)
    wrapper.find('.Checkbox-input').simulate('change')
  })
})
