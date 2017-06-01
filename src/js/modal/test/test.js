/* global it, describe */

import assert from 'assert'
import React from 'react'
import Modal from '../'
import {mount} from 'enzyme'

describe('Modal', () => {
  it('should work', () => {
    const wrapper = mount(<Modal visible />)
    assert.equal(wrapper.find('.mdc-Modal').length, 1)
  })

  it('should be hidden by default', () => {
    const wrapper = mount(<Modal />)
    assert.equal(wrapper.find('.mdc-Modal').length, 1)
    assert.equal(wrapper.find('.mdc-Modal--visible').length, 0)
  })

  it('should callback when clicking on dark background', (done) => {
    const callback = (visible) => {
      assert.equal(visible, false)
      done()
    }
    const wrapper = mount(<Modal visible toggle={callback} />)
    wrapper.find('.mdc-Modal-overlay').simulate('click')
  })

  it('should callback when touching dark background', (done) => {
    const callback = (visible) => {
      assert.equal(visible, false)
      done()
    }
    const wrapper = mount(<Modal visible toggle={callback} />)
    wrapper.find('.mdc-Modal-overlay').simulate('touchend')
  })

  it('should have a custom header', () => {
    const header = <p>my custom header</p>
    const wrapper = mount(<Modal visible header={header} />)
    assert.equal(wrapper.find('.mdc-Modal-header').text(), 'my custom header')
  })

  it('should have a custom body', () => {
    const body = <p>my custom body</p>
    const wrapper = mount(<Modal visible body={body} />)
    assert.equal(wrapper.find('.mdc-Modal-body').text(), 'my custom body')
  })

  it('should have a custom footer', () => {
    const footer = <p>my custom footer</p>
    const wrapper = mount(<Modal visible footer={footer} />)
    assert.equal(wrapper.find('.mdc-Modal-footer').text(), 'my custom footer')
  })
})
