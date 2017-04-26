
import React from 'react'
import classnames from 'classnames'
import {Button, Edit, ArrowUpward, ChevronLeft, ChevronRight} from '../icon/'
import Select from '../select/'
import keycode from 'keycode'

// internal helper component
class EditDialog extends React.Component {
  onSubmit = (event) => {
    event.preventDefault()
    this.props.onClose()
  }

  onKeyUp = (event) => {
    if (event.which === keycode('escape')) {
      this.props.onClose()
    }
  }

  onClick = (event) => {
    // make sure click happened outside of component
    const element = this.c
    // https://github.com/tj/react-click-outside/blob/master/index.js#L25
    if (!element.contains(event.target)) {
      this.props.onClose()
    }
  }

  componentDidMount = () => {
    document.addEventListener('click', this.onClick)
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.onClick)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  render () {
    return (
      <div className='Table-edit' ref={c => { this.c = c }}>
        <form onSubmit={this.onSubmit} className='Table-edit-container'>
          {this.props.children}
        </form>
      </div>
    )
  }
}

export const Table = ({children, className, ...rest}) => (
  <table className='Table' {...rest}>
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
  <ArrowUpward
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

export class TableBodyCell extends React.Component {
  state = {
    isEditing: false
  }

  show = () => {
    this.setState({
      isEditing: true
    })
  }

  hide = () => {
    this.setState({
      isEditing: false
    })
  }

  render () {
    const {children, className, textfield, ...rest} = this.props
    return (
      <td className={classnames('Table-body-row-cell', className)} {...rest}>
        {this.state.isEditing
          ? <EditDialog onClose={this.hide}>{textfield}</EditDialog>
          : null
        }
        { textfield
          ? <div className='Table-body-row-cell-edit-wrapper' onClick={this.show}>
            {children}
            <Edit
              className='Table-edit-icon'
              width={18}
              height={18}
              fill='rgba(0, 0, 0, 0.54)'
            />
          </div>
          : children
        }
      </td>
    )
  }
}

export const TableFooter = (props) => (
  <div className='Table-footer'>
    <span className='Table-footer-rowsPerPage'>
      {props.labelRowsPerPage}
    </span>
    <Select
      options={props.possibleRowsPerPage}
      onChange={props.onChangeRowsPerPage}
      value={props.rowsPerPageIndex}
    />
    <span className='Table-footer-xOfY'>
      {props.labelXOfY}
    </span>
    <Button onClick={props.onPaginateLeft}>
      <ChevronLeft fill='rgba(0, 0, 0, 0.54)' />
    </Button>
    <Button onClick={props.onPaginateRight}>
      <ChevronRight fill='rgba(0, 0, 0, 0.54)' />
    </Button>
  </div>
)
