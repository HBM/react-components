/* global describe, it */

import assert from 'assert'
import React from 'react'
import {mount} from 'enzyme'
import {
  Table,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
  TableFooter
} from '../'

describe('Table', () => {
  it('should render the table component with children', () => {
    const table = (
      <Table>
        hello world
      </Table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table head component with children', () => {
    const table = (
      <TableHead>
        hello world
      </TableHead>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table head row component with children', () => {
    const table = (
      <TableHeadRow>
        hello world
      </TableHeadRow>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table head cell component with children', () => {
    const table = (
      <TableHeadCell>
        hello world
      </TableHeadCell>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should the table head cell component with a clickable button and arrow icon', (done) => {
    const table = (
      <TableHeadCell sorted='desc' onClick={() => done()}>
        hello world
      </TableHeadCell>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
    wrapper.find('button').simulate('click')
  })

  it('should render the table body component with children', () => {
    const table = (
      <TableBody>
        hello world
      </TableBody>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table body row component with children', () => {
    const table = (
      <TableBodyRow>
        hello world
      </TableBodyRow>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table body row component with children', () => {
    const table = (
      <TableBodyCell>
        hello world
      </TableBodyCell>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should show navigation controls in the footer', () => {
    const footer = <TableFooter
      labelRowsPerPage='Rows per page:'
      labelXOfY='1-5 of 10'
    />
    const wrapper = mount(footer)
    assert.equal(wrapper.find('.Table-footer-rowsPerPage').text(), 'Rows per page:')
    assert.equal(wrapper.find('.Table-footer-xOfY').text(), '1-5 of 10')
  })

  it('should call back on paginate left', (done) => {
    const onPaginateLeft = () => done()
    const footer = <TableFooter
      labelRowsPerPage='Rows per page:'
      labelXOfY='1-5 of 10'
      onPaginateLeft={onPaginateLeft}
    />
    const wrapper = mount(footer)
    assert.equal(wrapper.find('.IconButton').at(0).simulate('click'))
  })

  it('should call back on paginate right', (done) => {
    const onPaginateRight = () => done()
    const footer = <TableFooter
      labelRowsPerPage='Rows per page:'
      labelXOfY='1-5 of 10'
      onPaginateRight={onPaginateRight}
    />
    const wrapper = mount(footer)
    assert.equal(wrapper.find('.IconButton').at(1).simulate('click'))
  })

  it('should display the selected number of visible rows', () => {
    const footer = <TableFooter
      possibleRowsPerPage={[5, 10, 20, 50]}
      rowsPerPageIndex={3}
    />
    const wrapper = mount(footer)
    assert.equal(wrapper.find('.Select-body').text(), '50')
  })

  it('should call back on changing rows count per page', (done) => {
    const onChangeRowsPerPage = () => done()
    const footer = <TableFooter
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
    const wrapper = mount(footer)
    // tests from select component
    // open list
    wrapper.find('.Select-body').simulate('click')
    // click on list item to trigger change event
    wrapper.find('.Select-listItemLink').at(1).simulate('click')
  })
})
