/* global describe, it */

import assert from 'assert'
import React from 'react'
import {Route, MemoryRouter} from 'react-router-dom'
import BottomNavigation from '../'
import {mount} from 'enzyme'

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
    const wrapper = mount(
      <MemoryRouter>
        <BottomNavigation links={[]} />
      </MemoryRouter>
    )
    assert.equal(wrapper.find('.BottomNavigation').length, 1)
  })

  it('should apply active class to selected link', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          links={[
            {link: '/one', text: 'one'},
            {link: '/two', text: 'two'}
          ]}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
    )
    assert(wrapper.find('.BottomNavigation-menu-item').at(0).hasClass('active'))
  })

  it('should scroll top when clicking active item', function (done) {
    this.slow(1300)
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          links={[
            {link: '/one', text: 'one'},
            {link: '/two', text: 'two'}
          ]}
          window={_window}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
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
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          links={[{link: '/one', text: 'one'}, {link: '/two', text: 'two'}]}
          window={_window}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
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
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          links={[{link: '/one', text: 'one'}, {link: '/two', text: 'two'}]}
          window={_window}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
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
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          links={[{link: '/one', text: 'one'}, {link: '/two', text: 'two'}]}
          window={_window}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
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
