/* global describe, xit, it */

import assert from 'assert'
import React from 'react'
import Tabs from '../'
import {mount} from 'enzyme'
import {MemoryRouter, NavLink} from 'react-router-dom'

/**
 * Create parent component and include button.
 */
// class App extends React.Component {
//   render () {
//     var tabs = [
//       {href: '/one', text: 'one'},
//       {href: '/two', text: 'two'},
//       {href: '/three', text: 'three'}
//     ]
//     return (
//       <div>
//         <header>
//           <Tabs tabs={tabs} />
//         </header>
//         <div className='content'>
//           {this.props.children}
//         </div>
//       </div>
//     )
//   }
// }
// /**
//  * Tab One content
//  */
// class One extends React.Component {
//   render () {
//     return (
//       <div>
//         One
//       </div>
//     )
//   }
// }
// /**
//  * Tab Two content
//  */
// class Two extends React.Component {
//   render () {
//     return (
//       <div>
//         Two
//       </div>
//     )
//   }
// }
// /**
//  * Tab Three content
//  */
// class Three extends React.Component {
//   render () {
//     return (
//       <div>
//         Three
//       </div>
//     )
//   }
// }

/**
 * Define routes
 */
// var routes = (
//   <Router history={hashHistory}>
//     <Route path='/' component={App}>
//       <Route path='/one' component={One} />
//       <Route path='/two' component={Two} />
//       <Route path='/three' component={Three} />
//     </Route>
//   </Router>
// )

describe('Tabs', () => {
  it('should work', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Tabs />
      </MemoryRouter>
    )
    assert.equal(wrapper.find('.mdc-Tabs').length, 1)
  })

  it('should make the first tab active by default', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/one']}>
        <Tabs tabs={[
          <NavLink to='/one' />,
          <NavLink to='/two' />
        ]} />
      </MemoryRouter>
    )
    assert(wrapper.find('.mdc-Tabs-Item a').at(0).hasClass('active'))
  })

  xit('should render given tabs', () => {

  })

  xit('should change the url on tab click', () => {

  })

  xit('should change the content on tab click', () => {

  })

  xit('should move the inkbar on tab click', () => {

  })

  xit('should highlight the currently active tab', () => {

  })

  xit('should render the inkbar at the right position on initial rendering', () => {

  })
})
