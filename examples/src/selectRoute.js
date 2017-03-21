
import React from 'react'
import {Select} from '../../lib'

export default class SelectRoute extends React.Component {
  state = {
    first: '',
    second: '',
    third: ''
  }

  onChange = (key, item) => {
    this.setState({
      [key]: item.value
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Select</h2>
          <Select
            onChange={(item) => this.onChange('first', item)}
            options={[
              {value: 'blue', label: 'Blue'},
              {value: 'red', label: 'Red'},
              {value: 'green', label: 'Green'}
            ]}
            value={this.state.first}
          />
        </section>
        <section>
          <h2>Select with scrolling</h2>
          <Select
            onChange={(item) => this.onChange('first', item)}
            options={[
              {value: 'blue', label: 'Blue'},
              {value: 'red', label: 'Red'},
              {value: 'green', label: 'Green'},
              {value: 'yellow', label: 'Yellow'},
              {value: 'orange', label: 'Orange'},
              {value: 'black', label: 'Black'},
              {value: 'white', label: 'White'}
            ]}
            value={this.state.first}
          />
        </section>
        <section>
          <h2>Select with label</h2>
          <Select
            label='Some label'
            onChange={(item) => this.onChange('first', item)}
            options={[
              {value: 'blue', label: 'Blue'},
              {value: 'red', label: 'Red'},
              {value: 'green', label: 'Green'}
            ]}
            value={this.state.first}
          />
        </section>
        <section>
          <h2>Disabled select</h2>
          <div style={{display: 'flex'}}>
            <Select
              label='second'
              onChange={(item) => this.onChange('second', item)}
              options={[
                {value: 'one', label: 'One'},
                {value: 'two', label: 'Two'},
                {value: 'three', label: 'Three'}
              ]}
              value={this.state.second}
            />
            <Select
              label='third'
              onChange={(item) => this.onChange('third', item)}
              options={[
                {value: 'eleven', label: 'Eleven'},
                {value: 'twelve', label: 'Twelve'},
                {value: 'thirteen', label: 'Thirteen'}
              ]}
              value={this.state.third}
              disabled={this.state.second === ''}
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
