/* global describe, it */

import assert from 'assert'
import React from 'react'
import {Navigation} from '../'
import {mount, shallow} from 'enzyme'

describe('Navigation', () => {
  it('should work', () => {
    const wrapper = shallow(<Navigation links={[]} />)
    assert(wrapper.find('nav'))
  })

  it('should propagate changes up to its parent component on mount', (done) => {
    var items = [
      {text: 'one', link: 'one'},
      {text: 'two', link: 'two'}
    ]
    // we get the onChange event automatically on mount
    const onChange = (link) => {
      assert.equal(link.text, 'one')
      done()
    }
    mount(<Navigation links={items} onChange={onChange} />)
  })

  it('should have state.visible === false initially', () => {
    const wrapper = shallow(<Navigation links={[{link: 'one', text: 'one'}]} />)
    assert.equal(wrapper.state('visible'), false)
  })

  it('should have state.visible === true when clicking the burger', () => {
    const wrapper = mount(<Navigation links={[{link: 'one', text: 'one'}]} />)
    assert.equal(wrapper.state('visible'), false)
    wrapper.find('.Navigation-hamburger .IconButton').simulate('click')
    assert.equal(wrapper.state('visible'), true)
  })

  it('should have state.visible === false when clicking the overlay', () => {
    const wrapper = mount(<Navigation links={[{link: 'one', text: 'one'}]} />)
    assert.equal(wrapper.state('visible'), false)
    wrapper.find('.Navigation-hamburger .IconButton').simulate('click')
    assert.equal(wrapper.state('visible'), true)
    wrapper.find('.Navigation-overlay').simulate('click')
    assert.equal(wrapper.state('visible'), false)
  })
})
