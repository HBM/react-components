/* global describe, it */

import assert from 'assert'
import React from 'react'
import TabsControlled from '../'
import {mount} from 'enzyme'

describe('TabsControlled', () => {
  it('should show three tabs by default', () => {
    const wrapper = mount(
      <TabsControlled index={-1} />
    )
    assert.equal(wrapper.find('.mdc-TabsControlled-item').length, 3)
  })

  it('should show the active tab', () => {
    const wrapper = mount(
      <TabsControlled
        tabs={['one', 'two', 'three']}
        index={1}
      />
    )
    assert.equal(wrapper.find('.is-active').text(), 'two')
  })

  it('should show the inkbar at the right position', () => {
    const wrapper = mount(
      <TabsControlled
        tabs={['one', 'two', 'three']}
        index={1}
      />
    )
    const style = wrapper.find('.mdc-Tabs-InkBar').props().style
    assert.equal(style.left, `${100 / 3}%`)
    assert.equal(style.right, `${100 / 3}%`)
  })

  it('should callback on click', done => {
    const onChange = index => {
      assert.equal(index, 2)
      done()
    }
    const wrapper = mount(
      <TabsControlled
        tabs={['one', 'two', 'three']}
        index={1}
        onChange={onChange}
      />
    )
    wrapper.find('.mdc-TabsControlled-item').at(2).simulate('click')
  })

  it('should set the inkbar direction when receiving props and going right', () => {
    const wrapper = mount(
      <TabsControlled
        tabs={['one', 'two', 'three']}
        index={1}
      />
    )
    let style = wrapper.find('.mdc-Tabs-InkBar').props().style
    assert.equal(style.left, `${100 / 3}%`)
    assert.equal(style.right, `${100 / 3}%`)
    wrapper.setProps({index: 2})
    style = wrapper.find('.mdc-Tabs-InkBar').props().style
    assert.equal(style.left, `${100 / 3 * 2}%`)
    assert.equal(style.right, `${0}%`)
  })

  it('should set the inkbar direction when receiving props and going left', () => {
    const wrapper = mount(
      <TabsControlled
        tabs={['one', 'two', 'three']}
        index={1}
      />
    )
    let style = wrapper.find('.mdc-Tabs-InkBar').props().style
    assert.equal(style.left, `${100 / 3}%`)
    assert.equal(style.right, `${100 / 3}%`)
    wrapper.setProps({index: 0})
    style = wrapper.find('.mdc-Tabs-InkBar').props().style
    assert.equal(style.left, `${0}%`)
    assert.equal(style.right, `${100 / 3 * 2}%`)
  })
})
