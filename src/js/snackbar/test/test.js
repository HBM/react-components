/* global it, describe */

import assert from 'assert'
import React from 'react'
import Snackbar from '../'
import {mount} from 'enzyme'

describe('Snackbar', () => {
  it('should be empty and invisible by default', () => {
    const wrapper = mount(<Snackbar />)
    assert.equal(wrapper.find('.mdc-Snackbar').text(), '')
    assert.equal(wrapper.find('.mdc-Snackbar.is-visible').length, 0)
  })

  it('should add class is-visible when visible', () => {
    const wrapper = mount(<Snackbar visible />)
    assert.equal(wrapper.find('.mdc-Snackbar.is-visible').length, 1)
  })

  it('should render with text', () => {
    const wrapper = mount(<Snackbar visible text='all good' />)
    assert.equal(wrapper.find('.mdc-Snackbar').text(), 'all good')
  })

  it('should render with text and action button', () => {
    const wrapper = mount(<Snackbar visible text='all good' action='undo' />)
    assert.equal(wrapper.find('.mdc-Snackbar-action').node.value, 'undo')
  })

  it('should trigger an event when clicking on action button', (done) => {
    const callback = () => done()
    const wrapper = mount(<Snackbar visible text='all good' action='undo' onAction={callback} />)
    wrapper.find('.mdc-Snackbar-action').simulate('click')
  })
})
