
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {
  Table,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
  TableFooter
} from '../../../'

const simple =
`
class App extends React.Component {

  state = {
    head: [
      'Dessert (100g serving)',
      'Calories',
      'Fat (g)',
      'Carbs (g)',
      'Protein (g)',
      'Sodium (g)',
      'Calcium (%)',
    ],
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
    ]
  }

  render () {
    const {head, data} = this.state
    return (
      <div>
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
            {data.map((d, i) => (
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
      </div>
    )
  }


}

ReactDOM.render(<App />, mountNode)
`

const advanced =
`
class App extends React.Component {

  state = {
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
    possibleRowsPerPage: [5, 10]
  }

  onSortClick = (columnIndex) => {
    console.log(columnIndex)
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
    const rowsPerPage = this.state.possibleRowsPerPage[this.state.rowsPerPageIndex]
    if (page * rowsPerPage <= this.state.data.length) {
      this.setState({page})
    }
  }

  onChangeRowsPerPage = (index) => {
    this.setState({
      rowsPerPageIndex: index
    })
  }

  // handle body row clicks
  onClick = (index) => {
    console.log(index)
  }

  render () {
    // example data from material design specs
    const head = [
      'Dessert (100g serving)',
      'Calories',
      'Fat (g)',
      'Carbs (g)',
      'Protein (g)',
      'Sodium (g)',
      'Calcium (%)'
    ]

    const {page} = this.state
    const rowsPerPage = this.state.possibleRowsPerPage[this.state.rowsPerPageIndex]
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    const xOfY = start + 1 + '-' + end + ' of ' + this.state.data.length
    const data = this.state.data.slice(start, end)

    return (
      <div>
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
      </div>
    )
  }

}

ReactDOM.render(<App />, mountNode)
`

export default class TableRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Table component</h2>
          <p>
            The table component consists of multiple sub components which represent the standard HTML table. They are simply wrapper components so you don't have to apply all the required CSS class names.
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
          </p>
          <p>
            Using multiple sub component like row, cell, body, etc. requires you to write a little more boilerplate compared to using a single <code>&lt;Table&gt;</code> component. However it gives you much greater flexibility regarding mouse events and custom styling.
          </p>
        </section>
        <section>
          <h2>Simple Table</h2>
          <p>No alignment, no sorting, no pagination.</p>
          <Playground
            codeText={simple}
            scope={{
              React,
              ReactDOM,
              Table,
              TableHead,
              TableHeadRow,
              TableHeadCell,
              TableBody,
              TableBodyRow,
              TableBodyCell
            }}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Table</h2>
          <p>Colum 5 (Sodium) is sortable.</p>
          <p>User is able to paginate through data.</p>
          <p>First column is left aligned.</p>
          <p>The user can click on each row inside the table body. The click event is handled in the parent component. In this case the row index is simply logged to the console.</p>
          <Playground
            docClass={Table}
            codeText={advanced}
            scope={{
              React,
              ReactDOM,
              Table,
              TableHead,
              TableHeadRow,
              TableHeadCell,
              TableBody,
              TableBodyRow,
              TableBodyCell,
              TableFooter
            }}
            noRender={false}
            collapsableCode
          />
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
