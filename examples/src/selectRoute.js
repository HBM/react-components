
import React from 'react'
import {Select, Textfield} from 'md-components'

export default class SelectRoute extends React.Component {
  state = {
    first: '',
    second: '',
    third: '',
    textfield: 'hello'
  }

  onChange = (item) => {
    const {name, value} = item.target
    this.setState({
      [name]: value
    })
  }

  render () {
    let bigOptionList = []
    for (var i = 1; i <= 100; i++) {
      bigOptionList.push({value: i, label: `Item ${i}`})
    }
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
          <h2>Select with scrolling big list</h2>
          <Select
            name='first'
            onChange={this.onChange}
            options={bigOptionList}
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
          <h2>Select with JSX label</h2>
          <Select
            label='Some label'
            name='first'
            onChange={this.onChange}
            options={[
              {value: 'blue', label: <span style={{color: 'blue'}}>Blue</span>},
              {value: 'red', label: <span style={{color: 'red'}}>Red</span>},
              {value: 'green', label: <span style={{color: 'green'}}>Green</span>}
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
          <h2>Textfields and Select</h2>
          <div style={{display: 'flex'}}>
            <Textfield
              dense
              label='Name'
              name='textfield'
              value={this.state.textfield}
              onChange={this.onChange}
              error={this.state.textfield === 'aa' ? 'nope' : null}
            />
            <span style={{minWidth: 10}} />
            <Select
              dense
              name='select'
              onChange={this.onChange}
              options={[
                {value: 'blue', label: 'Blue'},
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'}
              ]}
              value={this.state.select}
            />
            <span style={{minWidth: 10}} />
            <Select
              dense
              label='Color'
              name='select'
              onChange={this.onChange}
              options={[
                {value: 'blue', label: 'Blue'},
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'}
              ]}
              value={this.state.select}
            />
          </div>
        </section>
        <section>
          <h2>Select with helper message</h2>
          <Select
            name='first'
            onChange={this.onChange}
            helper='some helper text'
            options={[
              {value: 'blue', label: 'Blue'},
              {value: 'red', label: 'Red'},
              {value: 'green', label: 'Green'}
            ]}
            value={this.state.first}
          />
        </section>
        <section>
          <h2>Select with error next to Textfield</h2>
          <div style={{display: 'flex'}}>
            <Select
              name='first'
              error='Please select something'
              onChange={this.onChange}
              value={this.state.first}
              options={[
                {value: 'blue', label: 'Blue'},
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'}
              ]}
            />
            <Textfield
              label='Country'
              name='country'
              value={'awesome'}
              onChange={() => {}}
              error='oh noes'
            />
          </div>
        </section>
        <section>
          <h2>Select with error next to Textfield (dense)</h2>
          <div style={{display: 'flex'}}>
            <Select
              label='Country'
              dense
              name='first'
              error='Please select something'
              onChange={this.onChange}
              value={this.state.first}
              options={[
                {value: 'blue', label: 'Blue'},
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'}
              ]}
            />
            <Textfield
              dense
              label='Country'
              name='country'
              value={'awesome'}
              onChange={() => {}}
              error='oh noes'
            />
          </div>
        </section>
        <section>
          <h2>Default select</h2>
          <label htmlFor='default'>
            label
          </label>
          <select id='default'>
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
