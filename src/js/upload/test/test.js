/* global describe, it */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import Upload from '../'

const file = {
  name: 'update.hbg',
  size: 1234
}

const noop = () => {}

describe('Upload', () => {
  it('should render component with default text', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    assert.equal(wrapper.find('.Upload-textBefore').text(), '')
    assert.equal(wrapper.find('.Upload-textAfter').text(), 'or drag file in this area')
  })

  it('should render component with custom textBefore', () => {
    const wrapper = mount(<Upload textBefore={'hello world'} onChange={noop} />)
    assert.equal(wrapper.find('.Upload-textBefore').text(), 'hello world')
  })

  it('should render component with custom textAfter', () => {
    const wrapper = mount(<Upload textAfter={'hello world'} onChange={noop} />)
    assert.equal(wrapper.find('.Upload-textAfter').text(), 'hello world')
  })

  it('should propagate disabled property to input type file and button', () => {
    const wrapper = mount(<Upload disabled onChange={noop} />)
    assert(wrapper.find('.Upload-fileInput').props().disabled)
    assert(wrapper.find('.mdc-Button').props().disabled)
  })

  it('should ignore drag and drop events when disabled', () => {
    const wrapper = mount(<Upload disabled onChange={noop} />)
    wrapper.find('.Upload').simulate('dragenter', {
      dataTransfer: {
        files: [file]
      }
    })
    assert(wrapper.find('.Upload').hasClass('is-disabled'))
    assert.equal(wrapper.find('.Upload').hasClass('is-over-dropzone'), false)
  })

  it('should propagate accept property to input type file', () => {
    const wrapper = mount(<Upload onChange={noop} accept='.jpg' />)
    assert.equal(wrapper.find('.Upload-fileInput').props().accept, '.jpg')
  })

  it('should not change style for not accepted file types', () => {
    const wrapper = mount(<Upload onChange={noop} accept='.md' />)
    wrapper.find('.Upload').simulate('dragenter', {
      dataTransfer: {
        files: [{
          name: 'image.png',
          type: 'image/png'
        }]
      }
    })
    assert.equal(wrapper.find('.Upload').hasClass('is-over-dropzone'), false)
  })

  it('should change style for accepted file types', () => {
    const wrapper = mount(<Upload onChange={noop} accept='.png' />)
    wrapper.find('.Upload').simulate('dragenter', {
      dataTransfer: {
        files: [{
          name: 'image.png',
          type: 'image/png'
        }]
      }
    })
    assert(wrapper.find('.Upload').hasClass('is-over-dropzone'))
  })

  it('should toggle "is-over-window" css class on document dragenter and dragleave', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    document.dispatchEvent(new window.Event('dragenter'))
    assert(wrapper.find('.Upload').hasClass('is-over-window'))
    document.dispatchEvent(new window.Event('dragleave'))
    assert.equal(wrapper.find('.Upload').hasClass('is-over-window'), false)
  })

  it('should toggle "is-over-dropzone" css class on dropzone dragenter and dragleave', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    wrapper.find('.Upload').simulate('dragenter')
    assert(wrapper.find('.Upload').hasClass('is-over-dropzone'))
    wrapper.find('.Upload').simulate('dragleave')
    assert.equal(wrapper.find('.Upload').hasClass('is-over-dropzone'), false)
  })

  it('should remove dragenter event listener when component is unmounted', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    const instance = wrapper.find('.Upload')
    // simulate unmount by calling method directly
    wrapper.unmount()
    // now simulate dragenter event and make sure component does not react anymore
    document.dispatchEvent(new window.Event('dragenter'))
    assert.equal(instance.hasClass('is-over-window'), false)
  })

  it('should remove dragleave event listener when component is unmounted', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    const instance = wrapper.find('.Upload')
    document.dispatchEvent(new window.Event('dragenter'))
    // make sure component has correct class
    assert(instance.hasClass('is-over-window'))
    // now simulate unmount
    wrapper.unmount()
    // now simulate dragleave event and make sure component does not loose its class
    document.dispatchEvent(new window.Event('dragleave'))
    assert(instance.hasClass('is-over-window'))
  })

  it('should propagate button click event to input element', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    // attach dummy click event handler to input dom element
    let clicked = false
    wrapper.find('.Upload-fileInput').node.addEventListener('click', () => { clicked = true })
    // simulate click event on top level node which is the div
    wrapper.find('.Upload-fileInput').simulate('click')
    assert.equal(clicked, false)
    wrapper.find('.mdc-Button').simulate('click')
    assert(clicked)
  })

  it('should not allow dropping multiple files in firefox', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    wrapper.find('.Upload').simulate('dragenter', {
      dataTransfer: {
        mozItemCount: 2
      }
    })
    assert.equal(wrapper.find('.Upload').hasClass('is-over-dropzone'), false)
  })

  it('should not allow dropping multiple files in chrome', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    wrapper.find('.Upload').simulate('dragenter', {
      dataTransfer: {
        items: [file, file]
      }
    })
    assert.equal(wrapper.find('.Upload').hasClass('is-over-dropzone'), false)
  })

  it('should allow dropping a single file', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    wrapper.find('.Upload').simulate('dragenter', {
      dataTransfer: {
        items: [file]
      }
    })
    assert(wrapper.find('.Upload').hasClass('is-over-dropzone'))
  })

  it('should handle dragover event on dropzone', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    let preventDefaultCalled = false
    wrapper.find('.Upload').simulate('dragover', {
      preventDefault: () => {
        preventDefaultCalled = true
      }
    })
    assert(preventDefaultCalled)
  })

  it('should not allow dragging multiple files over dropzone in firefox', () => {
    const wrapper = mount(<Upload onChange={noop} />)
    let preventDefaultCalled = false
    wrapper.find('.Upload').simulate('dragover', {
      preventDefault: () => {
        preventDefaultCalled = true
      },
      dataTransfer: {
        mozItemCount: 2
      }
    })
    assert.equal(preventDefaultCalled, false)
  })

  it('should handle drop event on dropzone', () => {
    let name = ''
    const callback = (files) => {
      name = files[0].name
    }
    const wrapper = mount(<Upload onChange={callback} />)
    wrapper.find('.Upload').simulate('drop', {
      dataTransfer: {
        files: [file]
      }
    })
    assert.equal(name, 'update.hbg')
  })
})
