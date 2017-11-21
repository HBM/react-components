
import React from 'react'
import {Selectnative, Textfield, Select} from 'md-components'

export default class SelectRoute extends React.Component {
  state = {
    value: 'germany'
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Plain Selectnative</h2>
          <Selectnative
            label='first label'
            onChange={this.onChange}
            value={this.state.value}
          >
            <option value='germany'>Germany</option>
            <option value='spain'>Spain</option>
            <option value='italy'>Italy</option>
          </Selectnative>
          <p>{this.state.value}</p>
        </section>
        <section>
          <h2>Selectnative with helper</h2>
          <Selectnative
            label='first label'
            helper='some helper text'
            onChange={this.onChange}
            value={this.state.value}
          >
            <option value='germany'>Germany</option>
            <option value='spain'>Spain</option>
            <option value='italy'>Italy</option>
          </Selectnative>
        </section>
        <section>
          <h2>Selectnative with error</h2>
          <Selectnative
            label='first label'
            error='Please select something'
            onChange={this.onChange}
            value={this.state.value}
          >
            <option value='germany'>Germany</option>
            <option value='spain'>Spain</option>
            <option value='italy'>Italy</option>
          </Selectnative>
        </section>
        <section>
          <h2>Selectnative next to Textfield</h2>
          <div style={{display: 'flex'}}>
            <Selectnative
              label='Country'
              onChange={this.onChange}
              value={this.state.value}
            >
              <option value='germany'>Germany</option>
              <option value='spain'>Spain</option>
              <option value='usa'>United States of America</option>
            </Selectnative>
            <Textfield
              label='Country'
              name='country'
              value={'awesome'}
              onChange={() => {}}
            />
          </div>
        </section>
        <section>
          <h2>Selectnative next to Textfield (with helper / error message)</h2>
          <div style={{display: 'flex'}}>
            <Selectnative
              label='Country'
              helper='some helper text'
            >
              <option>one</option>
              <option>two</option>
              <option>some long option</option>
            </Selectnative>
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
          <h2>Selectnative next to Select</h2>
          <div style={{display: 'flex'}}>
            <Selectnative
              label='Country'
            >
              <option>one</option>
              <option>two</option>
              <option>some long option</option>
            </Selectnative>
            <Select
              label='Country'
              name='first'
              onChange={() => {}}
              options={[
                {value: 'blue', label: 'Blue'},
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'}
              ]}
              value=''
            />
          </div>
        </section>
        <section>
          <h2>Select next to Textfield</h2>
          <div style={{display: 'flex'}}>
            <Select
              label='Country'
              name='first'
              onChange={() => {}}
              options={[
                {value: 'blue', label: 'Blue'},
                {value: 'red', label: 'Red'},
                {value: 'green', label: 'Green'}
              ]}
              value=''
            />
            <Textfield
              label='Country'
              name='country'
              value={'awesome'}
              onChange={() => {}}
            />
          </div>
        </section>
      </div>
    )
  }
}
