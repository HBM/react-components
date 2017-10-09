/* global describe, it */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import Progress from '../'

describe('Progress', () => {
  describe('Linear', () => {
    it('should work', () => {
      const wrapper = mount(<Progress.Linear />)
      assert.equal(wrapper.find('.mdc-Progress-linear').length, 1)
    })

    it('should render inactive if percentage === 0', () => {
      const wrapper = mount(<Progress.Linear percentage={0} />)
      assert.equal(wrapper.find('.mdc-Progress-linear-background.is-active').length, 0)
      assert.equal(wrapper.find('.mdc-Progress-linear-background').length, 1)
    })

    it('should render inactive if percentage === 100', () => {
      const wrapper = mount(<Progress.Linear percentage={100} />)
      assert.equal(wrapper.find('.mdc-Progress-linear-background.is-active').length, 0)
      assert.equal(wrapper.find('.mdc-Progress-linear-background').length, 1)
    })

    it('should render active if percentage === 1', () => {
      const wrapper = mount(<Progress.Linear percentage={1} />)
      assert.equal(wrapper.find('.mdc-Progress-linear-background.is-active').length, 1)
    })

    it('should render a progress bar with given percentage', () => {
      const wrapper = mount(<Progress.Linear percentage={50} />)
      assert.equal(wrapper.find('.mdc-Progress-linear-inner').instance().style.width, '50%')
    })
  })

  describe('Circular', () => {
    it('should work', () => {
      const wrapper = mount(<Progress.Circular />)
      assert.equal(wrapper.find('.mdc-Progress-circular').length, 1)
    })

    it('should render circular progress with given percentage', () => {
      const wrapper = mount(<Progress.Circular percentage={50} />)
      const inner = wrapper.find('.mdc-Progress-circular-path')
      assert.equal(parseFloat(inner.instance().style.strokeDasharray), 2 * Math.PI * 30)
      assert.equal(inner.instance().style.strokeDashoffset, Math.PI * 30)
    })
  })
})
