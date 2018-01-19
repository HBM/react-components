
import React from 'react'
import {ExpansionPanel, Card, Text, Checkbox} from 'md-components'

export default class ExpansionPanelRoute extends React.Component {
  state = {
    selected: [
      {name: 'apple', checked: false},
      {name: 'pear', checked: false},
      {name: 'banana', checked: false},
      {name: 'lemon', checked: false},
      {name: 'plum', checked: false}
    ]
  }

  onChange = ({target}) => {
    const selected = [...this.state.selected].map(s => {
      if (target.name === s.name) {
        s.checked = target.checked
      }
      return s
    })
    this.setState({selected})
  }

  render () {
    const selection = this.state.selected.filter(s => s.checked)
    const t1 = <div>Fruits: {selection.length} selected</div>
    return (
      <div>
        <section>
          <Card className='ExpansionPanel-previous'>
            <Text>
              Top card content
            </Text>
          </Card>
          <ExpansionPanel top={t1}>
            <div style={{padding: 16}}>
              {this.state.selected.map(s => (
                <Checkbox
                  key={s.name}
                  onChange={this.onChange}
                  checked={s.checked}
                  name={s.name}
                  label={s.name}
                />
              ))}
            </div>
          </ExpansionPanel>
          <Card>
            <Text>
              Bottom card content
            </Text>
          </Card>
        </section>
        <section>
          <h2>Dense</h2>
          <Card className='ExpansionPanel-previous'>
            <Text>
              Top card content
            </Text>
          </Card>
          <ExpansionPanel top={t1} dense>
            <div style={{padding: 16}}>
              {this.state.selected.map(s => (
                <Checkbox
                  key={s.name}
                  onChange={this.onChange}
                  checked={s.checked}
                  name={s.name}
                  label={s.name}
                />
              ))}
            </div>
          </ExpansionPanel>
          <Card>
            <Text>
              Bottom card content
            </Text>
          </Card>
        </section>
      </div>
    )
  }
}
