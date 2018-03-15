/* global describe, it */

import assert from 'assert'
import React from 'react'
import Navigation from '../'
import {mount, shallow} from 'enzyme'
import {HashRouter} from 'react-router-dom'

describe('Navigation', () => {
  it('should render as nav', () => {
    const wrapper = shallow(<Navigation />)
    assert(wrapper.find('nav'))
  })

  it('should have state.visible === false initially', () => {
    const wrapper = shallow(<Navigation links={[{link: 'one', text: 'one'}]} />)
    assert.equal(wrapper.state('visible'), false)
  })

  it('should have state.visible === true when clicking the burger', () => {
    const wrapper = mount(
      <HashRouter>
        <Navigation links={[{link: 'one', text: 'one'}]} />
      </HashRouter>
    )
    assert.equal(wrapper.find('.mdc-Navigation-overlay').hasClass('is-visible'), false)
    wrapper.find('.mdc-Navigation-hamburger .IconButton').simulate('click')
    assert.equal(wrapper.find('.mdc-Navigation-overlay').hasClass('is-visible'), true)
  })

  it('should have state.visible === false when clicking the overlay', () => {
    const wrapper = mount(
      <HashRouter>
        <Navigation links={[{link: 'one', text: 'one'}]} />
      </HashRouter>
    )
    assert.equal(wrapper.find('.mdc-Navigation-overlay').hasClass('is-visible'), false)
    wrapper.find('.mdc-Navigation-hamburger .IconButton').simulate('click')
    assert.equal(wrapper.find('.mdc-Navigation-overlay').hasClass('is-visible'), true)
    wrapper.find('.mdc-Navigation-overlay').simulate('click')
    assert.equal(wrapper.find('.mdc-Navigation-overlay').hasClass('is-visible'), false)
  })
})
