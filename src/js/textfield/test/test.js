/* global it, describe */

import assert from 'assert'
import React from 'react'
import {Textfield, Textarea} from '../'
import {mount} from 'enzyme'

describe('Textfield', () => {
  it('should be empty by default', () => {
    const wrapper = mount(<Textfield />)
    assert.equal(wrapper.find('.mdc-Textfield-input').instance().value, '')
  })

  it('should be able to set a custom value', () => {
    const wrapper = mount(<Textfield value='my custom value' onChange={() => {}} />)
    assert.equal(wrapper.find('.mdc-Textfield-input').instance().value, 'my custom value')
  })

  it('should be able to set a custom label', () => {
    const wrapper = mount(<Textfield label='my custom label' />)
    assert.equal(wrapper.find('label').text(), 'my custom label')
  })

  it('should be able to set a custom icon', () => {
    const wrapper = mount(<Textfield icon={<span>ICON</span>} />)
    assert.equal(wrapper.find('.mdc-Textfield-icon').text(), 'ICON')
  })

  it('should not show label floated up when value is empty', () => {
    const wrapper = mount(<Textfield label='foo' />)
    assert.equal(wrapper.find('.mdc-Textfield-label--floatup').length, 0)
  })

  it('should show label floated up when value is not empty', () => {
    const noop = () => {}
    const wrapper = mount(<Textfield label='foo' defaultValue='bar' onChange={noop} />)
    assert.equal(wrapper.find('.mdc-Textfield-label--floatup').length, 1)
  })

  it('should show label floated up when defaultValue is not empty', () => {
    const noop = () => {}
    const wrapper = mount(<Textfield label='foo' value='bar' onChange={noop} />)
    assert.equal(wrapper.find('.mdc-Textfield-label--floatup').length, 1)
  })

  it('should show label floated up when value is empty and float=false', () => {
    const wrapper = mount(<Textfield label='foo' float={false} />)
    assert.equal(wrapper.find('.mdc-Textfield-label--floatup').length, 1)
  })

  it('should be able to set to disabled', () => {
    const wrapper = mount(<Textfield disabled />)
    assert(wrapper.find('.mdc-Textfield-input').instance().disabled)
  })

  it('should be able to set to readOnly', () => {
    const wrapper = mount(<Textfield readOnly />)
    assert(wrapper.find('.mdc-Textfield-input').instance().readOnly)
  })

  it('should callback upon typing', (done) => {
    const callback = (event) => {
      assert.equal(event.target.value, 'hello world')
      done()
    }
    const wrapper = mount(<Textfield onChange={callback} />)
    wrapper.find('.mdc-Textfield-input').simulate('change', {
      target: {
        value: 'hello world'
      }
    })
  })

  it('should show an error message', () => {
    const wrapper = mount(<Textfield error='username or password incorrect' />)
    assert.equal(wrapper.find('.mdc-Textfield-error').text(), 'username or password incorrect')
  })

  it('should apply error styles', () => {
    const wrapper = mount(<Textfield error='username or password incorrect' />)
    assert(wrapper.find('.mdc-Textfield-input').hasClass('mdc-Textfield-input--error'))
  })

  it('should have the right type', () => {
    const wrapper = mount(<Textfield type='password' />)
    assert.equal(wrapper.find('.mdc-Textfield-input').instance().type, 'password')
  })

  it('should allow setting the htmlFor attribute on label element', () => {
    const wrapper = mount(<Textfield htmlFor='foo' />)
    assert.equal(wrapper.find('label').instance().htmlFor, 'foo')
  })

  it('should allow access to the underlying input element', done => {
    const ref = c => {
      assert.equal(c.nodeName, 'INPUT')
      done()
    }
    mount(<Textfield inputRef={ref} />)
  })

  it('should onFocus', (done) => {
    const onFocus = (event) => {
      done()
    }
    const wrapper = mount(<Textfield onFocus={onFocus} />)
    wrapper.find('.mdc-Textfield-input').simulate('focus')
  })

  it('should onBlur', (done) => {
    const onBlur = (event) => {
      done()
    }
    const wrapper = mount(<Textfield onFocus={() => {}} onBlur={onBlur} />)
    wrapper.find('.mdc-Textfield-input').simulate('focus')
    wrapper.find('.mdc-Textfield-input').simulate('blur')
  })
})

describe('Textarea', () => {
  it('should be empty by default', () => {
    const wrapper = mount(<Textarea />)
    assert.equal(wrapper.find('.mdc-Textfield-input').instance().value, '')
  })

  it('should render value as text content of textarea', () => {
    const wrapper = mount(<Textarea value='foo bar' onChange={() => {}} />)
    assert.equal(wrapper.find('textarea').instance().textContent, 'foo bar')
  })

  it('should have style resize default to "none"', () => {
    const wrapper = mount(<Textarea />)
    assert.equal(wrapper.find('textarea').instance().style.resize, 'none')
  })

  it('should accept resizable attribute and set style resize to "vertical"', () => {
    const wrapper = mount(<Textarea resizable />)
    assert.equal(wrapper.find('textarea').instance().style.resize, 'vertical')
  })

  it('should default rows = 2', () => {
    const wrapper = mount(<Textarea value={'foo'} onChange={() => {}} />)
    assert.equal(wrapper.find('textarea').instance().rows, 2)
  })

  it('should allow setting rows', () => {
    const wrapper = mount(<Textarea value={'foo'} rows={1} onChange={() => {}} />)
    assert.equal(wrapper.find('textarea').instance().rows, 1)
  })

  it('should resize', () => {
    let target = {
      style: {
        height: '30px'
      },
      scrollHeight: 60
    }
    const getComputedStyle = () => {
      return {
        'line-height': '22px'
      }
    }
    const wrapper = mount(<Textarea value={'foo\nbar'} onChange={() => {}} getComputedStyle={getComputedStyle} />)
    wrapper.find('textarea').simulate('input', {target})
    assert.equal(target.style.height, '61px') // 1px border
  })

  it('should resize with height < maxRows', () => {
    let target = {
      style: {
        height: '30px'
      },
      scrollHeight: 60
    }
    const getComputedStyle = () => {
      return {
        'line-height': '22px'
      }
    }
    const wrapper = mount(<Textarea value={'foo\nbar'} onChange={() => {}} maxRows={3} getComputedStyle={getComputedStyle} />)
    wrapper.find('textarea').simulate('input', {target})
    assert.equal(target.style.height, '61px') // 1px border
  })

  it('should not resize with height > maxRows', () => {
    let target = {
      style: {
        height: '30px'
      },
      scrollHeight: 90
    }
    const getComputedStyle = () => {
      return {
        'line-height': '22px'
      }
    }
    const wrapper = mount(<Textarea value={'foo\nbar'} onChange={() => {}} maxRows={3} getComputedStyle={getComputedStyle} />)
    wrapper.find('textarea').simulate('input', {target})
    assert.equal(target.style.height, '30px')
  })

  it('should allow setting the htmlFor attribute on label element', () => {
    const wrapper = mount(<Textarea htmlFor='foo' />)
    assert.equal(wrapper.find('label').instance().htmlFor, 'foo')
  })

  it('should onFocus', (done) => {
    const onFocus = (event) => {
      done()
    }
    const wrapper = mount(<Textarea onFocus={onFocus} />)
    wrapper.find('.mdc-Textfield-input').simulate('focus')
  })

  it('should onBlur', (done) => {
    const onBlur = (event) => {
      done()
    }
    const wrapper = mount(<Textarea onFocus={() => {}} onBlur={onBlur} />)
    wrapper.find('.mdc-Textfield-input').simulate('focus')
    wrapper.find('.mdc-Textfield-input').simulate('blur')
  })
})
