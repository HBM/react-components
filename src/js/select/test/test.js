/* global it, describe */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import Select, {List} from '../'
import keycode from 'keycode'

const noop = () => {}
const initState = {
  top: 300,
  left: 10,
  width: 100
}

const refWrapper = {
  getBoundingClientRect: () => ({...initState})
}

describe('Select', () => {
  it('should render a simple example', () => {
    const wrapper = mount(<Select onChange={noop} />)
    assert.equal(wrapper.find(Select).length, 1)
    assert(wrapper.find(Select))
  })

  it('should unmount a simple example', () => {
    const wrapper = mount(<Select onChange={noop} />)
    wrapper.unmount()
    assert.equal(wrapper.find(Select).length, 0)
  })

  it('should render some default items', () => {
    const wrapper = mount(<Select onChange={noop} />)
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-listItem').length, 3)
  })

  it('should render a default placeholder', () => {
    const wrapper = mount(<Select onChange={noop} />)
    assert.equal(wrapper.find('.mdc-Select-placeholder').text(), 'Placeholder')
  })

  it('should render a helper message', () => {
    const wrapper = mount(
      <Select
        onChange={noop}
        helper='helper'
      />
    )
    assert.equal(wrapper.find('.mdc-Select-helper').text(), 'helper')
  })

  it('should render an error message', () => {
    const wrapper = mount(
      <Select
        onChange={noop}
        error='error'
      />
    )
    assert.equal(wrapper.find('.mdc-Select-helper--error').text(), 'error')
  })

  it('should give the error message higher priority than the helper message', () => {
    const wrapper = mount(
      <Select
        onChange={noop}
        helper='helper'
        error='error'
      />
    )
    assert.equal(wrapper.find('.mdc-Select-helper').text(), 'error')
  })

  it('should allow disabling the component', () => {
    const wrapper = mount(<Select onChange={noop} disabled />)
    assert(wrapper.find('.mdc-Select-input').props().disabled)
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-listItem').length, 0)
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
    assert.equal(wrapper.find('.mdc-Select-body').text(), 'Dog')
  })

  it('should render a label', () => {
    const wrapper = mount(<Select label='Animals' onChange={noop} />)
    assert.equal(wrapper.find('.mdc-Select-label').text(), 'Animals')
  })

  it('should open the list when clicked', () => {
    const wrapper = mount(<Select onChange={noop} />)
    wrapper.find('.mdc-Select-body').simulate('click')
    assert(wrapper.find('.mdc-Select-list'))
  })

  it('should close the list when it is open and click outside happenend', () => {
    const wrapper = mount(<Select onChange={noop} />)
    // open list
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-list').length, 1)
    // simulate click somewhere
    var event = new window.MouseEvent('click')
    document.dispatchEvent(event)
    // make sure list is closed
    wrapper.update()
    assert.equal(wrapper.find('.mdc-Select-list').length, 0)
  })

  it('should again open the list when it is opened', () => {
    const wrapper = mount(<Select onChange={noop} />)
    // open list
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-list').length, 1)
    // open again list
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-list').length, 1)
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
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-list').length, 1)
    // click on list item
    wrapper.find('.mdc-Select-listItem').at(1).simulate('click')
    var event = new window.MouseEvent('click')
    document.dispatchEvent(event)
    // make sure list is closed
    wrapper.update()
    assert.equal(wrapper.find('.mdc-Select-list').length, 0)
  })

  it('should render the list directly', () => {
    const wrapper = mount(
      <List
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
        selectedIndex={1}
        onClick={noop}
        refWrapper={refWrapper}
      />
    )
    assert.equal(wrapper.find('.mdc-Select-list').instance().style.top, `${initState.top - 28}px`)
  })

  it('should render a list item always in the middle of the list when list is too large', () => {
    const wrapper = mount(
      <List
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
        selectedIndex={6}
        onClick={noop}
        refWrapper={refWrapper}
      />
    )
    assert.equal(wrapper.find('.mdc-Select-list').instance().style.top, `${initState.top - 76}px`)
  })

  it('should not show the second last item in the center of the list', () => {
    const wrapper = mount(
      <List
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
        selectedIndex={7}
        onClick={noop}
        refWrapper={refWrapper}
      />
    )
    assert.equal(wrapper.find('.mdc-Select-list').instance().style.top, `${initState.top - 124}px`)
  })

  it('should show the last item at the end of the list', () => {
    const wrapper = mount(
      <List
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
        selectedIndex={8}
        onClick={noop}
        refWrapper={refWrapper}
      />
    )
    assert.equal(wrapper.find('.mdc-Select-list').instance().style.top, `${initState.top - 172}px`)
  })

  it('should render the Select inside a table', () => {
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
    assert.equal(wrapper.find(Select).length, 1)
  })

  it('should change its position top when inside a table', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <td>
              <List
                isInsideTable
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
                selectedIndex={8}
                onClick={noop}
                refWrapper={refWrapper}
              />
            </td>
          </tr>
        </tbody>
      </table>
    )
    assert.equal(wrapper.find('.mdc-Select-list').instance().style.top, `${initState.top - 216}px`)
  })

  it('should render the list at the top', () => {
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
    wrapper.setState({
      top: 50,
      left: 10,
      width: 100
    })
    // open list
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-list').instance().style.top, '0px')
  })

  it('should handle window resize events', () => {
    const wrapper = mount(
      <List
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
        selectedIndex={8}
        onClick={noop}
        refWrapper={refWrapper}
      />
    )
    assert.equal(wrapper.props().refWrapper.getBoundingClientRect().width, 100)
    const changeSize = {
      getBoundingClientRect: () => ({
        top: 50,
        left: 10,
        width: 10
      })
    }
    wrapper.setProps({refWrapper: changeSize})
    const event = new window.Event('resize')
    window.dispatchEvent(event)

    assert.equal(wrapper.find('.mdc-Select-list').instance().style.width, '26px')
  })

  it('should scroll down on arrow down', done => {
    const onChange = ({target}) => {
      assert.equal(target.value, 'rabbit')
      assert.equal(target.label, 'Rabbit')
      done()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
      />
    )
    wrapper.find('.mdc-Select-body').simulate('click')
    wrapper.find('.mdc-Select-listItem').at(0).simulate('keydown', {
      which: keycode('down')
    })
    wrapper.find('.mdc-Select-listItem').at(1).simulate('keydown', {
      which: keycode('enter')
    })
  })

  it('should scroll up on arrow up', done => {
    const onChange = ({target}) => {
      assert.equal(target.value, 'fox')
      assert.equal(target.label, 'Fox')
      done()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
      />
    )
    wrapper.find('.mdc-Select-body').simulate('click')
    wrapper.find('.mdc-Select-listItem').at(1).simulate('keydown', {
      which: keycode('up')
    })
    wrapper.find('.mdc-Select-listItem').at(0).simulate('keydown', {
      which: keycode('enter')
    })
  })

  it('should find on keydown', done => {
    const onChange = ({target}) => {
      assert.equal(target.value, 'dog')
      assert.equal(target.label, 'Dog')
      done()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
      />
    )
    wrapper.find('.mdc-Select-body').simulate('click')
    wrapper.find('.mdc-Select-listItem').at(0).simulate('keydown', {
      key: 'o'
    })
    wrapper.find('.mdc-Select-listItem').at(0).simulate('keydown', {
      key: 'o'
    })
    wrapper.find('.mdc-Select-listItem').at(2).simulate('keydown', {
      which: keycode('enter')
    })
  })

  it('should close the list on blur', () => {
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={noop}
      />
    )
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-listItem').length, 3)
    wrapper.find('.mdc-Select-listItem').at(0).simulate('blur', {
      relatedTarget: document.createElement('div')
    })
    assert.equal(wrapper.find('.mdc-Select-listItem').length, 0)
  })

  it('should close the list on escape', () => {
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={noop}
      />
    )
    wrapper.find('.mdc-Select-body').simulate('click')
    assert.equal(wrapper.find('.mdc-Select-listItem').length, 3)
    wrapper.find('.mdc-Select-listItem').at(0).simulate('keydown', {
      which: keycode('escape')
    })
    assert.equal(wrapper.find('.mdc-Select-listItem').length, 0)
  })

  it('should open the list on space', () => {
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={noop}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('space')
    })
    assert.equal(wrapper.find('.mdc-Select-listItem').length, 3)
  })

  it('should open the list on enter', () => {
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={noop}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('enter')
    })
    assert.equal(wrapper.find('.mdc-Select-listItem').length, 3)
  })

  it('should toggle through the values on key down when list is closed', done => {
    const onChange = ({target}) => {
      assert.equal(target.value, 'fox')
      assert.equal(target.label, 'Fox')
      done()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('down')
    })
  })

  it('should toggle through the values on key right when list is closed', done => {
    const onChange = ({target}) => {
      assert.equal(target.value, 'fox')
      assert.equal(target.label, 'Fox')
      done()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('right')
    })
  })

  it('should find on "Dog" when the list is closed', done => {
    const onChange = ({target}) => {
      assert.equal(target.value, 'dog')
      assert.equal(target.label, 'Dog')
      done()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('d'),
      key: 'd'
    })
  })

  it('should custom findIndex', done => {
    const propOptions = [
      {value: 'fox', label: 'Fox'},
      {value: 'rabbit', label: 'Rabbit'},
      {value: 'dog', label: 'Dog'}
    ]
    const findIndex = (options, filterValue, startIndex) => {
      assert.deepEqual(propOptions, options)
      assert.equal(filterValue, 'd')
      assert.equal(startIndex, -1)
      done()
    }
    const wrapper = mount(
      <Select
        options={propOptions}
        findIndex={findIndex}
        onChange={noop}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      key: 'd'
    })
  })

  it('should toggle through the values on key up when list is closed', done => {
    const onChange = ({target}) => {
      assert.equal(target.value, 'fox')
      assert.equal(target.label, 'Fox')
      done()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
        value={'rabbit'}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('up')
    })
  })

  it('should toggle through the values on key left when list is closed', done => {
    const onChange = ({target}) => {
      assert.equal(target.value, 'fox')
      assert.equal(target.label, 'Fox')
      done()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
        value={'rabbit'}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('left')
    })
  })

  it('should toggle through the values on key up/left when list is closed without cycling', () => {
    const onChange = () => {
      assert.fail()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
        value={'fox'}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('left')
    })
  })

  it('should toggle through the values on key down/right when list is closed without cycling', () => {
    const onChange = () => {
      assert.fail()
    }
    const wrapper = mount(
      <Select
        options={[
          {value: 'fox', label: 'Fox'},
          {value: 'rabbit', label: 'Rabbit'},
          {value: 'dog', label: 'Dog'}
        ]}
        onChange={onChange}
        value={'dog'}
      />
    )
    wrapper.find('.mdc-Select-input').simulate('keydown', {
      which: keycode('down')
    })
  })
})
