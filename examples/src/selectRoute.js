
import React from 'react'
import {Select} from '../../lib'

export default class SelectRoute extends React.Component {
  state = {
    first: '',
    second: '',
    third: ''
  }

  onChange = (item) => {
    const {name, value} = item.target
    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Select</h2>
          <Select
            name='first'
            onChange={this.onChange}
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
            name='first'
            onChange={this.onChange}
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
            name='first'
            onChange={this.onChange}
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
              name='second'
              onChange={this.onChange}
              options={[
                {value: 'one', label: 'One'},
                {value: 'two', label: 'Two'},
                {value: 'three', label: 'Three'}
              ]}
              value={this.state.second}
            />
            <Select
              label='third'
              name='third'
              onChange={this.onChange}
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
