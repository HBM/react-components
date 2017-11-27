/* global it, describe */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import SelectNative from '../'

describe('SelectNative', () => {
  it('should render a native select', () => {
    const wrapper = mount(
      <SelectNative>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </SelectNative>
    )
    assert.equal(wrapper.find('select').length, 1)
    assert.equal(wrapper.find('option').at(0).text(), 'one')
    assert.equal(wrapper.find('option').at(1).text(), 'two')
    assert.equal(wrapper.find('option').at(2).text(), 'three')
  })

  it('should render a label', () => {
    const wrapper = mount(
      <SelectNative label='my label'>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </SelectNative>
    )
    assert.equal(wrapper.find('.mdc-SelectNative-label').text(), 'my label')
  })

  it('should render a helper text', () => {
    const wrapper = mount(
      <SelectNative helper='my helper'>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </SelectNative>
    )
    assert.equal(wrapper.find('.mdc-SelectNative-helper').text(), 'my helper')
  })

  it('should render an error message', () => {
    const wrapper = mount(
      <SelectNative error='my error'>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </SelectNative>
    )
    assert.equal(wrapper.find('.mdc-SelectNative-helper--error').text(), 'my error')
    assert(wrapper.find('.mdc-SelectNative').hasClass('mdc-SelectNative--error'))
  })

  it('should only show the error message when both helper text and error message are provided', () => {
    const wrapper = mount(
      <SelectNative helper='my helper' error='my error'>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </SelectNative>
    )
    assert.equal(wrapper.find('.mdc-SelectNative-helper').text(), 'my error')
    assert(wrapper.find('.mdc-SelectNative').hasClass('mdc-SelectNative--error'))
  })

  it('should add styles on focus and remove them on blur', () => {
    const wrapper = mount(
      <SelectNative>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </SelectNative>
    )
    wrapper.find('.mdc-SelectNative-select').simulate('focus')
    assert(wrapper.find('.mdc-SelectNative').hasClass('is-focused'))
    assert(wrapper.find('.mdc-SelectNative-label').hasClass('is-focused'))
    wrapper.find('.mdc-SelectNative-select').simulate('blur')
    assert(!wrapper.find('.mdc-SelectNative').hasClass('is-focused'))
    assert(!wrapper.find('.mdc-SelectNative-label').hasClass('is-focused'))
  })
})
