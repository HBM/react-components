
import React from 'react'
import {Select} from '../../lib'

export default class SelectRoute extends React.Component {

  state = {
    selected: -1,
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

  onChange = (index) => {
    this.setState({
      selected: index
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Select</h2>
          <Select
            onChange={this.onChange}
            items={['Blue', 'Red', 'Green']}
            selectedIndex={this.state.selected}
          />
        </section>
        <section>
          <h2>Select with scrolling</h2>
          <Select
            onChange={this.onChange}
            items={['Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Black', 'White']}
            selectedIndex={this.state.selected}
          />
        </section>
        <section>
          <h2>Select with label</h2>
          <Select
            label='Some label'
            onChange={this.onChange}
            items={['Blue', 'Red', 'Green']}
            selectedIndex={this.state.selected}
          />
        </section>
        <section>
          <h2>Disabled select</h2>
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
        </section>
        <section>
          <h2>Default select</h2>
          <select>
            <option>one</option>
            <option>two</option>
            <option>three</option>
          </select>
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
