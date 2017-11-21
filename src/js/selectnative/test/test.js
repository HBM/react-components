/* global it, describe */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import Selectnative from '../'

describe('Selectnative', () => {
  it('should render a native select', () => {
    const wrapper = mount(
      <Selectnative>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </Selectnative>
    )
    assert.equal(wrapper.find('select').length, 1)
    assert.equal(wrapper.find('option').at(0).text(), 'one')
    assert.equal(wrapper.find('option').at(1).text(), 'two')
    assert.equal(wrapper.find('option').at(2).text(), 'three')
  })

  it('should render a label', () => {
    const wrapper = mount(
      <Selectnative label='my label'>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </Selectnative>
    )
    assert.equal(wrapper.find('.mdc-Selectnative-label').text(), 'my label')
  })

  it('should render a helper text', () => {
    const wrapper = mount(
      <Selectnative helper='my helper'>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </Selectnative>
    )
    assert.equal(wrapper.find('.mdc-Selectnative-helper').text(), 'my helper')
  })

  it('should render an error message', () => {
    const wrapper = mount(
      <Selectnative error='my error'>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </Selectnative>
    )
    assert.equal(wrapper.find('.mdc-Selectnative-helper--error').text(), 'my error')
    assert(wrapper.find('.mdc-Selectnative').hasClass('mdc-Selectnative--error'))
  })

  it('should only show the error message when both helper text and error message are provided', () => {
    const wrapper = mount(
      <Selectnative helper='my helper' error='my error'>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </Selectnative>
    )
    assert.equal(wrapper.find('.mdc-Selectnative-helper').text(), 'my error')
    assert(wrapper.find('.mdc-Selectnative').hasClass('mdc-Selectnative--error'))
  })

  it('should add styles on focus and remove them on blur', () => {
    const wrapper = mount(
      <Selectnative>
        <option value='one'>one</option>
        <option value='two'>two</option>
        <option value='three'>three</option>
      </Selectnative>
    )
    wrapper.find('.mdc-Selectnative-select').simulate('focus')
    assert(wrapper.find('.mdc-Selectnative').hasClass('is-focused'))
    assert(wrapper.find('.mdc-Selectnative-label').hasClass('is-focused'))
    wrapper.find('.mdc-Selectnative-select').simulate('blur')
    assert(!wrapper.find('.mdc-Selectnative').hasClass('is-focused'))
    assert(!wrapper.find('.mdc-Selectnative-label').hasClass('is-focused'))
  })
})
