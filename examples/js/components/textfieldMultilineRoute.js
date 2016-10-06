import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {TextfieldMultiline, Icon} from '../../../'

const textareaComponent =
`<textarea
/>`

const textfieldMultiline =
`class App extends React.Component {

  state = {
    multiline: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <TextfieldMultiline
        label='Enter multiline text'
        name='multiline'
        value={this.state.multiline}
        onChange={this.onChange}
        spellCheck={false}
        length={100}
      />
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const textfieldMultilineWithPlaceholderAndIconComponent =
`class App extends React.Component {

  state = {
    story: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const story = this.state.story
    return (
      <TextfieldMultiline 
        name='story'
        label='Your Story'
        placeholder='Once upon a time...'
        value={this.state.story}
        onChange={this.onChange}
        error={story.length > 0 && story.length < 30 ? 'Please enter at least 30 characters' : null}
        icon={<Icon.Panorama />} />
    )
  }

}

ReactDOM.render(<App />, mountNode)`

export default class TextfieldRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>TextfieldMultiline with Label</h2>
          <Playground
            docClass={TextfieldMultiline}
            codeText={textfieldMultiline}
            scope={{React, ReactDOM, TextfieldMultiline}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>TextfieldMultiline with placeholder, icon and label</h2>
          <Playground
            codeText={textfieldMultilineWithPlaceholderAndIconComponent}
            scope={{React, ReactDOM, TextfieldMultiline, Icon}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Default textarea</h2>
          <Playground
            codeText={textareaComponent}
            scope={{React}}
            collapsableCode
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
