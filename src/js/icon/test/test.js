/* global describe, it */

import assert from 'assert'
import React from 'react'
import {AlarmOff, Button} from '../'
import {shallow} from 'enzyme'

describe('Icon', () => {
  it('should render AlarmOff', () => {
    const wrapper = shallow(<AlarmOff />)
    assert(wrapper.find('svg'))
  })

  it('should render icon button', () => {
    const onClick = () => {}
    const wrapper = shallow(
      <Button onClick={onClick}>
        <AlarmOff />
      </Button>
    )
    assert(wrapper.find('.IconButton'))
  })

  it('should bubble up button onclick event', (done) => {
    const onClick = () => done()
    const wrapper = shallow(
      <Button onClick={onClick}>
        <AlarmOff />
      </Button>
    )
    wrapper.find('.IconButton').simulate('click')
  })
})
