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
    assert.equal(wrapper.find('.mdc-Table-footer-rowsPerPage').text(), 'Rows per page:')
    assert.equal(wrapper.find('.mdc-Table-footer-xOfY').text(), '1-5 of 10')
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
    assert.equal(wrapper.find('.mdc-Select-body').text(), '50')
  })

  it('should call back on changing rows count per page', (done) => {
    const onChangeRowsPerPage = () => done()
    const footer = <TableFooter
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
    const wrapper = mount(footer)
    // tests from select component
    // open list
    wrapper.find('.mdc-Select-body').simulate('click')
    // click on list item to trigger change event
    wrapper.find('.mdc-Select-listItem').at(1).simulate('click')
  })

  it('should show an edit icon when set to editable', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell editable onChange={() => {}}>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    assert(wrapper.find('.mdc-Table-edit-icon'))
  })

  it('should show an overlay when editable cell is clicked', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell textfield={<input type='text' />}>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.mdc-Table-body-row-cell-edit-wrapper').simulate('click')
    assert(wrapper.find('.mdc-Table-edit'))
  })

  it('should return the new value on change', (done) => {
    const onChange = (event) => {
      assert.equal(event.target.value, 'beep bopp')
      done()
    }
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell textfield={<input className='mdc-Textfield-input' type='text' onChange={onChange} />}>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.mdc-Table-body-row-cell-edit-wrapper').simulate('click')
    // enter some new text
    wrapper.find('.mdc-Textfield-input').simulate('change', {
      target: {
        value: 'beep bopp'
      }
    })
  })

  it('should hide the overlay when escape is pressed', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell textfield={<input />}>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.mdc-Table-body-row-cell-edit-wrapper').simulate('click')
    // simulate esc key
    document.dispatchEvent(new window.KeyboardEvent('keyup', {
      which: 27
    }))
    // make sure overlay isn't visible anymore
    assert.equal(wrapper.find('.mdc-Table-edit').length, 0)
  })

  it('should hide the overlay when mouse click happened outside of edit dialog', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell textfield={<input />}>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.mdc-Table-body-row-cell-edit-wrapper').simulate('click')
    // simulate click outside of component
    document.dispatchEvent(new window.Event('click'))
    // make sure overlay isn't visible anymore
    assert.equal(wrapper.find('.mdc-Table-edit').length, 0)
  })

  it('should hide the overlay when enter key is pressed', () => {
    const table = (
      <table>
        <tbody>
          <tr>
            <TableBodyCell textfield={<input />}>
              hello world
            </TableBodyCell>
          </tr>
        </tbody>
      </table>
    )
    const wrapper = mount(table)
    wrapper.find('.mdc-Table-body-row-cell-edit-wrapper').simulate('click')
    // simulate enter key
    wrapper.find('.mdc-Table-edit-container').simulate('submit')
    // make sure overlay isn't visible anymore
    assert.equal(wrapper.find('.mdc-Table-edit').length, 0)
  })
})
