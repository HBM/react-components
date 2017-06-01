/* global describe, it */

import assert from 'assert'
import React from 'react'
import {shallow} from 'enzyme'
import {Card, Title} from '../'

describe('Card', () => {
  it('should work', () => {
    const wrapper = shallow(<Card />)
    assert.equal(wrapper.find('.mdc-Card').length, 1)
  })

  it('should render the title', () => {
    const wrapper = shallow(<Title>some title</Title>)
    assert.equal(wrapper.find('.mdc-Card-title').text(), 'some title')
  })

  it('should pass down className prop', () => {
    const wrapper = shallow(<Card className='foo' />)
    assert.equal(wrapper.find('.mdc-Card.foo').length, 1)
  })
})
