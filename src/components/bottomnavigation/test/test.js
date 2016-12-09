/* global describe, it */

import assert from 'assert'
import React from 'react'
import {Broadcast} from 'react-broadcast'
import {Match} from 'react-router'
import BottomNavigation from '../'
import {mount} from 'enzyme'

const LocationBroadcast = ({value, children}) => (
  <Broadcast channel='location' value={value}>
    {children}
  </Broadcast>
)

const _window = {
  performance: {now: () => Date.now()},
  requestAnimationFrame: (f) => {
    setTimeout(() => {
      f(Date.now())
    }, 100)
  }
}

describe('BottomNavigation', () => {
  it('should render', () => {
    const wrapper = mount(<BottomNavigation links={[]} />)
    assert.equal(wrapper.find('.BottomNavigation').length, 1)
  })

  it('should apply active class to selected link', () => {
    const location = { pathname: '/one', search: '', hash: '' }
    const wrapper = mount(
      <LocationBroadcast value={location}>
        <BottomNavigation links={[{link: '/one', text: 'one'}, {link: '/two', text: 'two'}]} location={location}>
          <Match pattern='/one' component={() => <h1>One</h1>} />
          <Match pattern='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </LocationBroadcast>
      )
    assert(wrapper.find('.BottomNavigation-menu-item').at(0).hasClass('active'))
  })

  it('should scroll top when clicking active item', function (done) {
    this.slow(1300)
    const location = { pathname: '/one', search: '', hash: '' }
    const wrapper = mount(
      <LocationBroadcast value={location}>
        <BottomNavigation links={[{link: '/one', text: 'one'}, {link: '/two', text: 'two'}]} location={location} window={_window}>
          <Match pattern='/one' component={() => <h1>One</h1>} />
          <Match pattern='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </LocationBroadcast>
      )
    const node = wrapper.find('.BottomNavigation-content').at(0).node
    node.scrollTop = 40
    wrapper.find('.BottomNavigation-menu-item').at(0).simulate('click', {})
    setTimeout(() => {
      assert.equal(node.scrollTop, 0)
      done()
    }, 1000)
  })

  it('should show menu on scroll and hide after timeout', function (done) {
    const location = { pathname: '/one', search: '', hash: '' }
    const wrapper = mount(
      <LocationBroadcast value={location}>
        <BottomNavigation links={[{link: '/one', text: 'one'}, {link: '/two', text: 'two'}]} location={location} window={_window}>
          <Match pattern='/one' component={() => <h1>One</h1>} />
          <Match pattern='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </LocationBroadcast>
      )
    const node = wrapper.find('.BottomNavigation-content').at(0).node
    node.scrollTop = 40
    wrapper.find('.BottomNavigation').at(0).simulate('scroll', {})
    setTimeout(() => {
      wrapper.find('.BottomNavigation').at(0).simulate('scroll', {})
    }, 10)
    assert(wrapper.find('.BottomNavigation').at(0).hasClass('scrolling'))
    setTimeout(() => {
      assert(!wrapper.find('.BottomNavigation').at(0).hasClass('scrolling'))
      done()
    }, 1000)
  })

  it('should show menu on scroll and hide after timeout', function (done) {
    const location = { pathname: '/one', search: '', hash: '' }
    const wrapper = mount(
      <LocationBroadcast value={location}>
        <BottomNavigation links={[{link: '/one', text: 'one'}, {link: '/two', text: 'two'}]} location={location} window={_window}>
          <Match pattern='/one' component={() => <h1>One</h1>} />
          <Match pattern='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </LocationBroadcast>
      )
    const node = wrapper.find('.BottomNavigation-content').at(0).node
    node.scrollTop = 40
    wrapper.find('.BottomNavigation').at(0).simulate('scroll', {})
    setTimeout(() => {
      node.scrollTop = 20
      wrapper.find('.BottomNavigation').at(0).simulate('scroll', {})
    }, 10)
    assert(wrapper.find('.BottomNavigation').at(0).hasClass('scrolling'))
    setTimeout(() => {
      assert(!wrapper.find('.BottomNavigation').at(0).hasClass('scrolling'))
      done()
    }, 100)
  })

  it('should clear scroll timer on unmount', function () {
    const location = { pathname: '/one', search: '', hash: '' }
    const wrapper = mount(
      <LocationBroadcast value={location}>
        <BottomNavigation links={[{link: '/one', text: 'one'}, {link: '/two', text: 'two'}]} location={location} window={_window}>
          <Match pattern='/one' component={() => <h1>One</h1>} />
          <Match pattern='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </LocationBroadcast>
      )
    const node = wrapper.find('.BottomNavigation-content').at(0).node
    node.scrollTop = 40
    wrapper.find('.BottomNavigation').at(0).simulate('scroll', {})

    wrapper.find('.BottomNavigation').at(0).simulate('scroll', {})
    try {
      wrapper.unmount()
    } catch (_) {
      /* unmounting <Match> with this test setup throws */
    }
  })
})
