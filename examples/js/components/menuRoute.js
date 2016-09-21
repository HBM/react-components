
import React from 'react'
import ReactDOM from 'react-dom'
import Playground from 'component-playground'
import {Menu, Divider} from '../../../'
import Icon from '../../../components/icon/'

const menuTopRight =
`class App extends React.Component {

  state = {
    visible: false
  }

  onClick = (item) => {
    this.setState({
      visible: true
    })
    document.addEventListener('click', this.hide)
  }

  hide = () => {
    this.setState({
      visible: false
    })
    document.removeEventListener('click', this.hide)
  }

  render () {
    let items = [
      {content: 'one', id: 'one'},
      {content: 'two', icon: <Icon.Done />, id: 'two'},
      Divider,
      {content: 'three'},
      {content: 'long string without linebreak'}
    ]
    return (
      <Menu
        transformX='right'
        transformY='top'
        onClick={this.onClick}
        items={items}
        visible={this.state.visible}
      >
        <Icon.Button onClick={this.onClick}>
          <Icon.MoreVert />
        </Icon.Button>
      </Menu>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const menuTopLeft =
`class App extends React.Component {

  state = {
    visible: false
  }

  onClick = (item) => {
    this.setState({
      visible: true
    })
    document.addEventListener('click', this.hide)
  }

  hide = () => {
    this.setState({
      visible: false
    })
    document.removeEventListener('click', this.hide)
  }

  render () {
    let items = [
      {content: 'one', id: 'one'},
      {content: 'two', icon: <Icon.Done />, id: 'two'},
      Divider,
      {content: 'three'},
      {content: 'long string without linebreak'}
    ]
    return (
      <Menu
        transformX='left'
        transformY='top'
        onClick={this.onClick}
        items={items}
        visible={this.state.visible}
      >
        <Icon.Button onClick={this.onClick}>
          <Icon.MoreVert />
        </Icon.Button>
      </Menu>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const menuBottomRight =
`class App extends React.Component {

  state = {
    visible: false
  }

  onClick = (item) => {
    this.setState({
      visible: true
    })
    document.addEventListener('click', this.hide)
  }

  hide = () => {
    this.setState({
      visible: false
    })
    document.removeEventListener('click', this.hide)
  }

  render () {
    let items = [
      {content: 'one', id: 'one'},
      {content: 'two', icon: <Icon.Done />, id: 'two'},
      Divider,
      {content: 'three'},
      {content: 'long string without linebreak'}
    ]
    return (
      <Menu
        transformX='right'
        transformY='bottom'
        onClick={this.onClick}
        items={items}
        visible={this.state.visible}
      >
        <Icon.Button onClick={this.onClick}>
          <Icon.MoreVert />
        </Icon.Button>
      </Menu>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

const menuBottomLeft =
`class App extends React.Component {

  state = {
    visible: false
  }

  onClick = (item) => {
    this.setState({
      visible: true
    })
    document.addEventListener('click', this.hide)
  }

  hide = () => {
    this.setState({
      visible: false
    })
    document.removeEventListener('click', this.hide)
  }

  render () {
    let items = [
      {content: 'one', id: 'one'},
      {content: 'two', icon: <Icon.Done />, id: 'two'},
      Divider,
      {content: 'three'},
      {content: 'long string without linebreak'}
    ]
    return (
      <Menu
        transformX='left'
        transformY='bottom'
        onClick={this.onClick}
        items={items}
        visible={this.state.visible}
      >
        <Icon.Button onClick={this.onClick}>
          <Icon.MoreVert />
        </Icon.Button>
      </Menu>
    )
  }

}

ReactDOM.render(<App />, mountNode)`

export default class MenuRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Menu - top, right</h2>
          <Playground
            docClass={Menu}
            codeText={menuTopRight}
            scope={{React, ReactDOM, Menu, Icon, Divider}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Menu - top, left</h2>
          <Playground
            codeText={menuTopLeft}
            scope={{React, ReactDOM, Menu, Icon, Divider}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Menu - bottom, right</h2>
          <Playground
            codeText={menuBottomRight}
            scope={{React, ReactDOM, Menu, Icon, Divider}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Menu - bottom, left</h2>
          <Playground
            codeText={menuBottomLeft}
            scope={{React, ReactDOM, Menu, Icon, Divider}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a className='examplesLink' href='https://material.google.com/components/menus.html'>
            https://material.google.com/components/menus.html
          </a>
        </section>
      </div>
    )
  }

}
