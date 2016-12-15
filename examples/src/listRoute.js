import React from 'react'
import { List, Row, Icon } from '../../lib'
import {HashRouter, Match} from 'react-router'

const longText = 'This is sometimes a very lengthy text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ita graviter et severe voluptatem secrevit a bono. Aliter homines, aliter philosophos loqui putas oportere? Nunc haec primum fortasse audientis servire debemus'

const One = () => (
  <div>
    One
  </div>
)

const Two = () => (
  <div>
    Two
  </div>
)

export default class ListRoute extends React.Component {

  render () {
    return (
      <div className='ListExamples'>
        <section>
          <h2>Single-line item</h2>
          <List>
            <Row primary='Apple' />
            <Row primary='Banana' />
            <Row primary='Strawberry' />
          </List>
        </section>
        <section>
          <h2>Single-line item with icon</h2>
          <List>
            <Row primary='Apple' icon={<Icon.Assessment />} />
            <Row primary='Banana' icon={<Icon.FilterList />} />
            <Row primary='Strawberry' icon={<Icon.Search />} />
          </List>
        </section>
        <section>
          <h2>Single-line item with avatar</h2>
          <List>
            <Row primary='Alice' avatar='img/alice.jpg' />
            <Row primary='John' avatar='img/john.jpg' />
            <Row primary='Steve' avatar='img/steve.jpg' />
            <Row primary='Claire' avatar='img/claire.jpg' />
          </List>
        </section>
        <section>
          <h2>Single-line item with avatar and icon</h2>
          <List>
            <Row primary='Alice' avatar='img/alice.jpg' icon={<Icon.Star />} />
            <Row primary='John' avatar='img/john.jpg' icon={<Icon.Star fill='orange' />} />
            <Row primary='Steve' avatar='img/steve.jpg' icon={<Icon.Star />} />
            <Row primary='Claire' avatar='img/claire.jpg' icon={<Icon.Star />} />
          </List>
        </section>
        <section>
          <h2>Two-line item</h2>
          <List>
            <Row primary='Apple' secondary='From Belgium' />
            <Row primary='Banana' secondary='From Sweden' />
            <Row primary='Strawberry' secondary={'From Germany. ' + longText} />
          </List>
        </section>
        <section>
          <h2>Two-line item with icon</h2>
          <List>
            <Row primary='Apple' icon={<Icon.Assessment />} secondary='Really fresh' />
            <Row primary='Banana' icon={<Icon.FilterList />} secondary='Really fresh' />
            <Row primary='Strawberry' icon={<Icon.Search />} secondary='Really fresh' />
          </List>
        </section>
        <section>
          <h2>Two-line item with avatar</h2>
          <List>
            <Row
              primary='Alice'
              secondary='This is Alice.'
              avatar='img/alice.jpg'
              />
            <Row
              primary='John'
              secondary='This is John.'
              avatar='img/john.jpg'
              />
            <Row
              primary='Steve'
              secondary={'This is Steve.'}
              avatar='img/steve.jpg'
              />
          </List>
        </section>
        <section>
          <h2>Two-line item with avatar and icon</h2>
          <List>
            <Row
              primary='Alice'
              secondary='This is Alice.'
              avatar='img/alice.jpg'
              icon={<Icon.Assessment />} />
            <Row
              primary='John'
              secondary='This is John.'
              avatar='img/john.jpg'
              icon={<Icon.FilterList />} />
            <Row
              primary='Steve'
              secondary={'This is Steve. ' + longText}
              avatar='img/steve.jpg'
              icon={<Icon.Search />} />
          </List>
        </section>
        <section>
          <h2>Three-line (subheader) item</h2>
          <List>
            <Row primary='Apple' subheader='Try new fruits' secondary='From Belgium' />
            <Row primary='Banana' subheader='Try new fruits' secondary='From Sweden' />
            <Row primary='Strawberry' subheader='Try new fruits' secondary='From Germany' />
          </List>
        </section>
        <section>
          <h2>Three-line (subheader) item with icon</h2>
          <List>
            <Row
              primary='Apple'
              subheader='Try new fruits'
              icon={<Icon.Assessment />}
              secondary='Really fresh' />
            <Row
              primary='Banana'
              subheader='Try new fruits'
              icon={<Icon.FilterList />}
              secondary='Really fresh' />
            <Row
              primary='Strawberry'
              subheader='Try new fruits'
              icon={<Icon.Search />}
              secondary='Really fresh' />
          </List>
        </section>
        <section>
          <h2>Three-line (subheader) item with avatar</h2>
          <List>
            <Row
              primary='Alice'
              subheader='Friend'
              secondary='This is Alice'
              avatar='img/alice.jpg' />
            <Row
              primary='Claire'
              subheader='Friend'
              secondary='This is Clair'
              avatar='img/claire.jpg' />
            <Row
              primary='John'
              subheader='Work'
              secondary='This is John'
              avatar='img/john.jpg' />
            <Row
              primary='Steve'
              subheader='Friend'
              secondary='This is Steve'
              avatar='img/steve.jpg' />
            <Row
              primary='Megan'
              subheader='Work'
              secondary='This is Megan'
              avatar='img/megan.jpg' />
          </List>
        </section>
        <section>
          <h2>Three-line (subheader) item with avatar and icon</h2>
          <List>
            <Row
              primary='Alice'
              subheader='Friend'
              secondary='This is Alice'
              icon={<Icon.Assessment />}
              avatar='img/alice.jpg' />
            <Row
              primary='Claire'
              subheader='Friend'
              secondary='This is Clair'
              icon={<Icon.Assessment />}
              avatar='img/claire.jpg' />
            <Row
              primary='John'
              subheader='Work'
              secondary='This is John'
              icon={<Icon.Assessment />}
              avatar='img/john.jpg' />
            <Row
              primary='Steve'
              subheader='Friend'
              secondary='This is Steve'
              icon={<Icon.Assessment />}
              avatar='img/steve.jpg' />
            <Row
              primary='Megan'
              subheader='Work'
              secondary='This is Megan'
              icon={<Icon.Assessment />}
              avatar='img/megan.jpg' />
          </List>
        </section>
        <section>
          <h2>Custom style</h2>
          <List style={{backgroundColor: 'cyan'}}>
            <Row primary='Apple' />
            <Row primary='Banana' />
            <Row primary='Strawberry' />
          </List>
        </section>
        <section>
          <h2>Selectable (onFocus or onBlur defined on Row)</h2>
          <List>
            <Row primary='Apple' onFocus={() => {}} />
            <Row primary='Banana' onFocus={() => {}} />
            <Row primary='Strawberry' onFocus={() => {}} />
          </List>
        </section>
        <section>
          <h2>Link list (linkTo defined)</h2>
          <HashRouter>
            <div>
              <List>
                <Row primary='One' linkTo='/list/one' />
                <Row primary='Two' linkTo='/list/two' />
              </List>
              <Match exactly pattern='/list' render={() => (
                <span>Please select an item from the list.</span>
              )} />
              <Match pattern='/list/one' component={One} />
              <Match pattern='/list/two' component={Two} />
            </div>
          </HashRouter>
        </section>
        <section>
          <h2>Specification</h2>
          <a href='https://material.google.com/components/lists.html'>
            https://material.google.com/components/lists.html
          </a>
        </section>
      </div>
    )
  }

}
