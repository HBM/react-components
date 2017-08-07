/* global describe, it */

import assert from 'assert'
import React from 'react'
import {Menu} from '../'
import {mount} from 'enzyme'

function noop () {}

describe('Menu', () => {
  it('should render hidden by default', () => {
    const wrapper = mount(<Menu onClick={noop} />)
    assert.equal(wrapper.find('.mdc-Menu').length, 1)
    assert.equal(wrapper.find('.mdc-Menu-list.is-visible').length, 0)
  })

  it('should render with class is-visible when visible prop is set', () => {
    const wrapper = mount(<Menu onClick={noop} visible />)
    assert.equal(wrapper.find('.mdc-Menu .mdc-Menu-list.is-visible').length, 1)
  })

  it('should use initial items', () => {
    const wrapper = mount(
      <Menu onClick={noop} visible items={['Dog', 'Cat', 'Mouse']} />
    )
    assert.equal(wrapper.find('.mdc-Menu').text(), 'DogCatMouse')
  })

  it('should render the list closed', () => {
    const wrapper = mount(
      <Menu onClick={noop} items={['Dog', 'Cat', 'Mouse']} />
    )
    assert.equal(wrapper.find('.mdc-Menu-list.is-visible').length, 0)
  })

  it('should notify on item click', (done) => {
    function onClick (animal) {
      assert.equal(animal, 'Cat')
      done()
    }
    const wrapper = mount(
      <Menu onClick={onClick} visible items={['Dog', 'Cat', 'Mouse']} />
    )
    wrapper.find('.mdc-Menu-list-item-link').at(1).simulate('click')
  })
})
