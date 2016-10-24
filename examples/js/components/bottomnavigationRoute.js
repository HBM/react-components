
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Match, Link} from 'react-router'
import Playground from 'component-playground'
import {BottomNavigation, Icon, List, Row} from '../../../'

const bottomNavigation =
`

const links = [
  {
    icon: <Icon.Home />,
    text: 'Home',
    link: '/bottomnavigation/home'
  },
  {
    icon: <Icon.MusicNote />,
    text: 'Music',
    link: '/bottomnavigation/music'
  },
  {
    icon: <Icon.Photo />,
    text: 'Photos',
    link: '/bottomnavigation/photos'
  }
]

const content = (title) => {
  const arr = new Array(100).fill(title)
  return (
    <List>
    {
      arr.map((x, index) => {
        return <Row key={index} primary={x + ' ' + index} />
      })
    }
    </List>
  )
}

const Home = () => content('Home')
const Music = () => content('Music')
const Photos = () => content('Photos')

const BasicExample = () => (
  <HashRouter basename='/bottomnavigation'>
    <div style={{height: '600px', width: '100%', margin: '0 auto', border: '10px solid #ececec'}}>
      <Match pattern='/' render={({location}) => (
        <BottomNavigation location={location} links={links}>
          <Match exactly pattern='/bottomnavigation' render={() => (
            <span>Please select a country from the tabs.</span>
          )} />
          <Match pattern='/bottomnavigation/home' component={Home} />
          <Match pattern='/bottomnavigation/music' component={Music} />
          <Match exactly pattern='/bottomnavigation/photos' component={Photos} />
        </BottomNavigation>
      )} />
    </div>
  </HashRouter>
)

ReactDOM.render(<BasicExample />, mountNode)`

export default class BottomNavigationRoute extends React.Component {

  render () {
    return (
      <div className='BottomNavigationExamples'>
        <section>
          <h2>BottomNavigation</h2>
          <Playground
            codeText={bottomNavigation}
            scope={{React, ReactDOM, HashRouter, Match, Link, BottomNavigation, Icon, List, Row}}
            noRender={false}
            collapsableCode
          />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/cards.html'>
            https://material.google.com/components/cards.html
          </a>
        </section>
      </div>
    )
  }

}