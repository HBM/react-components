
import React from 'react'
import {Menu, Divider, Icon} from '../../lib'

export default class MenuRoute extends React.Component {
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
    const items = [
      {content: 'one', id: 'one'},
      {content: 'two', icon: <Icon.Done />, id: 'two'},
      Divider,
      {content: 'three'},
      {content: 'long string without linebreak'}
    ]
    return (
      <div>
        <section>
          <h2>Menu - top, right</h2>
          <div style={{float: 'right'}}>
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
          </div>
        </section>
        <section style={{clear: 'both'}}>
          <h2>Menu - top, left</h2>
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
        </section>
        <section>
          <h2>Menu - bottom, right</h2>
          <div style={{float: 'right'}}>
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
          </div>
        </section>
        <section style={{clear: 'both'}}>
          <h2>Menu - bottom, left</h2>
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
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/menus.html'>
            https://material.google.com/components/menus.html
          </a>
        </section>
      </div>
    )
  }
}
