
import React from 'react'
import Playground from 'component-playground'
import {HashRouter} from 'react-router'
import {Navigation} from '../../../'

const defaultNavigation =
`
<HashRouter>
  <div style={{position: 'relative'}}>
    <Navigation links={[
      {text: 'Home', link: '/'},
      {text: 'About', link: '/about'},
      {text: 'Settings', link: '/settings', links: [
        {text: 'Device', link: '/device'},
        {text: 'Ethernet', link: '/ethernet'}
      ]}
    ]} />
  </div>
</HashRouter>
`

export default class NavigationRoute extends React.Component {

  render () {
    return (
      <div className='NavigationRoute'>
        <section>
          <h2>Navigation</h2>
          <p>
            The navigation component is visible on large devices. It is automatically hidden on small devices and a hamburger button is displayed, which shows it on click.
          </p>
          <p>
            The max. level of nesting is currently two. You can have a main menu and each menu item can have multiple sub menu items.
          </p>
          <Playground
            docClass={Navigation}
            codeText={defaultNavigation}
            scope={{React, Navigation, HashRouter}}
            collapsableCode
          />
        </section>
        <section>
          <p>
            Specification
          </p>
          <p>
            <a href='https://material.google.com/patterns/navigation-drawer.html'>
              https://material.google.com/patterns/navigation-drawer.html
            </a>
          </p>
          <p>
            <a href='https://material.google.com/patterns/navigation.html'>
              https://material.google.com/patterns/navigation.html
            </a>
          </p>
          <p>
            <a href='https://material.google.com/layout/structure.html'>
              https://material.google.com/layout/structure.html
            </a>
          </p>
        </section>
      </div>
    )
  }

}
