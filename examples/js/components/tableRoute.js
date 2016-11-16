
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Table} from '../../../'

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
    return (
      <div>
        <Table
          head={this.state.head}
          body={this.state.data}
        />
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
    sortOrder: Table.Sort.Descending,
    data: [
      [{text: 'Frozen yogurt', align: Table.Align.Left}, 159, 6.0, 24, 4.0, 87, '14%'],
      [{text: 'Ice cream sandwich', align: Table.Align.Left}, 237, 9.0, 37, 4.3, 129, '8%'],
      [{text: 'Eclair', align: Table.Align.Left}, 262, 16.0, 24, 6.0, 337, '6%'],
      [{text: 'Cupcake', align: Table.Align.Left}, 305, 3.7, 67, 4.3, 413, '3%'],
      [{text: 'Gingerbread', align: Table.Align.Left}, 356, 16.0, 49, 3.9, 327, '7%'],
      [{text: 'Jelly bean', align: Table.Align.Left}, 375, 0.0, 94, 0.0, 50, '0%'],
      [{text: 'Lollipop', align: Table.Align.Left}, 392, 0.2, 98, 0.0, 38, '0%'],
      [{text: 'Honeycomb', align: Table.Align.Left}, 408, 3.2, 87, 6.5, 562, '0%'],
      [{text: 'Donut', align: Table.Align.Left}, 452, 25.0, 51, 4.9, 326, '2%'],
      [{text: 'KitKat', align: Table.Align.Left}, 518, 26.0, 65, 7.0, 54, '12%']
    ],
    page: 1,
    rowsPerPageIndex: 0,
    possibleRowsPerPage: [5, 10]
  }

  onSortClick = (columnIndex) => {
    const {Descending, Ascending} = Table.Sort
    let data = [...this.state.data]
    data.sort((a, b) => {
      var lhs = a[columnIndex]
      var rhs = b[columnIndex]
      if (this.state.sortOrder === Descending) {
        return (lhs - rhs)
      }
      return (rhs - lhs)
    })
    const sortOrder = this.state.sortOrder === Descending ? Ascending : Descending
    this.setState({data, sortOrder})
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

  render () {
    // example data from material design specs
    let head = [
      {text: 'Dessert (100g serving)', align: Table.Align.Left},
      'Calories',
      'Fat (g)',
      'Carbs (g)',
      'Protein (g)',
      {text: 'Sodium (g)', sorted: this.state.sortOrder},
      'Calcium (%)'
    ]

    const {page} = this.state
    const rowsPerPage = this.state.possibleRowsPerPage[this.state.rowsPerPageIndex]
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    const xOfY = start + 1 + '-' + end + ' of ' + this.state.data.length
    const data = this.state.data.slice(start, end)

    const footer = {
      labelRowsPerPage: 'Rows per page:',
      labelXOfY: xOfY,
      onPaginateLeft: this.onPaginateLeft,
      onPaginateRight: this.onPaginateRight,
      onChangeRowsPerPage: this.onChangeRowsPerPage,
      rowsPerPageIndex: this.state.rowsPerPageIndex,
      possibleRowsPerPage: this.state.possibleRowsPerPage
    }

    return (
      <div>
        <Table
          head={head}
          body={data}
          onSortClick={this.onSortClick}
          footer={footer}
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
          <h2>Table</h2>
          <p>Colum 5 (Sodium) is sortable.</p>
          <p>User is able to paginate through data.</p>
          <p>First column is left aligned.</p>
          <Playground
            docClass={Table}
            codeText={advanced}
            scope={{React, ReactDOM, Table}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Simple Table</h2>
          <p>No alignment, no sorting, no pagination.</p>
          <Playground
            codeText={simple}
            scope={{React, ReactDOM, Table}}
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
