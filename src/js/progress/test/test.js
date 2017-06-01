/* global describe, it */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import Progress from '../'

describe('Progress', () => {
  describe('Linear', () => {
    it('should work', (done) => {
      const wrapper = mount(<Progress.Linear />)
      // use setTimeout to make component is rendered
      window.setTimeout(() => {
        assert.equal(wrapper.find('.mdc-Progress-linear').length, 1)
        done()
      }, 100)
    })

    it('should render a progress bar with given percentage', (done) => {
      const wrapper = mount(<Progress.Linear percentage={50} />)
      window.setTimeout(() => {
        assert.equal(wrapper.find('.mdc-Progress-linear-inner').node.style.width, '50%')
        done()
      }, 100)
    })

    it('should remove itself from the DOM when done', (done) => {
      const wrapper = mount(<Progress.Linear />)
      window.setTimeout(() => {
        assert.equal(wrapper.find('.mdc-Progress-linear').length, 1)
        // let it be done
        wrapper.setProps({
          percentage: 100
        })
        window.setTimeout(() => {
          assert.equal(wrapper.find('.mdc-Progress-linear').length, 0)
          done()
        }, 1500)
      }, 100)
    }, 10000)

    // make sure else path is taken for test coverage
    it('should not remove itself from the DOM when below 100 percent', (done) => {
      const wrapper = mount(<Progress.Linear />)
      window.setTimeout(() => {
        assert.equal(wrapper.find('.mdc-Progress-linear').length, 1)
        wrapper.setProps({
          percentage: 99
        })
        window.setTimeout(() => {
          // different to test above
          assert.equal(wrapper.find('.mdc-Progress-linear').length, 1)
          done()
        }, 1500)
      }, 100)
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
      assert.equal(parseFloat(inner.node.style.strokeDasharray), 2 * Math.PI * 30)
      assert.equal(inner.node.style.strokeDashoffset, Math.PI * 30)
    })
  })
})
