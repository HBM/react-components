/* global describe, it */

import assert from 'assert'
import React from 'react'
import {shallow} from 'enzyme'
import Header from '../'

describe('Header', () => {
  it('should have a title', () => {
    const wrapper = shallow(<Header title='some title' />)
    assert.equal(wrapper.find('.mdc-Header-title').text(), 'some title')
  })

  it('should render some content', () => {
    const wrapper = shallow(
      <Header>
        <span>One</span>
        <span>Two</span>
      </Header>
    )
    assert.equal(wrapper.text(), 'OneTwo')
  })

  it('should have a subtitle', () => {
    const wrapper = shallow(<Header title='some title' subtitle='some subtitle' />)
    assert(wrapper.find('.mdc-Header-subtitle').text().includes('some subtitle'))
  })
})
