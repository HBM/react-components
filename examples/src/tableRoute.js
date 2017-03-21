
import React from 'react'
import {
  Table,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
  TableFooter,
  Select,
  Textfield
} from '../../lib'

export default class TableRoute extends React.Component {
  state = {
    head: [
      'Dessert (100g serving)',
      'Calories',
      'Fat (g)',
      'Carbs (g)',
      'Protein (g)',
      'Sodium (g)',
      'Calcium (%)'
    ],
    simple: [
      ['Frozen yogurt', 159, 6.0, 24, 4.0, 87, '14%'],
      ['Ice cream sandwich', 237, 9.0, 37, 4.3, 129, '8%'],
      ['Eclair', 262, 16.0, 24, 6.0, 337, '6%'],
      ['Cupcake', 305, 3.7, 67, 4.3, 413, '3%'],
      ['Gingerbread', 356, 16.0, 49, 3.9, 327, '7%'],
      ['Jelly bean', 375, 0.0, 94, 0.0, 50, '0%'],
      ['Lollipop', 392, 0.2, 98, 0.0, 38, '0%'],
      ['Honeycomb', 408, 3.2, 87, 6.5, 562, '0%'],
      ['Donut', 452, 25.0, 51, 4.9, 326, '2%'],
      ['KitKat', 518, 26.0, 65, 7.0, 54, '12%']
    ],
    sorted: 'desc',
    data: [
      ['Frozen yogurt', 159, 6.0, 24, 4.0, 87, '14%'],
      ['Ice cream sandwich', 237, 9.0, 37, 4.3, 129, '8%'],
      ['Eclair', 262, 16.0, 24, 6.0, 337, '6%'],
      ['Cupcake', 305, 3.7, 67, 4.3, 413, '3%'],
      ['Gingerbread', 356, 16.0, 49, 3.9, 327, '7%'],
      ['Jelly bean', 375, 0.0, 94, 0.0, 50, '0%'],
      ['Lollipop', 392, 0.2, 98, 0.0, 38, '0%'],
      ['Honeycomb', 408, 3.2, 87, 6.5, 562, '0%'],
      ['Donut', 452, 25.0, 51, 4.9, 326, '2%'],
      ['KitKat', 518, 26.0, 65, 7.0, 54, '12%']
    ],
    page: 1,
    rowsPerPageIndex: 0,
    possibleRowsPerPage: [
      {value: 0, label: 5},
      {value: 1, label: 10}
    ],
    comments: [
      'Add a comment',
      'Add a comment'
    ],
    types: {
      yogurt: 'ice',
      sandwich: 'pastry',
      eclair: 'other'
    }
  }

  onSortClick = (columnIndex) => {
    let data = [...this.state.data]
    data.sort((a, b) => {
      var lhs = a[columnIndex]
      var rhs = b[columnIndex]
      if (this.state.sorted === 'desc') {
        return (lhs - rhs)
      }
      return (rhs - lhs)
    })
    const sorted = this.state.sorted === 'desc' ? 'asc' : 'desc'
    this.setState({data, sorted})
  }

  onPaginateLeft = () => {
    const page = this.state.page - 1
    if (page > 0) {
      this.setState({page})
    }
  }

  onPaginateRight = () => {
    const page = this.state.page + 1
    const rowsPerPage = this.state.possibleRowsPerPage[this.state.rowsPerPageIndex].label
    if (page * rowsPerPage <= this.state.data.length) {
      this.setState({page})
    }
  }

  onChangeRowsPerPage = (item) => {
    this.setState({
      rowsPerPageIndex: item.value
    })
  }

  // handle body row clicks
  onClick = (index) => {
    console.log(index)
  }

  onChange = (index, event) => {
    const {comments} = this.state
    comments[index] = event.target.value
    this.setState({
      comments
    })
  }

  onChangeType = (key, item) => {
    this.setState({
      types: {
        ...this.state.types,
        [key]: item.value
      }
    })
  }

  render () {
    const {head, simple} = this.state
    const {page} = this.state
    const rowsPerPage = this.state.possibleRowsPerPage[this.state.rowsPerPageIndex].label
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    const xOfY = start + 1 + '-' + end + ' of ' + this.state.data.length
    const data = this.state.data.slice(start, end)

    const types = [
      {value: 'ice', label: 'Ice cream'},
      {value: 'pastry', label: 'Pastry'},
      {value: 'other', label: 'Other'}
    ]

    return (
      <div>
        <section>
          <h2>Table component</h2>
          <p>
            The table component consists of multiple sub components which represent the standard HTML table. They are simply wrapper components so you don't have to apply all the required CSS class names.
          </p>
          <dl>
            <dt>&lt;Table&gt;</dt>
            <dd>
              Main component which simply sets the width to 100%. (&lt;table&gt;)
            </dd>
            <dt>&lt;TableHead&gt;</dt>
            <dd>
              Head content. Has different color and font-size than body content. (&lt;thead&gt;)
            </dd>
            <dt>&lt;TableHeadRow&gt;</dt>
            <dd>
              Single row inside table head. Has different height than body row. (&lt;tr&gt;)
            </dd>
            <dt>&lt;TableHeadCell&gt;</dt>
            <dd>
              Single cell inside table head row. Has different height than body cell. (&lt;th&gt;)
            </dd>
            <dt>&lt;TableBody&gt;</dt>
            <dd>
              Body content. Has different color and font-size than head content. (&lt;tbody&gt;)
            </dd>
            <dt>&lt;TableBodyRow&gt;</dt>
            <dd>
              Single row inside table body. Has different height than head row. (&lt;tr&gt;)
            </dd>
            <dt>&lt;TableBodyCell&gt;</dt>
            <dd>
              Single cell inside table body row. Has different height than head cell. (&lt;td&gt;)
            </dd>
            <dt>&lt;TableFooter&gt;</dt>
            <dd>
              Important! This is not the HTML &lt;tfoot&gt;. The &lt;TableFooter&gt; component consists of the label, dropdown (select), page count and pagination controls from the spec.
            </dd>
          </dl>
          <p>
            Using multiple sub component like row, cell, body, etc. requires you to write a little more boilerplate compared to using a single <code>&lt;Table&gt;</code> component. However it gives you much greater flexibility regarding mouse events and custom styling.
          </p>
        </section>
        <section>
          <h2>Simple Table</h2>
          <p>No alignment, no sorting, no pagination.</p>
          <Table>
            <TableHead>
              <TableHeadRow>
                {head.map((d, i) => (
                  <TableHeadCell key={i}>
                    {d}
                  </TableHeadCell>
                ))}
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {simple.map((d, i) => (
                <TableBodyRow key={i}>
                  {d.map((d, j) => (
                    <TableBodyCell key={j}>
                      {d}
                    </TableBodyCell>
                  ))}
                </TableBodyRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <section>
          <h2>Table</h2>
          <p>Colum 5 (Sodium) is sortable.</p>
          <p>User is able to paginate through data.</p>
          <p>First column is left aligned.</p>
          <p>The user can click on each row inside the table body. The click event is handled in the parent component. In this case the row index is simply logged to the console.</p>
          <Table>
            <TableHead>
              <TableHeadRow>
                {head.map((d, i) => (
                  <TableHeadCell
                    key={i}
                    style={{textAlign: i === 0 ? 'left' : 'right'}}
                    onClick={() => this.onSortClick(i)}
                    sorted={i === 5 ? this.state.sorted : null}
                  >
                    {d}
                  </TableHeadCell>
                ))}
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {data.map((d, i) => (
                <TableBodyRow key={i} onClick={() => this.onClick(i)}>
                  {d.map((d, j) => (
                    <TableBodyCell key={j} style={{textAlign: j === 0 ? 'left' : 'right'}}>
                      {d}
                    </TableBodyCell>
                  ))}
                </TableBodyRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter
            labelRowsPerPage={'Rows per page:'}
            labelXOfY={xOfY}
            onPaginateLeft={this.onPaginateLeft}
            onPaginateRight={this.onPaginateRight}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
            rowsPerPageIndex={this.state.rowsPerPageIndex}
            possibleRowsPerPage={this.state.possibleRowsPerPage}
          />
        </section>
        <section>
          <h2>Inline text editing</h2>
          <Table style={{backgroundColor: 'white'}}>
            <TableHead>
              <TableHeadRow>
                <TableHeadCell style={{textAlign: 'right'}}>
                  Carbs (g)
                </TableHeadCell>
                <TableHeadCell style={{textAlign: 'right'}}>
                  Protein (g)
                </TableHeadCell>
                <TableHeadCell style={{textAlign: 'left'}}>
                  Comments
                </TableHeadCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              <TableBodyRow>
                <TableBodyCell style={{textAlign: 'right'}}>
                  24
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  4.0
                </TableBodyCell>
                <TableBodyCell
                  textfield={
                    <Textfield
                      onChange={(event) => this.onChange(0, event)}
                      value={this.state.comments[0]}
                    />
                  }
                >
                  {this.state.comments[0]}
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell style={{textAlign: 'right'}}>
                  37
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  4.3
                </TableBodyCell>
                <TableBodyCell
                  textfield={
                    <Textfield
                      onChange={(event) => this.onChange(1, event)}
                      value={this.state.comments[1]}
                    />
                  }
                >
                  {this.state.comments[1]}
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell style={{textAlign: 'right'}}>
                  24
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  6.0
                </TableBodyCell>
                <TableBodyCell>
                  337
                </TableBodyCell>
              </TableBodyRow>
            </TableBody>
          </Table>
        </section>
        <section>
          <h2>Inline menu</h2>
          <Table style={{backgroundColor: 'white'}}>
            <TableHead>
              <TableHeadRow>
                <TableHeadCell style={{textAlign: 'left'}}>
                  Dessert (100g serving)
                </TableHeadCell>
                <TableHeadCell style={{textAlign: 'left'}}>
                  Type
                </TableHeadCell>
                <TableHeadCell style={{textAlign: 'right'}}>
                  Fat (g)
                </TableHeadCell>
                <TableHeadCell style={{textAlign: 'right'}}>
                  Carbs (g)
                </TableHeadCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              <TableBodyRow>
                <TableBodyCell>
                  Frozen yogurt
                </TableBodyCell>
                <TableBodyCell>
                  <Select
                    onChange={(index) => this.onChangeType('yogurt', index)}
                    options={types}
                    value={this.state.types.yogurt}
                  />
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  6.0
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  24
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>
                  Ice cream sandwich
                </TableBodyCell>
                <TableBodyCell>
                  <Select
                    onChange={(index) => this.onChangeType('sandwich', index)}
                    options={types}
                    value={this.state.types.sandwich}
                  />
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  9.0
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  37
                </TableBodyCell>
              </TableBodyRow>
              <TableBodyRow>
                <TableBodyCell>
                  Eclair
                </TableBodyCell>
                <TableBodyCell>
                  <Select
                    onChange={(index) => this.onChangeType('eclair', index)}
                    options={types}
                    value={this.state.types.eclair}
                  />
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  16.0
                </TableBodyCell>
                <TableBodyCell style={{textAlign: 'right'}}>
                  24
                </TableBodyCell>
              </TableBodyRow>
            </TableBody>
          </Table>
        </section>
        <section>
          <p>Specification</p>
          <a href='https://material.google.com/components/data-tables.html'>
            https://material.google.com/components/data-tables.html
          </a>
        </section>
      </div>
    )
  }
}
