
import React from 'react'
import {HashRouter, Match} from 'react-router'
import {BottomNavigation, Icon, List, Row} from '../../lib'

const links = [
  {
    icon: <Icon.Home />,
    text: 'Home',
    link: '/home'
  },
  {
    icon: <Icon.MusicNote />,
    text: 'Music',
    link: '/music'
  },
  {
    icon: <Icon.Photo />,
    text: 'Photos',
    link: '/photos'
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
      <BottomNavigation links={links}>
        <Match pattern='/home' component={Home} />
        <Match pattern='/music' component={Music} />
        <Match exactly pattern='/photos' component={Photos} />
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
