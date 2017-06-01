/* global describe, it */

import assert from 'assert'
import React from 'react'
import {Route, MemoryRouter, NavLink} from 'react-router-dom'
import {BottomNavigation, BottomNavigationText} from '../'
import {mount} from 'enzyme'

const _window = {
  innerHeight: -2000, // this is a dirty trick that's required because faking scrollHeight is difficult
  performance: {now: () => Date.now()},
  requestAnimationFrame: (f) => {
    setTimeout(() => {
      f(Date.now())
    }, 100)
  }
}

describe('BottomNavigationText', () => {
  it('should render the text', () => {
    const wrapper = mount(<BottomNavigationText>foo</BottomNavigationText>)
    assert.equal(wrapper.text(), 'foo')
  })

  it('should have the .BottomNavigation-menu-item-text', () => {
    const wrapper = mount(<BottomNavigationText>foo</BottomNavigationText>)
    assert(wrapper.hasClass('mdc-BottomNavigation-menu-item-text'))
  })
})

describe('BottomNavigation', () => {
  it('should render', () => {
    const wrapper = mount(
      <MemoryRouter>
        <BottomNavigation links={[]} />
      </MemoryRouter>
    )
    assert.equal(wrapper.find('.mdc-BottomNavigation').length, 1)
  })

  it('should apply active class to selected link', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          links={[
            <NavLink to='/one' />,
            <NavLink to='/two' />
          ]}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
    )
    assert(wrapper.find('.mdc-BottomNavigation-menu-item a').at(0).hasClass('active'))
  })

  it('should scroll top when clicking active item', function (done) {
    this.slow(200)
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          scrollDuration={30}
          links={[
            <NavLink to='/one' />,
            <NavLink to='/two' />
          ]}
          window={_window}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
    )
    const node = wrapper.find('.mdc-BottomNavigation-content').at(0).node
    node.scrollTop = 40
    wrapper.find('.mdc-BottomNavigation-menu-item').at(0).simulate('click', {})
    setTimeout(() => {
      assert.equal(node.scrollTop, 0)
      done()
    }, 100)
  })

  it('should show menu on scroll and hide after timeout', function (done) {
    this.slow(200)
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          scrollDuration={30}
          links={[
            <NavLink to='/one' />,
            <NavLink to='/two' />
          ]}
          window={_window}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
    )
    const node = wrapper.find('.mdc-BottomNavigation-content').at(0).node
    node.scrollTop = 40
    wrapper.find('.mdc-BottomNavigation').at(0).simulate('scroll', {})
    setTimeout(() => {
      wrapper.find('.mdc-BottomNavigation').at(0).simulate('scroll', {})
    }, 10)
    assert(wrapper.find('.mdc-BottomNavigation').at(0).hasClass('scrolling'))
    setTimeout(() => {
      assert(!wrapper.find('.mdc-BottomNavigation').at(0).hasClass('scrolling'))
      done()
    }, 50)
  })

  it('should show menu on scroll and hide after timeout', function (done) {
    this.slow(200)
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          scrollDuration={30}
          links={[
            <NavLink to='/one' />,
            <NavLink to='/two' />
          ]}
          window={_window}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
    )
    const node = wrapper.find('.mdc-BottomNavigation-content').at(0).node
    node.scrollTop = 40
    wrapper.find('.mdc-BottomNavigation').at(0).simulate('scroll', {})
    setTimeout(() => {
      node.scrollTop = 20
      wrapper.find('.mdc-BottomNavigation').at(0).simulate('scroll', {})
    }, 10)
    assert(wrapper.find('.mdc-BottomNavigation').at(0).hasClass('scrolling'))
    setTimeout(() => {
      assert(!wrapper.find('.mdc-BottomNavigation').at(0).hasClass('scrolling'))
      done()
    }, 50)
  })

  it('should clear scroll timer on unmount', function () {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <BottomNavigation
          links={[
            <NavLink to='/one' />,
            <NavLink to='/two' />
          ]}
          window={_window}
        >
          <Route path='/one' component={() => <h1>One</h1>} />
          <Route path='/two' component={() => <h1>Two</h1>} />
        </BottomNavigation>
      </MemoryRouter>
      )
    const node = wrapper.find('.mdc-BottomNavigation-content').at(0).node
    node.scrollTop = 40
    wrapper.find('.mdc-BottomNavigation').at(0).simulate('scroll', {})

    wrapper.find('.mdc-BottomNavigation').at(0).simulate('scroll', {})
    try {
      wrapper.unmount()
    } catch (_) {
      /* unmounting <Match> with this test setup throws */
    }
  })
})
