import React from 'react'
import {Textarea, Icon} from '../../lib'

export default class TextfieldRoute extends React.Component {

  state = {
    multiline: '',
    story: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const story = this.state.story
    return (
      <div>
        <section>
          <h2>Textarea with Label</h2>
          <Textarea
            label='Enter multiline text'
            name='multiline'
            value={this.state.multiline}
            onChange={this.onChange}
            spellCheck={false}
            length={100}
          />
        </section>
        <section>
          <h2>Textarea with placeholder, icon and label</h2>
          <Textarea
            name='story'
            label='Your Story'
            placeholder='Once upon a time...'
            value={this.state.story}
            onChange={this.onChange}
            error={story.length > 0 && story.length < 30 ? 'Please enter at least 30 characters' : null}
            icon={<Icon.Panorama />}
          />
        </section>
        <section>
          <h2>Default textarea</h2>
          <textarea />
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
