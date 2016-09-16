
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Playground from 'component-playground'
import {Chip} from '../../../'

const chipComponent =
`class App extends React.Component {

  state = {
    focused: false,
    value: []
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  onChange = (value) => {
    this.setState({value})
  }

  render () {
    return (
      <div>
        <div
          className={classnames('Chip-example1', {
            'is-focused': this.state.focused
          })}
        >
          <Chip
            placeholder={this.state.value.length ? '': 'search ...'}
            value={this.state.value}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>
        {this.state.value.length ? <p>Values</p> : null}
        <ul>
          {this.state.value.map((s, i) => <li key={i}>{s.text}</li>)}
        </ul>
      </div>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const chipInitialValues =
`class App extends React.Component {

  state = {
    value: [{text: 'github'}, {text: 'stackoverflow'}],
    focused: false
  }

  onChange = (value) => {
    this.setState({value})
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  render () {
    return (
      <div>
        <div
          className={classnames('Chip-example1', {
            'is-focused': this.state.focused
          })}
        >
          <Chip
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.value}
          />
        </div>
        {this.state.value.length ? <p>Values</p> : null}
        <ul>
          {this.state.value.map((s, i) => <li key={i}>{s.text}</li>)}
        </ul>
      </div>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const chipCustomDelimiters =
`class App extends React.Component {

  state = {
    value: [],
    focused: false
  }

  onChange = (value) => {
    this.setState({value})
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  render () {
    return (
      <div>
        <div
          className={classnames('Chip-example1', {
            'is-focused': this.state.focused
          })}
        >
          <Chip
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            delimiters={[32]}
            value={this.state.value}
          />
        </div>
        {this.state.value.length ? <p>Values</p> : null}
        <ul>
          {this.state.value.map((s, i) => <li key={i}>{s.text}</li>)}
        </ul>
      </div>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const chipIcons =
`class App extends React.Component {

  state = {
    value: [
      {text: 'Alice'},
      {text: 'Claire'},
      {text: 'John'},
      {text: 'Megan'},
      {text: 'Steve'}
    ],
    focused: false
  }

  onChange = (value) => {
    this.setState({value})
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  render () {
    const value = this.state.value.map(v =>
      v.icon = <img
        src={'img/' + v.text.toLowerCase() + '.jpg'}
        style={{maxWidth: '100%', borderRadius: '50%'}}
      />
    )
    return (
      <div>
        <div
          className={classnames('Chip-example1', {
            'is-focused': this.state.focused
          })}
        >
          <Chip
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.value}
          />
        </div>
        {this.state.value.length ? <p>Values</p> : null}
        <ul>
          {this.state.value.map((s, i) => <li key={i}>{s.text}</li>)}
        </ul>
      </div>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

export default class ChipRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Chip</h2>
          <Playground
            docClass={Chip}
            codeText={chipComponent}
            scope={{React, ReactDOM, Chip, classnames}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Chip with initial values</h2>
          <Playground
            codeText={chipInitialValues}
            scope={{React, ReactDOM, Chip, classnames}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Chip with custom delimiters (e.g. space)</h2>
          <Playground
            codeText={chipCustomDelimiters}
            scope={{React, ReactDOM, Chip, classnames}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Chip with icons</h2>
          <Playground
            codeText={chipIcons}
            scope={{React, ReactDOM, Chip, classnames}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/chips.html'>
            https://material.google.com/components/chips.html
          </a>
        </section>
      </div>
    )
  }

}
