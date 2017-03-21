
import React from 'react'
import {Icon} from '../../lib'

export default class HomeRoute extends React.Component {
  render () {
    return (
      <div className='Home'>
        <div className='Hero'>
          <div className='Hero-logo'>
            <h1>
              <span>md</span>
              <span>components</span>
            </h1>
          </div>
          <h4 className='Hero-sponsor'>powered by <a href='https://www.hbm.com'><Icon.Logo fill='#333' /></a></h4>
          <div className='Hero-tagline'>
            Material Design components for React
          </div>
          <div className='Hero-links'>
            <iframe
              src='https://ghbtns.com/github-btn.html?user=hbm&repo=md-components&type=star&count=true&size=large'
              frameBorder='0'
              scrolling='0'
              height='30px'
              width='130px'
            />
          </div>
        </div>
      </div>
    )
  }
}
