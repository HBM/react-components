/* global it, describe */

import assert from 'assert'
import React from 'react'
import Tooltip from '../'
import {mount} from 'enzyme'

describe('Tooltip', () => {
  it('should work', () => {
    const wrapper = mount(
      <Tooltip>
        <span>
          lorem ipsum dolor etc.
        </span>
      </Tooltip>
    )
    assert.equal(wrapper.find('.Tooltip').length, 1)
  })

  it('should render content', () => {
    const wrapper = mount(
      <Tooltip content='some test content'>
        <span>
          lorem ipsum dolor etc.
        </span>
      </Tooltip>
    )
    assert.equal(wrapper.find('.Tooltip').text(), 'some test content')
  })

  it('should be hidden by default', () => {
    const wrapper = mount(
      <Tooltip>
        <span>
          lorem ipsum dolor etc.
        </span>
      </Tooltip>
    )
    assert.equal(wrapper.find('.Tooltip').node.style.opacity, '0')
  })

  it('should be visible when specified', () => {
    const wrapper = mount(
      <Tooltip visible>
        <span>
          lorem ipsum dolor etc.
        </span>
      </Tooltip>
    )
    assert.equal(wrapper.find('.Tooltip').node.style.opacity, '1')
  })

  it('should be visible when mouseover and mouseout', () => {
    const wrapper = mount(
      <Tooltip>
        <span className='span'>
          lorem ipsum dolor etc.
        </span>
      </Tooltip>
    )
    wrapper.find('.span').simulate('mouseover')
    assert.equal(wrapper.state().visible, true)
    wrapper.find('.span').simulate('mouseout')
    assert.equal(wrapper.state().visible, false)
  })
})
