/* global describe, it */

import assert from 'assert'
import React from 'react'
import {Broadcast} from 'react-broadcast'
import {Navigation} from '../'
import {mount, shallow} from 'enzyme'

const LocationBroadcast = ({value, children}) => (
  <Broadcast channel='location' value={value}>
    {children}
  </Broadcast>
)

describe('Navigation', () => {
  it('should work', () => {
    const wrapper = shallow(<Navigation links={[]} />)
    assert(wrapper.find('nav'))
  })

  it('should propagate changes up to its parent component on mount', (done) => {
    const location = { pathname: '/one', search: '', hash: '' }
    var items = [
      {text: 'one', link: '/one'},
      {text: 'two', link: '/two'}
    ]
    // we get the onChange event automatically on mount
    const onChange = (link) => {
      assert.equal(link.text, 'one')
      done()
    }
    mount(
      <LocationBroadcast value={location}>
        <Navigation location={location} links={items} onChange={onChange} />
      </LocationBroadcast>
    )
  })

  it('should have state.visible === false initially', () => {
    const wrapper = shallow(<Navigation links={[{link: 'one', text: 'one'}]} />)
    assert.equal(wrapper.state('visible'), false)
  })

  it('should have state.visible === true when clicking the burger', () => {
    const location = { pathname: '/one', search: '', hash: '' }
    const wrapper = mount(
      <LocationBroadcast value={location}>
        <Navigation links={[{link: 'one', text: 'one'}]} location={location} />
      </LocationBroadcast>
      )
    assert.equal(wrapper.find('.Navigation-overlay').hasClass('is-visible'), false)
    wrapper.find('.Navigation-hamburger .IconButton').simulate('click')
    assert.equal(wrapper.find('.Navigation-overlay').hasClass('is-visible'), true)
  })

  it('should have state.visible === false when clicking the overlay', () => {
    const location = { pathname: '/one', search: '', hash: '' }
    const wrapper = mount(
      <LocationBroadcast value={location}>
        <Navigation links={[{link: 'one', text: 'one'}]} location={location} />
      </LocationBroadcast>
      )
    assert.equal(wrapper.find('.Navigation-overlay').hasClass('is-visible'), false)
    wrapper.find('.Navigation-hamburger .IconButton').simulate('click')
    assert.equal(wrapper.find('.Navigation-overlay').hasClass('is-visible'), true)
    wrapper.find('.Navigation-overlay').simulate('click')
    assert.equal(wrapper.find('.Navigation-overlay').hasClass('is-visible'), false)
  })
})
