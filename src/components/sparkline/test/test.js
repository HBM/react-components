/* global describe, it */

import assert from 'assert'
import React from 'react'
import {shallow} from 'enzyme'
import Sparkline from '../'

describe('Sparkline', () => {
  it('should work', () => {
    const wrapper = shallow(<Sparkline />)
    assert.equal(wrapper.find('canvas').length, 1)
  })
})
