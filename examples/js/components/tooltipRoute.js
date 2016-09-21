
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Button, Tooltip} from '../../../'
import Icon from '../../../components/icon/'

const tooltipDefault =
`<p title='Tooltip'>
  Tooltip
</p>`

const tooltipComponent =
`class App extends React.Component {

  state = {
    visible: false
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <Tooltip content='Tooltip' visible={this.state.visible}>
        <span onMouseOver={this.show} onMouseOut={this.hide}>
          Tooltip
        </span>
      </Tooltip>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const tooltipIcon =
`class App extends React.Component {

  state = {
    visible: false
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <Tooltip content='Icon' visible={this.state.visible}>
        <div style={{display: 'inline-block'}} onMouseOver={this.show} onMouseOut={this.hide}>
          <Icon.Person />
        </div>
      </Tooltip>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const tooltipButton =
`class App extends React.Component {

  state = {
    visible: false
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <Tooltip content='Button' visible={this.state.visible}>
        <div style={{display: 'inline-block'}} onMouseOver={this.show} onMouseOut={this.hide}>
          <Button onClick={() => {}}>
            Button
          </Button>
        </div>
      </Tooltip>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

export default class TooltipRoute extends React.Component {

  state = {
    tooltip: false,
    button: false
  }

  showButton = () => {
    this.setState({
      button: true
    })
  }

  hideButton = () => {
    this.setState({
      button: false
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Tooltip</h2>
          <Playground
            docClass={Tooltip}
            codeText={tooltipComponent}
            scope={{React, ReactDOM, Tooltip}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Icon Tooltip</h2>
          <Playground
            codeText={tooltipIcon}
            scope={{React, ReactDOM, Tooltip, Icon}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Button Tooltip</h2>
          <Playground
            codeText={tooltipButton}
            scope={{React, ReactDOM, Tooltip, Icon, Button}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Default title / tooltip</h2>
          <Playground
            codeText={tooltipDefault}
            scope={{React}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a className='examplesLink' href='https://material.google.com/components/tooltips.html'>
            https://material.google.com/components/tooltips.html
          </a>
        </section>
      </div>
    )
  }

}
