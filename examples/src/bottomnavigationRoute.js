
import React from 'react'
import {HashRouter, Route, NavLink} from 'react-router-dom'
import {BottomNavigation, BottomNavigationText, Icon, List, Row} from 'md-components'

let links = [
  <NavLink to='/home'>
    <Icon.Home />
    <BottomNavigationText>Home</BottomNavigationText>
  </NavLink>,
  <NavLink to='/music'>
    <Icon.MusicNote />
    <BottomNavigationText>Music</BottomNavigationText>
  </NavLink>,
  <NavLink to='/photos'>
    <Icon.Photo />
    <BottomNavigationText>Photos</BottomNavigationText>
  </NavLink>
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
      <BottomNavigation links={links}>
        <Route path='/home' component={Home} />
        <Route path='/music' component={Music} />
        <Route exact path='/photos' component={Photos} />
      </BottomNavigation>
    </div>
  </HashRouter>
)

export default class BottomNavigationRoute extends React.Component {
  render () {
    return (
      <div className='BottomNavigationExamples'>
        <section>
          <h2>BottomNavigation</h2>
          <BasicExample />
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/bottom-navigation.html'>
            https://material.google.com/components/bottom-navigation.html
          </a>
        </section>
      </div>
    )
  }
}
