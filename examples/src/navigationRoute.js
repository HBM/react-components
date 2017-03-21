
import React from 'react'
import {HashRouter} from 'react-router-dom'
import {Navigation} from '../../lib'

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
              <Navigation links={[
                {text: 'Home', link: '/navigation'},
                {text: 'About', link: '/navigation/about'},
                {
                  text: 'Cars',
                  link: '/navigation/cars',
                  links: [
                    {
                      text: 'Tesla',
                      link: '/tesla',
                      links: [
                        {
                          text: 'Model S',
                          link: '/model-s',
                          links: [
                            {text: '60', link: '/60'},
                            {text: '60D', link: '/60d'},
                            {text: '75', link: '/75'},
                            {text: '75D', link: '/75d'},
                            {text: '90D', link: '/90d'},
                            {text: 'P100D', link: '/p100d'}
                          ]
                        },
                        {
                          text: 'Model X',
                          link: '/model-x',
                          links: [
                            {text: 'Ultra White Seats', link: '/white'},
                            {text: 'Tan Leather Seats', link: '/tan'},
                            {text: 'Black Leather Seats', link: '/black'}
                          ]
                        },
                        {
                          text: 'Model 3',
                          link: '/model-3',
                          links: [
                            {text: 'Hardware', link: '/hardware'},
                            {text: 'Safety', link: '/safety'},
                            {text: 'Range', link: '/range'}
                          ]
                        }
                      ]
                    },
                    {text: 'Audi', link: '/audi'}
                  ]
                }
              ]} />
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
