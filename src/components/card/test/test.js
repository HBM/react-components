/* global describe, it */

import assert from 'assert'
import React from 'react'
import {shallow} from 'enzyme'
import {Card, Title} from '../'

describe('Card', () => {
  it('should work', () => {
    const wrapper = shallow(<Card />)
    assert.equal(wrapper.find('.Card').length, 1)
  })

  it('should render the title', () => {
    const wrapper = shallow(<Title>some title</Title>)
    assert.equal(wrapper.find('.Card-title').text(), 'some title')
  })
})
