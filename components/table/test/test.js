/* global describe, it */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import Table from '../'

describe('Table', () => {
  it('should render the header row', () => {
    const head = ['one', 'two', 'three']
    const wrapper = mount(<Table head={head} body={[]} />)
    assert.equal(wrapper.find('th').length, 3)
  })

  it('should render the header row with given alignment', () => {
    const head = ['one', 'two', {text: 'three', align: Table.Align.Left}]
    const wrapper = mount(<Table head={head} body={[]} />)
    assert.equal(wrapper.find('.Table-head-row-cell--align-left').text(), 'three')
  })

  it('should render the header row with sort arrow icon', () => {
    const head = ['one', 'two', {text: 'three', sorted: Table.Sort.Descending}]
    const wrapper = mount(<Table head={head} body={[]} />)
    assert.equal(wrapper.find('.Table-head-row-cell-sorter').length, 1)
  })

  it('should call back on click on sortable column', (done) => {
    const head = ['one', 'two', {text: 'three', sorted: Table.Sort.Descending}]
    const onSortClick = () => done()
    const wrapper = mount(<Table head={head} body={[]} onSortClick={onSortClick} />)
    wrapper.find('.Table-head-row-cell-sorter').simulate('click')
  })

  it('should render the table body', () => {
    const body = [['one'], ['two'], ['three']]
    const wrapper = mount(<Table head={[]} body={body} />)
    assert.equal(wrapper.find('td').length, 3)
  })

  it('should show navigation controls in the footer', () => {
    const body = [['one'], ['two'], ['three']]
    const footer = {
      labelRowsPerPage: 'Rows per page:',
      labelXOfY: '1-5 of 10'
    }
    const wrapper = mount(<Table head={[]} body={body} footer={footer} />)
    assert.equal(wrapper.find('.Table-footer-rowsPerPage').text(), 'Rows per page:')
    assert.equal(wrapper.find('.Table-footer-xOfY').text(), '1-5 of 10')
  })

  it('should call back on paginate left', (done) => {
    const body = [['one'], ['two'], ['three']]
    const onPaginateLeft = () => done()
    const footer = {onPaginateLeft}
    const wrapper = mount(<Table head={[]} body={body} footer={footer} />)
    assert.equal(wrapper.find('.IconButton').at(0).simulate('click'))
  })

  it('should call back on paginate right', (done) => {
    const body = [['one'], ['two'], ['three']]
    const onPaginateRight = () => done()
    const footer = {onPaginateRight}
    const wrapper = mount(<Table head={[]} body={body} footer={footer} />)
    assert.equal(wrapper.find('.IconButton').at(1).simulate('click'))
  })

  it('should display the selected number of visible rows', () => {
    const body = [['one'], ['two'], ['three']]
    const footer = {
      possibleRowsPerPage: [5, 10, 20, 50],
      rowsPerPageIndex: 3
    }
    const wrapper = mount(<Table head={[]} body={body} footer={footer} />)
    assert.equal(wrapper.find('.Select-body').text(), '50')
  })

  it('should call back on changing rows count per page', (done) => {
    const body = [['one'], ['two'], ['three']]
    const onChangeRowsPerPage = () => done()
    const footer = {onChangeRowsPerPage}
    const wrapper = mount(<Table head={[]} body={body} footer={footer} />)
    // tests from select component
    // open list
    wrapper.find('.Select-body').simulate('click')
    // click on list item to trigger change event
    wrapper.find('.Select-listItemLink').at(1).simulate('click')
  })
})
