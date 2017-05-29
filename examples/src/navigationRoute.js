
import React from 'react'
import {HashRouter, NavLink} from 'react-router-dom'
import {Navigation} from 'md-components'

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
            You can add as many sub menues as you like. There is not limit since sub menues simply call themselves when they have links. However sub menues do not have extra paddings and are aligned like their parent. Going mutiple levels deep might confuse the user.
          </p>
          <HashRouter>
            <div style={{position: 'relative'}}>
              <Navigation>
                <NavLink to='/navigation/Overview'>Overview</NavLink>
                <NavLink to='/navigation/about'>About</NavLink>
                <Navigation.Group title='Cars'>
                  <NavLink to='/navigation/tesla'>Tesla</NavLink>
                  <NavLink to='/navigation/audi'>Audi</NavLink>
                </Navigation.Group>
                <Navigation.Group title='Countries'>
                  <NavLink to='/navigation/italy'>Italy</NavLink>
                  <NavLink to='/navigation/france'>France</NavLink>
                </Navigation.Group>
              </Navigation>
            </div>
          </HashRouter>
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
