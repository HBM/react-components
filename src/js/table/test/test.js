/* global describe, it, Event */

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
        <tbody>
          <tr>
            <td>
              hello world
            </td>
          </tr>
        </tbody>
      </Table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table head component with children', () => {
    const table = (
      <table>
        <TableHead>
          <tr>
            <th>
              hello world
            </th>
          </tr>
        </TableHead>
      </table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table head row component with children', () => {
    const table = (
      <table>
        <thead>
          <TableHeadRow>
            <th>
              hello world
            </th>
          </TableHeadRow>
        </thead>
      </table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table head cell component with children', () => {
    const table = (
      <table>
        <thead>
          <tr>
            <TableHeadCell>
              hello world
            </TableHeadCell>
          </tr>
        </thead>
      </table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should the table head cell component with a clickable button and arrow icon', (done) => {
    const table = (
      <table>
        <thead>
          <tr>
            <TableHeadCell sorted='desc' onClick={() => done()}>
              hello world
            </TableHeadCell>
          </tr>
        </thead>
      </table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
    wrapper.find('button').simulate('click')
  })

  it('should render the table body component with children', () => {
    const table = (
      <table>
        <TableBody>
          <tr>
            <td>
              hello world
            </td>
          </tr>
        </TableBody>
      </table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table body row component with children', () => {
    const table = (
      <table>
        <tbody>
          <TableBodyRow>
            <td>
              hello world
            </td>
          </TableBodyRow>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should render the table body row component with children', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    assert.equal(wrapper.text(), 'hello world')
  })

  it('should show navigation controls in the footer', () => {
    const footer = <TableFooter
      labelRowsPerPage='Rows per page:'
      labelXOfY='1-5 of 10'
      onChangeRowsPerPage={() => {}}
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
      onChangeRowsPerPage={() => {}}
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
      onChangeRowsPerPage={() => {}}
    />
    const wrapper = mount(footer)
    assert.equal(wrapper.find('.IconButton').at(1).simulate('click'))
  })

  it('should display the selected number of visible rows', () => {
    const footer = <TableFooter
      possibleRowsPerPage={[
        {value: 0, label: 5},
        {value: 1, label: 10},
        {value: 2, label: 20},
        {value: 3, label: 50}
      ]}
      rowsPerPageIndex={3}
      onChangeRowsPerPage={() => {}}
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

  it('should show an edit icon when set to editable', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell editable>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    assert(wrapper.find('.Table-edit-icon'))
  })

  it('should show an overlay when editable cell is clicked', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell editable>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.Table-body-row-cell-edit-wrapper').simulate('click')
    assert(wrapper.find('.Table-edit'))
  })

  it('should return the new value when enter is pressed', (done) => {
    const onSubmit = (value) => {
      assert.equal(value, 'beep bopp')
      done()
    }
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell editable onSubmit={onSubmit}>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.Table-body-row-cell-edit-wrapper').simulate('click')
    // enter some new text
    wrapper.find('.Textfield-input').simulate('change', {
      target: {
        value: 'beep bopp'
      }
    })
    // simulate submit
    wrapper.find('.Table-edit-container').simulate('submit')
  })

  it('should cancel when escape is pressed', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell editable>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.Table-body-row-cell-edit-wrapper').simulate('click')
    // enter some new text
    wrapper.find('.Textfield-input').simulate('change', {
      target: {
        value: 'beep bopp'
      }
    })
    // simulate esc key
    wrapper.find('.Textfield-input').simulate('keyup', {
      which: 27
    })
    // make sure old value is still present
    assert.equal(wrapper.find('.Table-body-row-cell-edit-wrapper').text(), 'hello world')
    // make sure overlay isn't visible anymore
    assert.equal(wrapper.find('.Table-edit').length, 0)
  })

  it('should cancel when mouse click happened outside of edit dialog', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell editable>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.Table-body-row-cell-edit-wrapper').simulate('click')
    // enter some new text
    wrapper.find('.Textfield-input').simulate('change', {
      target: {
        value: 'beep bopp'
      }
    })
    // simulate click outside of component
    document.dispatchEvent(new Event('click'))
    // make sure old value is still present
    assert.equal(wrapper.find('.Table-body-row-cell-edit-wrapper').text(), 'hello world')
    // make sure overlay isn't visible anymore
    assert.equal(wrapper.find('.Table-edit').length, 0)
  })
})
