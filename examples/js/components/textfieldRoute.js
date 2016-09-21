import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Textfield, Icon} from '../../../'

const inputComponent =
`<input
  type='text'
/>`

const textfieldWithDefaultValueComponent =
`<Textfield
  label='default'
  defaultValue='awesome'
/>`

const textfieldComponent =
`class App extends React.Component {

  state = {
    color: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Textfield label='Color' name='color' value={this.state.color} onChange={this.onChange} />
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const textfieldWithLabelComponent =
`class App extends React.Component {

  state = {
    country: 'Germany'
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Textfield label='Country' name='country' value={this.state.country} onChange={this.onChange} />
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const textfieldWithPlaceholderAndIconComponent =
`class App extends React.Component {

  state = {
    phone: '',
    email: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Textfield name='phone' placeholder='Phone' value={this.state.phone} onChange={this.onChange} icon={<Icon.Phone />} />
        <Textfield name='email' placeholder='Email' value={this.state.email} onChange={this.onChange} icon={<Icon.Email />} />
      </div>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const textfieldWithPlaceholderAndLabelAndIconComponent =
`class App extends React.Component {

  state = {
    phone: '',
    email: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Textfield name='phone' placeholder='067 321' value={this.state.phone} onChange={this.onChange} icon={<Icon.Phone />} label='Phone' />
        <Textfield name='email' placeholder='foo@bar.com' value={this.state.email} onChange={this.onChange} icon={<Icon.Email />} label='Email' />
      </div>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const textfieldReadOnlyComponent =
`class App extends React.Component {

  state = {
    animal: 'Dog'
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Textfield readOnly label='Read only' name='animal' value={this.state.animal} onChange={() => {}} />
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const textfieldWithErrorMessageComponent =
`class App extends React.Component {

  state = {
    error: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Textfield
        label='Error message'
        name='error'
        value={this.state.error}
        onChange={this.onChange}
        error='Username or password incorrect.'
      />
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const textfieldNonfloatingLabelComponent =
`class App extends React.Component {

  state = {
    nonfloat: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Textfield
        label='Non floating'
        name='nonfloat'
        float={false}
        value={this.state.nonfloat}
        onChange={this.onChange}
      />
    )
  }

}

ReactDOM.render(<App />, mountNode)`

export default class TextfieldRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Textfield with label</h2>
          <Playground
            codeText={textfieldWithLabelComponent}
            scope={{React, ReactDOM, Textfield}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Textfield with default value</h2>
          <Playground
            docClass={Textfield}
            codeText={textfieldWithDefaultValueComponent}
            scope={{React, Textfield}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Textfield</h2>
          <Playground
            codeText={textfieldComponent}
            scope={{React, ReactDOM, Textfield}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Textfield with placeholder and icon</h2>
          <Playground
            codeText={textfieldWithPlaceholderAndIconComponent}
            scope={{React, ReactDOM, Textfield, Icon}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Textfield with label and placeholder and icon</h2>
          <Playground
            codeText={textfieldWithPlaceholderAndLabelAndIconComponent}
            scope={{React, ReactDOM, Textfield, Icon}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Read only textfield</h2>
          <Playground
            codeText={textfieldReadOnlyComponent}
            scope={{React, ReactDOM, Textfield}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Textfield with error message</h2>
          <Playground
            codeText={textfieldWithErrorMessageComponent}
            scope={{React, ReactDOM, Textfield}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Textfield fixed (non-floating) label</h2>
          <Playground
            codeText={textfieldNonfloatingLabelComponent}
            scope={{React, ReactDOM, Textfield}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Default textfield</h2>
          <Playground
            codeText={inputComponent}
            scope={{React}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a className='examplesLink' href='https://material.google.com/components/text-fields.html'>
            https://material.google.com/components/text-fields.html
          </a>
        </section>
      </div>
    )
  }

}
