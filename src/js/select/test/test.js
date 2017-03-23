/* global it, describe */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import Select from '../'

const noop = () => {}

describe('Select', () => {
  it('should render a simple example', () => {
    const wrapper = mount(<Select onChange={noop} />)
    assert(wrapper.find('.Select'))
  })

  it('should render some default items', () => {
    const wrapper = mount(<Select onChange={noop} />)
    wrapper.find('.Select-body').simulate('click')
    assert.equal(wrapper.find('.Select-listItem').length, 3)
  })

  it('should render a default placeholder', () => {
    const wrapper = mount(<Select onChange={noop} />)
    assert.equal(wrapper.find('.Select-placeholder').text(), 'Placeholder')
  })

  it('should allow disabling the button', () => {
    const wrapper = mount(<Select onChange={noop} disabled />)
    assert(wrapper.find('.Select-body').props().disabled)
  })

  it('should render a given value instead of placeholder', () => {
    const wrapper = mount(
      <Select
        onChange={noop}
        value='dog'
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
      />
    )
    assert.equal(wrapper.find('.Select-body').text(), 'Dog')
  })

  it('should render a label', () => {
    const wrapper = mount(<Select label='Animals' onChange={noop} />)
    assert.equal(wrapper.find('.Select-label').text(), 'Animals')
  })

  it('should open the list when clicked', () => {
    const wrapper = mount(<Select onChange={noop} />)
    wrapper.find('.Select-body').simulate('click')
    assert(wrapper.find('.Select-list'))
  })

  it('should close the list when it is open and click outside happenend', () => {
    const wrapper = mount(<Select onChange={noop} />)
    // open list
    wrapper.find('.Select-body').simulate('click')
    assert.equal(wrapper.find('.Select-list').length, 1)
    // simulate click somewhere
    var event = new window.MouseEvent('click')
    document.dispatchEvent(event)
    // make sure list is closed
    assert.equal(wrapper.find('.Select-list').length, 0)
  })

  it('should close the list on click on an item', () => {
    const callback = () => {}
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={callback}
      />
    )
    // open list
    wrapper.find('.Select-body').simulate('click')
    assert.equal(wrapper.find('.Select-list').length, 1)
    // click on list item
    wrapper.find('.Select-listItemLink').at(1).simulate('click')
    var event = new window.MouseEvent('click')
    document.dispatchEvent(event)
    // make sure list is closed
    assert.equal(wrapper.find('.Select-list').length, 0)
  })

  it('should render the list directly above the selected item', () => {
    const wrapper = mount(
      <Select
        value='rabbit'
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'},
          {value: 'horse', label: 'Horse'},
          {value: 'mouse', label: 'mouse'},
          {value: 'dragon', label: 'Dragon'},
          {value: 'unicorn', label: 'Unicorn'},
          {value: 'wookiee', label: 'Wookiee'}
        ]}
        onChange={noop}
      />
    )
    // open list
    wrapper.find('.Select-body').simulate('click')
    // single list item has height of 48px
    // whole list has a padding top and bottom of 12px
    // check the position for the second element => 48px + 12px = 60px
    assert.equal(wrapper.find('.Select-list').node.style.top, '-60px')
  })

  it('should render a list item always in the middle of the list when list is too large', () => {
    const wrapper = mount(
      <Select
        value='dragon'
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'cat', label: 'Cat'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'},
          {value: 'horse', label: 'Horse'},
          {value: 'mouse', label: 'mouse'},
          {value: 'dragon', label: 'Dragon'},
          {value: 'unicorn', label: 'Unicorn'},
          {value: 'wookiee', label: 'Wookiee'}
        ]}
        onChange={noop}
      />
    )
    // open list
    wrapper.find('.Select-body').simulate('click')
    // single list item = 48px
    // padding top = 8px
    // sixth list item = 5 * 48px + 8px = 248px
    // but!!!! list should not move all the way up -> keep list item centered and scroll
    // element is on 'third' position -> 2 * 48px + 12px = 108px
    assert.equal(wrapper.find('.Select-list').node.style.top, '-108px')
  })

  it('should not show the second last item in the center of the list', () => {
    const wrapper = mount(
      <Select
        value='unicorn'
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'cat', label: 'Cat'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'},
          {value: 'horse', label: 'Horse'},
          {value: 'mouse', label: 'mouse'},
          {value: 'dragon', label: 'Dragon'},
          {value: 'unicorn', label: 'Unicorn'},
          {value: 'wookiee', label: 'Wookiee'}
        ]}
        onChange={noop}
      />
    )
    wrapper.find('.Select-body').simulate('click')
    assert.equal(wrapper.find('.Select-list').node.style.top, '-156px')
  })

  it('should show the last item at the end of the list', () => {
    const wrapper = mount(
      <Select
        value='wookiee'
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'cat', label: 'Cat'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'},
          {value: 'horse', label: 'Horse'},
          {value: 'mouse', label: 'mouse'},
          {value: 'dragon', label: 'Dragon'},
          {value: 'unicorn', label: 'Unicorn'},
          {value: 'wookiee', label: 'Wookiee'}
        ]}
        onChange={noop}
      />
    )
    wrapper.find('.Select-body').simulate('click')
    assert.equal(wrapper.find('.Select-list').node.style.top, '-204px')
  })

  it('should change its position top when inside a table', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <td>
              <Select
                value='wookiee'
                options={[
                  {value: 'fox', label: 'Fox'},
                  {value: 'cat', label: 'Cat'},
                  {value: 'rabbit', label: 'Rabbit'},
                  {value: 'dog', label: 'Dog'},
                  {value: 'horse', label: 'Horse'},
                  {value: 'mouse', label: 'mouse'},
                  {value: 'dragon', label: 'Dragon'},
                  {value: 'unicorn', label: 'Unicorn'},
                  {value: 'wookiee', label: 'Wookiee'}
                ]}
                onChange={noop}
              />
            </td>
          </tr>
        </tbody>
      </table>
    )
    wrapper.find('.Select-body').simulate('click')
    assert.equal(wrapper.find('.Select-list').node.style.top, '-218px')
  })

  it('specifies a name attribute for the button', () => {
    const wrapper = mount(<Select name='donald' onChange={noop} />)
    assert.equal(wrapper.find('button').node.name, 'donald')
  })

  it('should handle window resize events', () => {
    const wrapper = mount(<Select onChange={noop} />)
    wrapper.setState({width: 100})
    assert.equal(wrapper.state().width, 100)
    const event = new window.Event('resize')
    window.dispatchEvent(event)
    // in jsdom the window width and height is always zero
    assert.equal(wrapper.state().width, 0)
  })
})
