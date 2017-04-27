/* global ga */

import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Route, NavLink, HashRouter} from 'react-router-dom'
import {Shell} from '../../lib'
import BottomNavigationRoute from './bottomnavigationRoute'
import ButtonRoute from './buttonRoute'
import CardRoute from './cardRoute'
import CheckboxRoute from './checkboxRoute'
import ChipRoute from './chipRoute'
import HeaderRoute from './headerRoute'
import HomeRoute from './homeRoute'
import IconRoute from './iconRoute'
import ListRoute from './listRoute'
import MenuRoute from './menuRoute'
import ModalRoute from './modalRoute'
import NavigationRoute from './navigationRoute'
import ProgressRoute from './progressRoute'
import RadiobuttonRoute from './radiobuttonRoute'
import SelectRoute from './selectRoute'
import SliderRoute from './sliderRoute'
import SnackbarRoute from './snackbarRoute'
// import StepperRoute from './stepperRoute'
import SwitchRoute from './switchRoute'
import TableRoute from './tableRoute'
import TabsRoute from './tabsRoute'
import TextfieldRoute from './textfieldRoute'
import TextareaRoute from './textareaRoute'
// import TooltipRoute from './tooltipRoute'

class App extends React.Component {
  state = {
    title: 'HBM/md-components',
    subtitle: ''
  }

  onLinkChange = event => {
    const link = event.currentTarget
    // use google analytics to track single page apps
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
    if (window.ga) {
      ga('set', 'page', link.href)
      ga('send', 'pageview')
    }
    this.setState({
      title: 'md-components',
      subtitle: link.text
    })
  }

  componentDidMount () {
    this.setState({
      subtitle: document.querySelector('a.active').text
    })
  }

  render () {
    const links = [
      <NavLink to='/' exact >Home</NavLink>,
      <NavLink to='/bottomnavigation' >Bottom Navigation</NavLink>,
      <NavLink to='/button' >Button</NavLink>,
      <NavLink to='/card' >Card</NavLink>,
      <NavLink to='/checkbox' >Checkbox</NavLink>,
      <NavLink to='/chip' >Chip</NavLink>,
      <NavLink to='/header' >Header</NavLink>,
      <NavLink to='/icon' >Icon</NavLink>,
      <NavLink to='/list' >List</NavLink>,
      <NavLink to='/menu' >Menu</NavLink>,
      <NavLink to='/modal' >Modal</NavLink>,
      <NavLink to='/navigation' >Navigation</NavLink>,
      <NavLink to='/progress' >Progress</NavLink>,
      <NavLink to='/radiobutton' >Radiobutton</NavLink>,
      <NavLink to='/select' >Select</NavLink>,
      <NavLink to='/slider' >Slider</NavLink>,
      <NavLink to='/snackbar' >Snackbar</NavLink>,
      <NavLink to='/switch' >Switch</NavLink>,
      <NavLink to='/table' >Table</NavLink>,
      <NavLink to='/tabs'>Tabs</NavLink>,
      <NavLink to='/textfield' >Textfield</NavLink>,
      <NavLink to='/textarea' >Textarea</NavLink>
    ].map(link => React.cloneElement(link, {onClick: this.onLinkChange}))

    return (
      <HashRouter>
        <Shell
          links={links}
          title={this.state.title}
          subtitle={this.state.subtitle}
        >
          <Route exact path='/' component={HomeRoute} />
          <Route path='/bottomnavigation' component={BottomNavigationRoute} />
          <Route path='/button' component={ButtonRoute} />
          <Route path='/card' component={CardRoute} />
          <Route path='/checkbox' component={CheckboxRoute} />
          <Route path='/chip' component={ChipRoute} />
          <Route path='/header' component={HeaderRoute} />
          <Route path='/icon' component={IconRoute} />
          <Route path='/list' component={ListRoute} />
          <Route path='/menu' component={MenuRoute} />
          <Route path='/modal' component={ModalRoute} />
          <Route path='/navigation' component={NavigationRoute} />
          <Route path='/progress' component={ProgressRoute} />
          <Route path='/radiobutton' component={RadiobuttonRoute} />
          <Route path='/select' component={SelectRoute} />
          <Route path='/slider' component={SliderRoute} />
          <Route path='/snackbar' component={SnackbarRoute} />
          <Route path='/switch' component={SwitchRoute} />
          <Route path='/table' component={TableRoute} />
          <Route path='/tabs' component={TabsRoute} />
          <Route path='/textfield' component={TextfieldRoute} />
          <Route path='/textarea' component={TextareaRoute} />
        </Shell>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
