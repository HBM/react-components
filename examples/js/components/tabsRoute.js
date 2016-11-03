
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Match} from 'react-router'
import Playground from 'component-playground'
import {Tabs} from '../../../'

const defaultTabs =
`class Germany extends React.Component {
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

class App extends React.Component {

  render () {
    const tabs = [
      {href: '/tabs/germany', text: 'Germany'},
      {href: '/tabs/spain', text: 'Spain'},
      {href: '/tabs/sweden', text: 'Sweden'}
    ]
    return (
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
    )
  }

}

ReactDOM.render(<App />, mountNode)`

export default class TabsRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Tabs</h2>
          <Playground
            docClass={Tabs}
            codeText={defaultTabs}
            scope={{React, ReactDOM, HashRouter, Match, Tabs}}
            noRender={false}
            collapsableCode
          />
        </section>
      </div>
    )
  }

}
