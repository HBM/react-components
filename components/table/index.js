
import React from 'react'
import classnames from 'classnames'
import {Icon, Select} from '../../'

const Left = 'left'
const Right = 'right'
const Ascending = 'ascending'
const Descending = 'descending'

const Arrow = ({sorted}) => (
  <Icon.ArrowUpward
    width={16}
    height={16}
    className={classnames('Table-head-row-cell-sorter-arrow', {
      'Table-head-row-cell-sorter-arrow--descending': sorted === Descending,
      'Table-head-row-cell-sorter-arrow--ascending': sorted === Ascending
    })}
  />
)

const Table = ({head = [], onSortClick, body, footer}) => (
  <div>
    <table className='Table'>
      <thead className='Table-head'>
        <tr className='Table-head-row'>
          {head.map((cell, i) => (
            <th
              key={i}
              className={classnames('Table-head-row-cell', {
                'Table-head-row-cell--align-left': cell.align === Left,
                // default case when no alignment is given
                'Table-head-row-cell--align-right': !cell.align
              })}
            >
              { cell.sorted
                ? <div className='Table-head-row-cell-sorter' onClick={() => onSortClick(i)}>
                  <Arrow sorted={cell.sorted} />{cell.text || cell}
                </div>
                : cell.text || cell
              }
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='Table-body'>
        {body.map((row, i) => (
          <tr key={i} className='Table-body-row'>
            {row.map((cell, j) => (
              <td key={j} className={classnames('Table-body-row-cell', {
                'Table-body-row-cell--align-left': cell.align === Left,
                // default case when no alignment is given
                'Table-body-row-cell--align-right': !cell.align
              })}>
                {cell.text || cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {footer ? (
      <div className='Table-footer'>
        <span className='Table-footer-rowsPerPage'>
          {footer.labelRowsPerPage}
        </span>
        <Select
          items={footer.possibleRowsPerPage}
          onChange={footer.onChangeRowsPerPage}
          selectedIndex={footer.rowsPerPageIndex}
        />
        <span className='Table-footer-xOfY'>
          {footer.labelXOfY}
        </span>
        <Icon.Button onClick={footer.onPaginateLeft}>
          <Icon.ChevronLeft fill='rgba(0, 0, 0, 0.54)' />
        </Icon.Button>
        <Icon.Button onClick={footer.onPaginateRight}>
          <Icon.ChevronRight fill='rgba(0, 0, 0, 0.54)' />
        </Icon.Button>
      </div>
    ) : null}
  </div>
)

Table.Align = {Left, Right}
Table.Sort = {Ascending, Descending}

export default Table
