
import React from 'react'
import {TabsControlled} from 'md-components'

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

const countries = [<Germany />, <Spain />, <Sweden />]

export default class TabsRoute extends React.Component {
  state = {
    index: -1
  }

  onChange = index => {
    this.setState({
      index
    })
  }

  render () {
    return (
      <div>
        <section>
          <h2>Tabs</h2>
          <TabsControlled
            index={this.state.index}
            onChange={this.onChange}
          />
          <div style={{margin: '30px 0'}}>
            {countries[this.state.index] || 'Please select a country from the tabs.'}
          </div>
        </section>
      </div>
    )
  }
}
