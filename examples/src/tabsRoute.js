
import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import {Tabs} from '../../lib'

class Germany extends React.Component {
  render () {
    return (
      <div>
        Germany
      </div>
    )
  }
}

class Spain extends React.Component {
  render () {
    return (
      <div>
        Spain
      </div>
    )
  }
}

class Sweden extends React.Component {
  render () {
    return (
      <div>
        Sweden
      </div>
    )
  }
}

export default class TabsRoute extends React.Component {
  render () {
    const tabs = [
      {href: '/tabs/germany', text: 'Germany'},
      {href: '/tabs/spain', text: 'Spain'},
      {href: '/tabs/sweden', text: 'Sweden'}
    ]
    return (
      <div>
        <section>
          <h2>Tabs</h2>
          <HashRouter>
            <div>
              <Tabs tabs={tabs} />
              <div style={{padding: '30px 0'}}>
                <Route exact path='/tabs' render={() => (
                  <span>Please select a country from the tabs.</span>
                )} />
                <Route path='/tabs/germany' component={Germany} />
                <Route path='/tabs/spain' component={Spain} />
                <Route path='/tabs/sweden' component={Sweden} />
              </div>
            </div>
          </HashRouter>
        </section>
      </div>
    )
  }
}
