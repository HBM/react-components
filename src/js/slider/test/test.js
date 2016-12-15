/* global it, describe */

import assert from 'assert'
import React from 'react'
import Slider from '../'
import {mount} from 'enzyme'

describe('Slider', () => {
  it('should have a default value of 0', () => {
    const wrapper = mount(<Slider min={0} max={3} />)
    assert.equal(wrapper.find('.Slider-input').node.value, '0')
  })

  it('should reflect changes made to input type range', () => {
    const wrapper = mount(<Slider min={0} max={3} />)
    wrapper.find('.Slider-input').simulate('change', {
      target: {
        value: 2.1
      }
    })
    assert.equal(wrapper.find('.Slider-input').node.value, '2.1')
  })

  it('should reflect changes made to the value prop', () => {
    const wrapper = mount(<Slider min={0} max={3} value={1} />)
    wrapper.setProps({value: 2.3})
    assert.equal(wrapper.find('.Slider-input').node.value, '2.3')
  })

  it('should skip other changes in props', () => {
    const wrapper = mount(<Slider min={0} max={3} value={1} />)
    wrapper.setProps({foo: 2.3})
    assert.equal(wrapper.find('.Slider-input').node.value, '1')
  })

  it('should fade out the thumb when value is min', () => {
    const wrapper = mount(<Slider min={-1} max={3} />)
    wrapper.find('.Slider-input').simulate('change', {
      target: {
        value: -1
      }
    })
    assert(wrapper.find('.Slider-thumb').hasClass('is-zero'))
  })

  it('should clip value < min', () => {
    const wrapper = mount(<Slider min={-1} max={3} />)
    wrapper.find('.Slider-input').simulate('change', {
      target: {
        value: -2
      }
    })
    assert.equal(wrapper.find('.Slider-input').node.value, '-1')
  })

  it('should clip value > max', () => {
    const wrapper = mount(<Slider min={-1} max={3} />)
    wrapper.find('.Slider-input').simulate('change', {
      target: {
        value: 5
      }
    })
    assert.equal(wrapper.find('.Slider-input').node.value, '3')
  })

  it('.getValueFromSlider should work :)', () => {
    const wrapper = mount(<Slider min={-1} max={3} />)
    const value = wrapper.instance().getValueFromSlider({
      pageX: 0.4
    })
    const expectedX = 0.4 - 8 - 0 // slider.getBoundingClientRect -> {left: 0} in tests
    const defaultRatio = -16 / (3 - (-1))
    const expected = expectedX / defaultRatio + (-1)
    assert.equal(value, expected)
  })

  it('.getSteppedValue(0.1) should equal 0', () => {
    const wrapper = mount(<Slider min={-1} max={3} step={0.5} value={-1} />)
    const value = wrapper.instance().getSteppedValue(0.1)
    assert.equal(value, 0)
  })

  it('.getSteppedValue(0.8) should equal 1', () => {
    const wrapper = mount(<Slider min={-1} max={3} step={0.5} value={-1} />)
    const value = wrapper.instance().getSteppedValue(0.8)
    assert.equal(value, 1)
  })

  it('.getSteppedValue(0.6) with step=undefined should return 0.6', () => {
    const wrapper = mount(<Slider min={-1} max={3} value={-1} />)
    const value = wrapper.instance().getSteppedValue(0.6)
    assert.equal(value, 0.6)
  })

  it('.updateMoveValue(0.6) should update state.value and state.prevValue and call props.onMove', () => {
    let moveValue
    const onMove = (value) => {
      moveValue = value
    }
    const wrapper = mount(<Slider min={-1} max={3} value={-1} onMove={onMove} />)
    wrapper.instance().updateMoveValue(0.6)
    assert.equal(moveValue, 0.6)
    assert.equal(wrapper.state('value'), 0.6)
    assert.equal(wrapper.state('prevValue'), 0.6)
  })

  it('.setValue(0.6) should update state.value and state.prevValue and call props.onMove and props.onChange', () => {
    let moveValue
    const onMove = (value) => {
      moveValue = value
    }
    let changeValue
    const onChange = (value) => {
      changeValue = value
    }
    const wrapper = mount(<Slider min={-1} max={3} value={-1} onMove={onMove} onChange={onChange} />)
    wrapper.instance().setValue(0.6)
    assert.equal(moveValue, 0.6)
    assert.equal(changeValue, 0.6)
    assert.equal(wrapper.state('value'), 0.6)
    assert.equal(wrapper.state('prevValue'), 0.6)
  })

  it.skip('should work with keyboard arrow keys', () => {
    const wrapper = mount(<Slider min={3} max={7} value={5} />)
    // make sure default value is 5
    assert.equal(wrapper.find('.Slider-input').node.value, '5')
    wrapper.find('.Slider-input').simulate('keypress', {
      key: 'ArrowLeft',
      keyCode: 37
    })
    assert.equal(wrapper.find('.Slider-input').node.value, '4')
    wrapper.find('.Slider-input').simulate('keypress', {
      key: 'ArrowRight',
      keyCode: 39
    })
    assert.equal(wrapper.find('.Slider-input').node.value, '5')
  })

  it.skip('should work with custom step', () => {
    const wrapper = mount(<Slider step={10.1} min={1.3} max={20} value={1.3} />)
    assert.equal(wrapper.find('.Slider-input').node.value, '1.3')
    wrapper.find('.Slider-input').simulate('keypress', {
      key: 'ArrowRight',
      keyCode: 39
    })
    assert.equal(wrapper.find('.Slider-input').node.value, '11.4')
  })
})
