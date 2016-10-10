import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Textarea, Icon} from '../../../'

const textareaComponent =
`<textarea
/>`

const textarea =
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
      <Textarea
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

const textareaWithPlaceholderAndIconComponent =
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
      <Textarea 
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
          <h2>Textarea with Label</h2>
          <Playground
            docClass={Textarea}
            codeText={textarea}
            scope={{React, ReactDOM, Textarea}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Textarea with placeholder, icon and label</h2>
          <Playground
            codeText={textareaWithPlaceholderAndIconComponent}
            scope={{React, ReactDOM, Textarea, Icon}}
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
