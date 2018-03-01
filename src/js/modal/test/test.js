/* global it, describe */

import assert from 'assert'
import React from 'react'
import {default as Modal, preventDefault} from '../'
import {mount} from 'enzyme'

describe('Modal', () => {
  it('should work', () => {
    const wrapper = mount(<Modal visible />)
    assert.equal(wrapper.find('.mdc-Modal').length, 1)
  })

  it('should be hidden by default', () => {
    const wrapper = mount(<Modal />)
    assert.equal(wrapper.find('.mdc-Modal').length, 1)
    assert.equal(wrapper.find('.mdc-Modal--visible').length, 0)
  })

  it('should callback when clicking on dark background', (done) => {
    const callback = (visible) => {
      assert.equal(visible, false)
      done()
    }
    const wrapper = mount(<Modal visible toggle={callback} />)
    wrapper.find('.mdc-Modal-overlay').simulate('click')
  })

  it('should have a custom header', () => {
    const header = <p>my custom header</p>
    const wrapper = mount(<Modal visible header={header} />)
    assert.equal(wrapper.find('.mdc-Modal-header').text(), 'my custom header')
  })

  it('should have a custom body', () => {
    const body = <p>my custom body</p>
    const wrapper = mount(<Modal visible body={body} />)
    assert.equal(wrapper.find('.mdc-Modal-body').text(), 'my custom body')
  })

  it('should have a custom footer', () => {
    const footer = <p>my custom footer</p>
    const wrapper = mount(<Modal visible footer={footer} />)
    assert.equal(wrapper.find('.mdc-Modal-footer').text(), 'my custom footer')
  })

  it('.disableScroll() should replace window event listeners with preventDefault', () => {
    const wrapper = mount(<Modal />)
    const calls = []
    const addEventListenerBak = window.addEventListener
    window.addEventListener = (type, dispatch, flag) => {
      calls.push({
        type,
        dispatch,
        flag
      })
    }
    wrapper.instance().disableScroll()
    assert.deepEqual(calls[0], {
      type: 'DOMMouseScroll',
      dispatch: preventDefault,
      flag: false
    })
    assert.deepEqual(calls[1], {
      type: 'wheel',
      dispatch: preventDefault,
      flag: false
    })
    assert.deepEqual(calls[2], {
      type: 'touchmove',
      dispatch: preventDefault,
      flag: false
    })
    assert.deepEqual(calls[3], {
      type: 'keydown',
      dispatch: wrapper.instance().handleScrollAndEscKeys,
      flag: false
    })
    window.addEventListener = addEventListenerBak
  })

  it('.enableScroll() should restore event listeners', () => {
    const wrapper = mount(<Modal />)
    const addEventListenerBak = window.addEventListener
    const removeEventListenerBak = window.removeEventListener
    const calls = []
    window.addEventListener = () => {}
    window.removeEventListener = (type, dispatch, flag) => {
      calls.push({
        type,
        dispatch,
        flag
      })
    }
    wrapper.instance().disableScroll()
    wrapper.instance().enableScroll()
    assert.deepEqual(calls[0], {
      type: 'DOMMouseScroll',
      dispatch: preventDefault,
      flag: false
    })
    assert.deepEqual(calls[1], {
      type: 'wheel',
      dispatch: preventDefault,
      flag: false
    })
    assert.deepEqual(calls[2], {
      type: 'touchmove',
      dispatch: preventDefault,
      flag: false
    })
    assert.deepEqual(calls[3], {
      type: 'keydown',
      dispatch: wrapper.instance().handleScrollAndEscKeys,
      flag: false
    })
    window.addEventListener = addEventListenerBak
    window.removeEventListener = removeEventListenerBak
  })

  it('helper preventDefault should preventDefault and set returnValue=false', () => {
    let wasCalled
    const event = {
      preventDefault: () => {
        wasCalled = true
      }
    }
    preventDefault(event)
    assert.equal(event.returnValue, false)
    assert(wasCalled)
  })

  it('should disable scroll and blur activeElement when getting visible', () => {
    const wrapper = mount(<Modal />)
    let disableWasCalled
    wrapper.instance().disableScroll = () => {
      disableWasCalled = true
    }
    let blurWasCalled
    document.activeElement.blur = () => {
      blurWasCalled = true
    }
    wrapper.setProps({visible: true})
    assert(disableWasCalled)
    assert(blurWasCalled)
  })

  it('should enable scroll when getting invisible', () => {
    const wrapper = mount(<Modal visible />)
    let enableWasCalled
    wrapper.instance().enableScroll = () => {
      enableWasCalled = true
    }
    wrapper.setProps({visible: false})
    assert(enableWasCalled)
  })

  it('click on modal should not propagate', () => {
    const wrapper = mount(<Modal visible />)
    let wasCalled
    wrapper.find('.mdc-Modal').simulate('click', {
      stopPropagation: () => {
        wasCalled = true
      }
    })
    assert(wasCalled)
  })

  it('touchend on modal should not propagate', () => {
    const wrapper = mount(<Modal visible />)
    let wasCalled
    wrapper.find('.mdc-Modal').simulate('touchend', {
      stopPropagation: () => {
        wasCalled = true
      }
    })
    assert(wasCalled)
  })

  it('handleScrollAndEscKeys should prevent default for scroll keys', () => {
    const wrapper = mount(<Modal visible />)
    let wasCalled
    let result = wrapper.instance().handleScrollAndEscKeys({
      keyCode: 32,
      preventDefault: () => {
        wasCalled = true
      }
    })
    assert(wasCalled)
    assert.equal(result, false)
  })

  it('handleScrollAndEscKeys should prevent default for scroll keys', () => {
    let toggleArg
    const wrapper = mount(<Modal visible toggle={(arg) => {
      toggleArg = arg
    }} />)
    wrapper.instance().handleScrollAndEscKeys({
      keyCode: 27
    })
    assert.equal(toggleArg, false)
  })
})
