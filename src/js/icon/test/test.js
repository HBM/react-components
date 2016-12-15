/* global describe, it */

import assert from 'assert'
import React from 'react'
import Icon from '../'
import {shallow} from 'enzyme'

describe('Icon', () => {
  it('should render Icon.AlarmOff', () => {
    const wrapper = shallow(<Icon.AlarmOff />)
    assert(wrapper.find('svg'))
  })

  it('should render icon button', () => {
    const onClick = () => {}
    const wrapper = shallow(
      <Icon.Button onClick={onClick}>
        <Icon.Person />
      </Icon.Button>
    )
    assert(wrapper.find('.IconButton'))
  })

  it('should bubble up button onclick event', (done) => {
    const onClick = () => done()
    const wrapper = shallow(
      <Icon.Button onClick={onClick}>
        <Icon.Person />
      </Icon.Button>
    )
    wrapper.find('.IconButton').simulate('click')
  })
})
