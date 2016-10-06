/* global it, describe */

import assert from 'assert'
import React from 'react'
import {Textfield, TextfieldMultiline} from '../'
import {mount} from 'enzyme'

describe('Textfield', () => {
  it('should be empty by default', () => {
    const wrapper = mount(<Textfield />)
    assert.equal(wrapper.find('.Textfield-input').node.value, '')
  })

  it('should be able to set a custom value', () => {
    const wrapper = mount(<Textfield value='my custom value' onChange={() => {}} />)
    assert.equal(wrapper.find('.Textfield-input').node.value, 'my custom value')
  })

  it('should be able to set a custom label', () => {
    const wrapper = mount(<Textfield label='my custom label' />)
    assert.equal(wrapper.find('label').text(), 'my custom label')
  })

  it('should be able to set a custom icon', () => {
    const wrapper = mount(<Textfield icon={<span>ICON</span>} />)
    assert.equal(wrapper.find('.Textfield-icon').text(), 'ICON')
  })

  it('should not show label floated up when value is empty', () => {
    const wrapper = mount(<Textfield label='foo' />)
    assert.equal(wrapper.find('.Textfield-label--floatup').length, 0)
  })

  it('should show label floated up when value is not empty', () => {
    const noop = () => {}
    const wrapper = mount(<Textfield label='foo' defaultValue='bar' onChange={noop} />)
    assert.equal(wrapper.find('.Textfield-label--floatup').length, 1)
  })

  it('should show label floated up when defaultValue is not empty', () => {
    const noop = () => {}
    const wrapper = mount(<Textfield label='foo' value='bar' onChange={noop} />)
    assert.equal(wrapper.find('.Textfield-label--floatup').length, 1)
  })

  it('should show label floated up when value is empty and float=false', () => {
    const wrapper = mount(<Textfield label='foo' float={false} />)
    assert.equal(wrapper.find('.Textfield-label--floatup').length, 1)
  })

  it('should be able to set to disabled', () => {
    const wrapper = mount(<Textfield disabled />)
    assert(wrapper.find('.Textfield-input').node.disabled)
  })

  it('should be able to set to readOnly', () => {
    const wrapper = mount(<Textfield readOnly />)
    assert(wrapper.find('.Textfield-input').node.readOnly)
  })

  it('should callback upon typing', (done) => {
    const callback = (event) => {
      assert.equal(event.target.value, 'hello world')
      done()
    }
    const wrapper = mount(<Textfield onChange={callback} />)
    wrapper.find('.Textfield-input').simulate('change', {
      target: {
        value: 'hello world'
      }
    })
  })

  it('should show an error message', () => {
    const wrapper = mount(<Textfield error='username or password incorrect' />)
    assert.equal(wrapper.find('.Textfield-error').text(), 'username or password incorrect')
  })

  it('should apply error styles', () => {
    const wrapper = mount(<Textfield error='username or password incorrect' />)
    assert(wrapper.find('.Textfield-input').hasClass('Textfield-input--error'))
  })

  it('should have the right type', () => {
    const wrapper = mount(<Textfield type='password' />)
    assert.equal(wrapper.find('.Textfield-input').node.type, 'password')
  })
})

describe('TextfieldMultiline', () => {
  it('should be empty by default', () => {
    const wrapper = mount(<TextfieldMultiline />)
    assert.equal(wrapper.find('.Textfield-input').node.value, '')
  })

  it('should render value as text content of textarea', () => {
    const wrapper = mount(<TextfieldMultiline value='foo bar' onChange={() => {}} />)
    assert.equal(wrapper.find('textarea').node.textContent, 'foo bar')
  })

  it('should have style resize default to "none"', () => {
    const wrapper = mount(<TextfieldMultiline />)
    assert.equal(wrapper.find('textarea').node.style.resize, 'none')
  })

  it('should accept resizable attribute and set style resize to "vertical"', () => {
    const wrapper = mount(<TextfieldMultiline resizable />)
    assert.equal(wrapper.find('textarea').node.style.resize, 'vertical')
  })

  it('should autoset rows based on newlines in "value" + 1', () => {
    const wrapper = mount(<TextfieldMultiline value={'foo\nbar'} onChange={() => {}} />)
    assert.equal(wrapper.find('textarea').node.rows, 2)
  })
})

