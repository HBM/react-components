
import React from 'react'
import {Button, Tooltip, Icon} from '../../lib'

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
          <Tooltip content='Tooltip'>
            <span>
              Tooltip
            </span>
          </Tooltip>
        </section>
        <section>
          <h2>Tooltip visible</h2>
          <Tooltip content='Tooltip' visible>
            <span>
              Tooltip
            </span>
          </Tooltip>
        </section>
        <section>
          <h2>Icon Tooltip</h2>
          <Tooltip content='Icon'>
            <div style={{display: 'inline-block'}}>
              <Icon.Person />
            </div>
          </Tooltip>
        </section>
        <section>
          <h2>Button Tooltip</h2>
          <Tooltip content='Button'>
            <div style={{display: 'inline-block'}}>
              <Button onClick={() => {}}>
                Button
              </Button>
            </div>
          </Tooltip>
        </section>
        <section>
          <h2>Default title / tooltip</h2>
          <p title='Tooltip'>
            Tooltip
          </p>
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/tooltips.html'>
            https://material.google.com/components/tooltips.html
          </a>
        </section>
      </div>
    )
  }

}
