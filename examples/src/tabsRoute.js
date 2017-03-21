
import React from 'react'
import {HashRouter, Match} from 'react-router'
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
                <Match exactly pattern='/tabs' render={() => (
                  <span>Please select a country from the tabs.</span>
                )} />
                <Match pattern='/tabs/germany' component={Germany} />
                <Match pattern='/tabs/spain' component={Spain} />
                <Match pattern='/tabs/sweden' component={Sweden} />
              </div>
            </div>
          </HashRouter>
        </section>
      </div>
    )
  }
}
