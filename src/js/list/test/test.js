/* global describe, it */

import assert from 'assert'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { List, Row } from '../'
import {MemoryRouter} from 'react-router-dom'

describe('List', () => {
  it('should work', () => {
    const wrapper = shallow(<List />)
    assert.equal(wrapper.find('.List').length, 1)
  })

  it('should render the child Rows', () => {
    const wrapper = mount(
      <List>
        <Row primary='A' />
        <Row primary='B' />
      </List>)
    assert.equal(wrapper.find('.List-row').length, 2)
  })

  it('should render as <ol> <li> when no link is present', () => {
    const wrapper = mount(
      <List>
        <Row primary='A' />
        <Row primary='B' />
      </List>)
    assert.equal(wrapper.find('ol').length, 1)
    assert.equal(wrapper.find('li.List-row').length, 2)
  })

  it('should render as <div> <a> when rows have linkTo prop', () => {
    const wrapper = mount(
      <MemoryRouter>
        <List>
          <Row primary='A' linkTo='foo' />
          <Row primary='B' linkTo='bar' />
        </List>
      </MemoryRouter>
    )
    assert.equal(wrapper.find('div.List').length, 1)
    assert.equal(wrapper.find('a.List-row.List-row--islink').length, 2)
  })

  describe('Row', () => {
    it('should render "primary"', () => {
      const wrapper = shallow(<Row primary='ABC' />)
      assert.equal(wrapper.find('.List-row-text-primary').text(), 'ABC')
    })

    it('should render "secondary"', () => {
      const wrapper = shallow(<Row primary='ABC' secondary='ppp' />)
      assert.equal(wrapper.find('.List-row-text-secondary').first().text(), 'ppp')
      assert.equal(wrapper.find('.List-row--twoline').length, 1)
    })

    it('should render "secondary" and "subheader"', () => {
      const wrapper = shallow(<Row primary='ABC' subheader='asd' secondary='ppp' />)
      assert.equal(wrapper.find('.List-row-text-secondary').first().text(), 'ppp')
      assert.equal(wrapper.find('.List-row-text-subheader').text(), 'asd')
      assert.equal(wrapper.find('.List-row--threeline').length, 1)
    })

    it('should render "avatar" with url', () => {
      const wrapper = shallow(<Row primary='ABC' avatar='http://foo.com/image.jpg' />)
      assert.equal(wrapper.find('.List-row-avatar img').prop('src'), 'http://foo.com/image.jpg')
    })

    it('should render "avatar" with element', () => {
      const wrapper = shallow(<Row primary='ABC' avatar={<div x='foo' />} />)
      assert.equal(wrapper.find('.List-row-avatar > div').prop('x'), 'foo')
    })

    it('should render "icon" left', () => {
      const dummy = <div x='foo' />
      const wrapper = shallow(
        <Row primary='ABC' icon={dummy} />
      )
      assert.equal(wrapper.find('.List-row-icon-left > div').prop('x'), 'foo')
    })

    it('should render "avatar" with url and "icon" right', () => {
      const dummy = <div x='foo' />
      const wrapper = shallow(<Row primary='ABC' avatar='http://foo.com/image.jpg' icon={dummy} />)
      assert.equal(wrapper.find('.List-row-avatar img').prop('src'), 'http://foo.com/image.jpg')
      assert.equal(wrapper.find('.List-row-icon-right > div').prop('x'), 'foo')
    })

    it('calls onClick', (done) => {
      const onClick = () => {
        done()
      }
      const wrapper = shallow(<Row primary='ABC' onClick={onClick} />)
      wrapper.simulate('click')
    })
  })
})
