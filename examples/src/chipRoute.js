
import React from 'react'
import classnames from 'classnames'
import {Chip} from '../../lib'

export default class ChipRoute extends React.Component {

  state = {
    focused: false,
    value: [],
    delim: [],
    initial: [{text: 'github'}, {text: 'stackoverflow'}],
    icon: [
      {text: 'Alice'},
      {text: 'Claire'},
      {text: 'John'},
      {text: 'Megan'},
      {text: 'Steve'}
    ],
    form: []
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

  onChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render () {
    const icon = this.state.icon.map(v => {
      v.icon = <img
        src={'img/' + v.text.toLowerCase() + '.jpg'}
        style={{maxWidth: '100%', borderRadius: '50%'}}
        alt={`${v.text.toLowerCase()}`}
      />
      return v
    })
    return (
      <div>
        <section>
          <h2>Chip</h2>
          <div>
            <div
              className={classnames('Chip-example1', {
                'is-focused': this.state.focused
              })}
            >
              <Chip
                placeholder={this.state.value.length ? '' : 'search ...'}
                value={this.state.value}
                onChange={(value) => this.onChange('value', value)}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            </div>
            {this.state.value.length ? <p>Values</p> : null}
            <ul>
              {this.state.value.map((s, i) => <li key={i}>{s.text}</li>)}
            </ul>
          </div>
        </section>
        <section>
          <h2>Chip with initial values</h2>
          <div>
            <div
              className={classnames('Chip-example1', {
                'is-focused': this.state.focused
              })}
            >
              <Chip
                onChange={(value) => this.onChange('initial', value)}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                value={this.state.initial}
              />
            </div>
            {this.state.initial.length ? <p>Values</p> : null}
            <ul>
              {this.state.initial.map((s, i) => <li key={i}>{s.text}</li>)}
            </ul>
          </div>
        </section>
        <section>
          <h2>Chip with custom delimiters (e.g. space)</h2>
          <div>
            <div
              className={classnames('Chip-example1', {
                'is-focused': this.state.focused
              })}
            >
              <Chip
                onChange={(value) => this.onChange('delim', value)}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                delimiters={[32]}
                value={this.state.delim}
              />
            </div>
            {this.state.delim.length ? <p>Values</p> : null}
            <ul>
              {this.state.delim.map((s, i) => <li key={i}>{s.text}</li>)}
            </ul>
          </div>
        </section>
        <section>
          <h2>Chip with icons</h2>
          <div>
            <div
              className={classnames('Chip-example1', {
                'is-focused': this.state.focused
              })}
            >
              <Chip
                onChange={(value) => this.onChange('icon', value)}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                value={icon}
              />
            </div>
            {icon.length ? <p>Values</p> : null}
            <ul>
              {icon.map((s, i) => <li key={i}>{s.text}</li>)}
            </ul>
          </div>
        </section>
        <section>
          <h2>Chip deletable=false</h2>
          <Chip
            value={[{text: 'foobar'}, {text: 'the other bar'}]}
            deletable={false}
          />
        </section>
        <section>
          <h2>Chip inside form</h2>
          <div>
            <div
              className={classnames('Chip-example1', {
                'is-focused': this.state.focused
              })}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <Chip
                  placeholder={this.state.value.length ? '' : 'search ...'}
                  value={this.state.form}
                  onChange={(value) => this.onChange('form', value)}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                />
              </form>
            </div>
            {this.state.form.length ? <p>Values</p> : null}
            <ul>
              {this.state.form.map((s, i) => <li key={i}>{s.text}</li>)}
            </ul>
          </div>
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
