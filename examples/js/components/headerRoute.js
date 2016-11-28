
import React from 'react'
import Playground from 'component-playground'
import {Header, Icon} from '../../../'

const defaultHeader =
`
<Header title='title' subtitle='subtitle' />
`

const headerWithColorAndChildren =
`
<Header title='title' subtitle='subtitle' className='custom'>
  <Icon.Button>
    <Icon.Search fill='#fff' />
  </Icon.Button>
  <Icon.Button>
    <Icon.Person fill='#fff' />
  </Icon.Button>
  <Icon.Button>
    <Icon.Language fill='#fff' />
  </Icon.Button>
</Header>
`

export default class HeaderRoute extends React.Component {

  render () {
    return (
      <div className='HeaderRoute'>
        <section>
          <h2>Header component</h2>
          <p>
            The header component content has some left margin on large screens. It allows the navigation component to be on top of the header without hiding content. On smaller screens the margin is gone and just enough space is left to show the hamburger button.
          </p>
          <Playground
            docClass={Header}
            codeText={defaultHeader}
            scope={{React, Header}}
            collapsableCode
          />
        </section>
        <section>
          <h2>Advanced header</h2>
          <p>
            The advanced header has a custom CSS class name. It allows setting custom background and font colors. It also has some buttons with icons on the right side of the header.
          </p>
          <Playground
            codeText={headerWithColorAndChildren}
            scope={{React, Header, Icon}}
            collapsableCode
          />
        </section>
        <section>
          <p>Specification</p>
          <a href='http://www.google.com/design/spec/layout/metrics-keylines.html#metrics-keylines-keylines-spacing'>
            http://www.google.com/design/spec/layout/metrics-keylines.html#metrics-keylines-keylines-spacing
          </a>
        </section>
      </div>
    )
  }

}
