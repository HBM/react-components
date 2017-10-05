/* global describe, it */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import ExpansionPanel from '../'

describe('ExpansionPanel', () => {
  it('should work', () => {
    const wrapper = mount(<ExpansionPanel />)
    assert.equal(wrapper.find('.mdc-ExpansionPanel').length, 1)
  })

  it('should be closed be default', () => {
    const wrapper = mount(<ExpansionPanel />)
    assert(!wrapper.find('.mdc-ExpansionPanel-content').hasClass('is-open'))
  })

  it('should render children', () => {
    const wrapper = mount(
      <ExpansionPanel>
        <div className='children' />
      </ExpansionPanel>
    )
    assert.equal(wrapper.find('.children').length, 1)
  })

  it('should render top content', () => {
    const top = <div className='top' />
    const wrapper = mount(
      <ExpansionPanel top={top}>
        <div className='children' />
      </ExpansionPanel>
    )
    assert.equal(wrapper.find('.top').length, 1)
  })

  it('should open on button click', () => {
    const wrapper = mount(<ExpansionPanel />)
    assert(!wrapper.find('.mdc-ExpansionPanel-content').hasClass('is-open'))
    wrapper.find('.mdc-ExpansionPanel-toggle').simulate('click')
    assert(wrapper.find('.mdc-ExpansionPanel-content').hasClass('is-open'))
  })
})
