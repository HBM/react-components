
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

const selectComponent =
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
      <Select
        onChange={this.onChange}
        items={['Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Black', 'White']}
        selectedIndex={this.state.selected}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode)`

const selectWithLabelComponent =
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
      <Select
        label='Some label'
        onChange={this.onChange}
        items={['Blue', 'Red', 'Green']}
        selectedIndex={this.state.selected}
      />
    )
  }
}

ReactDOM.render(<App />, mountNode)`

const selectDisabled =
`
class App extends React.Component {

  state = {
    first: -1,
    second: -1
  }

  onChangeFirst = (index) => {
    this.setState({
      first: index
    })
  }

  onChangeSecond = (index) => {
    this.setState({
      second: index
    })
  }

  render () {
    return (
      <div style={{display: 'flex'}}>
        <Select
          label='first'
          onChange={this.onChangeFirst}
          items={['One', 'Two', 'Three']}
          selectedIndex={this.state.first}
        />
        <Select
          label='second'
          onChange={this.onChangeSecond}
          items={['Eleven', 'Twelve', 'Thirteen']}
          selectedIndex={this.state.second}
          disabled={this.state.first === -1}
        />
      </div>
    )
  }

}

ReactDOM.render(<App />, mountNode)
`

export default class SelectRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Select</h2>
          <Playground
            docClass={Select}
            codeText={selectComponent}
            scope={{React, ReactDOM, Select}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Select with scrolling</h2>
          <Playground
            codeText={selectWithScrolling}
            scope={{React, ReactDOM, Select}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Select with label</h2>
          <Playground
            codeText={selectWithLabelComponent}
            scope={{React, ReactDOM, Select}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Disabled select</h2>
          <Playground
            codeText={selectDisabled}
            scope={{React, ReactDOM, Select}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Default select</h2>
          <Playground
            codeText={defaultSelect}
            scope={{React}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/menus.html'>
            https://material.google.com/components/menus.html
          </a>
        </section>
      </div>
    )
  }
}
