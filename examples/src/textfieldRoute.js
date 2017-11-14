import React from 'react'
import {Textfield, Icon} from 'md-components'

export default class TextfieldRoute extends React.Component {
  state = {
    country: 'Germany',
    color: '',
    phone: '',
    email: '',
    name: 'peter',
    animal: 'Dog',
    nonfloat: '',
    weight: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount () {
    this.inputElement.focus()
  }

  render () {
    return (
      <div>
        <section>
          <h2>Textfield</h2>
          <Textfield label='Country' name='country' value={this.state.country} onChange={this.onChange} />
        </section>
        <section>
          <h2>Textfield with label and placeholder</h2>
          <Textfield label='Color' name='color' placeholder='Blue' value={this.state.color} onChange={this.onChange} />
        </section>
        <section>
          <h2>Textfield with placeholder and icon</h2>
          <Textfield name='phone' placeholder='Phone' value={this.state.phone} onChange={this.onChange} icon={<Icon.Phone />} />
          <Textfield name='email' placeholder='Email' value={this.state.email} onChange={this.onChange} icon={<Icon.Email />} />
        </section>
        <section>
          <h2>Textfield with label and placeholder and icon</h2>
          <Textfield name='phone' placeholder='067 321' value={this.state.phone} onChange={this.onChange} icon={<Icon.Phone />} label='Phone' />
          <Textfield name='email' placeholder='foo@bar.com' value={this.state.email} onChange={this.onChange} icon={<Icon.Email />} label='Email' />
        </section>
        <section>
          <h2>Textfield with error message</h2>
          <Textfield
            label='Name'
            name='name'
            value={this.state.name}
            onChange={this.onChange}
            error={!this.state.name.match(/^[A-Z]/) && 'The name must start with capital letter.'}
          />
        </section>
        <section>
          <h2>Textfield with error message and using character counter</h2>
          <Textfield
            label='Name'
            name='name'
            value={this.state.name}
            onChange={this.onChange}
            error={!this.state.name.match(/^[A-Z]/) && 'The name must start with capital letter.'}
            length={10}
          />
        </section>
        <section>
          <h2>Textfield with suffix</h2>
          <Textfield label='Weight' name='weight' placeholder='120' value={this.state.weight} onChange={this.onChange} suffix='lbs' />
        </section>
        <section>
          <h2>Read only textfield</h2>
          <Textfield readOnly label='Read only' name='animal' value={this.state.animal} onChange={() => {}} />
        </section>
        <section>
          <h2>Textfield with default value</h2>
          <Textfield
            label='default'
            defaultValue='awesome'
          />
        </section>
        <section>
          <h2>Textfield fixed (non-floating) label</h2>
          <Textfield
            label='Non floating'
            name='nonfloat'
            float={false}
            value={this.state.nonfloat}
            onChange={this.onChange}
          />
        </section>
        <section>
          <h2>Textfield with reference to underlying input element</h2>
          <p>
            Having access to the underlying input element allows you to set the focus in lifecycle methods. For more information see <a href='https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components'>Exposing DOM Refs to Parent Components</a>.
          </p>
          <Textfield
            label='Non floating'
            name='nonfloat'
            value={this.state.nonfloat}
            onChange={this.onChange}
            inputRef={el => { this.inputElement = el }}
          />
        </section>
        <section>
          <h2>Default textfield</h2>
          <input
            type='text'
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/text-fields.html'>
            https://material.google.com/components/text-fields.html
          </a>
        </section>
      </div>
    )
  }
}
