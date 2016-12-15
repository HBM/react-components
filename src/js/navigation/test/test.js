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

  it('should go multiple levels deep', () => {
    const location = {pathname: '/cars/tesla/models-s/p100d', search: '', hash: ''}
    const wrapper = mount(
      <LocationBroadcast value={location}>
        <Navigation links={[
          {text: 'Home', link: '/'},
          {text: 'About', link: '/about'},
          {
            text: 'Cars',
            link: '/cars',
            links: [
              {
                text: 'Tesla',
                link: '/tesla',
                links: [
                  {
                    text: 'Model S',
                    link: '/model-s',
                    links: [
                      {text: '60', link: '/60'},
                      {text: '60D', link: '/60d'},
                      {text: '75', link: '/75'},
                      {text: '75D', link: '/75d'},
                      {text: '90D', link: '/90d'},
                      {text: 'P100D', link: '/p100d'}
                    ]
                  },
                  {
                    text: 'Model X',
                    link: '/model-x',
                    links: [
                      {text: 'Ultra White Seats', link: '/white'},
                      {text: 'Tan Leather Seats', link: '/tan'},
                      {text: 'Black Leather Seats', link: '/black'}
                    ]
                  },
                  {
                    text: 'Model 3',
                    link: '/model-3',
                    links: [
                      {text: 'Hardware', link: '/hardware'},
                      {text: 'Safety', link: '/safety'},
                      {text: 'Range', link: '/range'}
                    ]
                  }
                ]
              },
              {
                text: 'Audi',
                link: '/audi'
              }
            ]
          }
        ]} />
      </LocationBroadcast>
    )
    assert(wrapper.find('a[href]="/cars/tesla/model-s/p100d"'))
  })
})
