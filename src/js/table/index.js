
import React from 'react'
import classnames from 'classnames'
import Icon from '../icon/'
import Select from '../select/'
import {Textfield} from '../textfield/'
import keycode from 'keycode'

// internal helper component
class EditDialog extends React.Component {

  state = {
    value: this.props.value
  }

  onChange = (event) => {
    const {value} = event.target
    this.setState({value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSubmit(this.state.value)
  }

  onKeyUp = (event) => {
    // hide box on escape key
    if (event.which === keycode('escape')) {
      this.props.onCancel()
    }
  }

  onClick = (event) => {
    // make sure click happened outside of component
    const element = this.c
    // https://github.com/tj/react-click-outside/blob/master/index.js#L25
    if (!element.contains(event.target)) {
      this.props.onCancel()
    }
  }

  componentDidMount = () => {
    document.addEventListener('click', this.onClick)
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.onClick)
  }

  render () {
    return (
      <div className='Table-edit' ref={c => { this.c = c }}>
        <form onSubmit={this.onSubmit} className='Table-edit-container'>
          <Textfield
            onChange={this.onChange}
            value={this.state.value}
            onKeyUp={this.onKeyUp}
          />
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

  onSubmit = (value) => {
    this.hide()
    this.props.onSubmit(value)
  }

  render () {
    const {children, className, editable, ...rest} = this.props
    return (
      <td className={classnames('Table-body-row-cell', className)} {...rest}>
        {this.state.isEditing
          ? <EditDialog onSubmit={this.onSubmit} onCancel={this.hide} value={children} />
          : null
        }
        { editable
          ? <div className='Table-body-row-cell-edit-wrapper' onClick={this.show}>
            {children}
            <Icon.Edit
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
