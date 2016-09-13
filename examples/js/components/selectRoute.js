
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Select} from '../../../'

const defaultSelect =
`<select>
  <option>one</option>
  <option>two</option>
  <option>three</option>
</select>`

const _select =
`class App extends React.Component {
  state = {
    selected: -1,
  }

  onChange = (index) => {
    this.setState({
      selected: index
    })
  }

  render () {
    return (
      <div>
      <Select
        onChange={this.onChange}
        items={['Blue', 'Red', 'Green']}
        selectedIndex={this.state.selected}
      />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)`

const selectWithScrolling =
`class App extends React.Component {
  state = {
    selected: -1,
  }

  onChange = (index) => {
    this.setState({
      selected: index
    })
  }

  render () {
    return (
      <div>
      <Select
        onChange={this.onChange}
        items={['Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Black', 'White']}
        selectedIndex={this.state.selected}
      />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)`

const selectWithLabel =
`class App extends React.Component {
  state = {
    selected: -1,
  }

  onChange = (index) => {
    this.setState({
      selected: index
    })
  }

  render () {
    return (
      <div>
      <Select
        label='Some label'
        onChange={this.onChange}
        items={['Blue', 'Red', 'Green']}
        selectedIndex={this.state.selected}
      />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)`

export default class SelectRoute extends React.Component {

  state = {
    selected: -1,
    selectedWithScrolling: -1
  }

  onChange = (index) => {
    this.setState({
      selected: index
    })
  }

  onChangeWithScrolling = (index) => {
    this.setState({
      selectedWithScrolling: index
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Default select</h2>
          <Playground
            codeText={defaultSelect}
            scope={{React}}
          />
        </section>
        <section>
          <h2>Select</h2>
          <Playground
            docClass={Select}
            noRender={false}
            codeText={_select}
            scope={{React, ReactDOM, Select}}
          />
        </section>
        <section>
          <h2>Select with scrolling</h2>
          <Playground
            docClass={Select}
            noRender={false}
            codeText={selectWithScrolling}
            scope={{React, ReactDOM, Select}}
          />
        </section>
        <section>
          <h2>Select with label</h2>
          <Playground
            docClass={Select}
            noRender={false}
            codeText={selectWithLabel}
            scope={{React, ReactDOM, Select}}
          />
        </section>
      </div>
    )
  }
}
