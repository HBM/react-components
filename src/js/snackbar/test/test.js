/* global it, describe */

import assert from 'assert'
import React from 'react'
import Snackbar from '../'
import {mount} from 'enzyme'

describe('Snackbar', () => {
  it('should be empty by default', () => {
    const wrapper = mount(<Snackbar visible />)
    assert.equal(wrapper.find('.Snackbar').text(), '')
  })

  it('should render with text', () => {
    const wrapper = mount(<Snackbar visible text='all good' />)
    assert.equal(wrapper.find('.Snackbar').text(), 'all good')
  })

  it('should render with text and action button', () => {
    const wrapper = mount(<Snackbar visible text='all good' action='undo' />)
    assert.equal(wrapper.find('.Snackbar-action').node.value, 'undo')
  })

  it('should trigger an event when clicking on action button', (done) => {
    const callback = () => done()
    const wrapper = mount(<Snackbar visible text='all good' action='undo' onAction={callback} />)
    wrapper.find('.Snackbar-action').simulate('click')
  })

  it('should be hidden by default', () => {
    const wrapper = mount(<Snackbar />)
    assert.equal(wrapper.find('.Snackbar').length, 0)
  })
})
