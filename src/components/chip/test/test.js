/* global describe, it */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import Chip from '../'

const noop = () => {}

describe('Chip', () => {
  it('should render an input field', () => {
    const wrapper = mount(<Chip onChange={noop} />)
    assert.equal(wrapper.find('.Chip-input').length, 1)
  })

  it('should render no input field when onChange is not defined', () => {
    const wrapper = mount(<Chip />)
    assert.equal(wrapper.find('.Chip-input').length, 0)
  })

  it('should be empty by default', () => {
    const wrapper = mount(<Chip />)
    assert.equal(wrapper.find('.Chip').length, 0)
  })

  it('should accept autoFocus prop', () => {
    const wrapper = mount(<Chip autoFocus onChange={noop} />)
    assert.equal(wrapper.find('.Chip-input').prop('autoFocus'), true)
  })

  it('should not show delete buttons when deletable=false', () => {
    const wrapper = mount(<Chip value={[{text: 'foo'}]} onChange={noop} deletable={false} />)
    assert.equal(wrapper.find('.Chip').length, 1)
    assert.equal(wrapper.find('button').length, 0)
  })

  it('should not show delete buttons when onChange is not defined', () => {
    const wrapper = mount(<Chip value={[{text: 'foo'}]} />)
    assert.equal(wrapper.find('.Chip').length, 1)
    assert.equal(wrapper.find('button').length, 0)
  })

  it('should accept autoFocus prop', () => {
    const wrapper = mount(<Chip autoFocus onChange={noop} />)
    assert.equal(wrapper.find('.Chip-input').prop('autoFocus'), true)
  })

  it('should accept initial chips as property', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}, {text: 'two'}]} />)
    assert.equal(wrapper.find('.Chip').length, 2)
  })

  it('should callback with value on enter', (done) => {
    const onChange = (value) => {
      assert.equal(value[0].text, 'hello')
      done()
    }
    const wrapper = mount(<Chip value={[]} onChange={onChange} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: 'hello'
      }
    })
    // make sure input has new value / state
    assert.equal(wrapper.find('input').node.value, 'hello')
    // simulate enter
    wrapper.find('input').simulate('keypress', {
      which: 13
    })
  })

  it('should not add a chip when input field is empty', (done) => {
    const onChange = (value) => {
      // should not call onChange handler
      throw new Error('error')
    }
    const wrapper = mount(<Chip value={[]} onChange={onChange} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: ''
      }
    })
    // make sure input has new value / state
    assert.equal(wrapper.find('input').node.value, '')
    // simulate enter
    wrapper.find('input').simulate('keypress', {
      which: 13
    })
    // wait for 100 ms to make sure callback would have the chance to fire
    setTimeout(done, 100)
  })

  it('should focus the last chip when left arrow is pressed inside input the field', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={noop} />)
    wrapper.find('input').simulate('keydown', {
      which: 37
    })
    assert.equal(wrapper.find('.Chip').node, document.activeElement)
  })

  it('should focus the last chip when backspace is pressed inside input the field', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={noop} />)
    wrapper.find('input').simulate('keydown', {
      which: 8
    })
    assert.equal(wrapper.find('.Chip').node, document.activeElement)
  })

  it('should focus the first chip when right arrow is pressed inside input the field', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={noop} />)
    wrapper.find('input').simulate('keydown', {
      which: 39
    })
    assert.equal(wrapper.find('.Chip').node, document.activeElement)
  })

  it('should cycle left when chip is selected and left arrow is clicked', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}, {text: 'two'}]} onChange={noop} />)
    wrapper.find('.Chip-wrapper').childAt(1).simulate('keydown', {
      which: 37
    })
    assert.equal(document.activeElement.textContent, 'one')
  })

  it('should focus the input field when first chip is selected and left arrow is clicked', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={noop} />)
    wrapper.find('.Chip').simulate('keydown', {
      which: 37
    })
    assert.equal(wrapper.find('.Chip-input').node, document.activeElement)
  })

  it('should cycle right when chip is selected and right arrow is clicked', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}, {text: 'two'}]} onChange={noop} />)
    wrapper.find('.Chip-wrapper').childAt(0).simulate('keydown', {
      which: 39
    })
    assert.equal(document.activeElement.textContent, 'two')
  })

  it('should focus the input field when last chip is selected and right arrow is clicked', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={noop} />)
    wrapper.find('.Chip').simulate('keydown', {
      which: 39
    })
    assert.equal(wrapper.find('.Chip-input').node, document.activeElement)
  })

  it('should focus the input field on click on wrapper', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={noop} />)
    wrapper.find('.Chip-wrapper').simulate('click')
    assert.equal(wrapper.find('.Chip-input').node, document.activeElement)
  })

  it('should not focus the input field on click on chip', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={noop} />)
    wrapper.find('.Chip').simulate('click')
    assert.notEqual(wrapper.find('.Chip-input').node, document.activeElement)
  })

  it('should remove focused chip on backspace', (done) => {
    const onChange = (value) => {
      assert.equal(value.length, 0)
      done()
    }
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={onChange} />)
    wrapper.find('.Chip').simulate('keydown', {
      which: 8
    })
  })

  it('should remove focused chip on delete', (done) => {
    const onChange = (value) => {
      assert.equal(value.length, 0)
      done()
    }
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={onChange} />)
    wrapper.find('.Chip').simulate('keydown', {
      which: 46
    })
  })

  it('should remove chip on delete button click', (done) => {
    const onChange = (value) => {
      assert.equal(value.length, 0)
      done()
    }
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={onChange} />)
    wrapper.find('.Chip-delete').simulate('click')
  })

  it('should focus the input field when last chip is removed', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}]} onChange={noop} />)
    wrapper.find('.Chip-delete').simulate('click')
    assert.equal(wrapper.find('.Chip-input').node, document.activeElement)
  })

  it('should focus chip to the left when last chip is removed', () => {
    const wrapper = mount(<Chip value={[{text: 'one'}, {text: 'two'}]} onChange={noop} />)
    wrapper.find('.Chip-wrapper').childAt(1).simulate('keydown', {
      which: 8
    })
    assert.equal(document.activeElement.textContent, 'one')
  })

  it('should allow custom delimiters', (done) => {
    const onChange = (value) => {
      assert.equal(value[0].text, 'hello')
      done()
    }
    const wrapper = mount(<Chip value={[]} onChange={onChange} delimiters={[32]} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: 'hello'
      }
    })
    // make sure input has new value / state
    assert.equal(wrapper.find('input').node.value, 'hello')
    // simulate enter
    wrapper.find('input').simulate('keypress', {
      which: 32
    })
  })
})
