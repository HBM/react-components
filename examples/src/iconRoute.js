import React from 'react'
import {Icon} from '../../lib'

export default class IconRoute extends React.Component {
  render () {
    let icons = Object.keys(Icon).map((key, index) => {
      if (key !== 'Button' && key !== 'Logo') {
        let value = Icon[key]
        const style = {display: 'flex', alignItems: 'center', padding: 20, flexDirection: 'column', float: 'left', width: '33%'}
        return (
          <div key={index} style={style}>
            {value()}
            <span>{key}</span>
          </div>
        )
      }
      return null
    })
    return (
      <div>
        <section>
          <h2>Icons</h2>
          {icons}
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://design.google.com/icons/'>
            https://design.google.com/icons/
          </a>
        </section>
      </div>
    )
  }
}
