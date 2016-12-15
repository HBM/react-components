
import React from 'react'
import classnames from 'classnames'
import Icon from '../icon/'
import Select from '../select/'

export const Table = ({children, className, ...rest}) => (
  <table className='Table'>
    {children}
  </table>
)

export const TableHead = ({children, className, ...rest}) => (
  <thead className={classnames('Table-head')}>
    {children}
  </thead>
)

export const TableHeadRow = ({children, className, ...rest}) => (
  <tr className={classnames('Table-head-row', className)} {...rest}>
    {children}
  </tr>
)

// Arrow component is not exported and used internally for sorted columns.
const Arrow = ({sorted}) => (
  <Icon.ArrowUpward
    width={16}
    height={16}
    className={classnames('Table-head-row-cell-button-arrow', {
      'Table-head-row-cell-button-arrow--descending': sorted === 'desc',
      'Table-head-row-cell-button-arrow--ascending': sorted === 'asc'
    })}
  />
)

export const TableHeadCell = ({children, className, sorted, onClick, ...rest}) => (
  <th className={classnames('Table-head-row-cell', className)} {...rest}>
    {sorted
      ? (
        <button className='Table-head-row-cell-button' onClick={onClick}>
          <Arrow sorted={sorted} />
          {children}
        </button>
      ) : (
        children
      )
    }
  </th>
)

export const TableBody = ({children, className, ...rest}) => (
  <tbody className={classnames('Table-body', className)} {...rest}>
    {children}
  </tbody>
)

export const TableBodyRow = ({children, className, ...rest}) => (
  <tr className={classnames('Table-body-row', className)} {...rest}>
    {children}
  </tr>
)

export const TableBodyCell = ({children, className, ...rest}) => (
  <td className={classnames('Table-body-row-cell', className)} {...rest}>
    {children}
  </td>
)

export const TableFooter = (props) => (
  <div className='Table-footer'>
    <span className='Table-footer-rowsPerPage'>
      {props.labelRowsPerPage}
    </span>
    <Select
      items={props.possibleRowsPerPage}
      onChange={props.onChangeRowsPerPage}
      selectedIndex={props.rowsPerPageIndex}
    />
    <span className='Table-footer-xOfY'>
      {props.labelXOfY}
    </span>
    <Icon.Button onClick={props.onPaginateLeft}>
      <Icon.ChevronLeft fill='rgba(0, 0, 0, 0.54)' />
    </Icon.Button>
    <Icon.Button onClick={props.onPaginateRight}>
      <Icon.ChevronRight fill='rgba(0, 0, 0, 0.54)' />
    </Icon.Button>
  </div>
)
