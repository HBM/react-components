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

  test = () => {
    console.log('test')
  }

  render () {
    const links = [
      <NavLink to='/' exact onClick={this.onLinkChange} >Home</NavLink>,
      <NavLink to='/bottomnavigation' onClick={this.onLinkChange} >Bottom Navigation</NavLink>,
      <NavLink to='/button' onClick={this.onLinkChange} >Button</NavLink>,
      <NavLink to='/card' onClick={this.onLinkChange} >Card</NavLink>,
      <NavLink to='/checkbox' onClick={this.onLinkChange} >Checkbox</NavLink>,
      <NavLink to='/chip' onClick={this.onLinkChange} >Chip</NavLink>,
      <NavLink to='/header' onClick={this.onLinkChange} >Header</NavLink>,
      <NavLink to='/icon' onClick={this.onLinkChange} >Icon</NavLink>,
      <NavLink to='/list' onClick={this.onLinkChange} >List</NavLink>,
      <NavLink to='/menu' onClick={this.onLinkChange} >Menu</NavLink>,
      <NavLink to='/modal' onClick={this.onLinkChange} >Modal</NavLink>,
      <NavLink to='/navigation' onClick={this.onLinkChange} >Navigation</NavLink>,
      <NavLink to='/progress' onClick={this.onLinkChange} >Progress</NavLink>,
      <NavLink to='/radiobutton' onClick={this.onLinkChange} >Radiobutton</NavLink>,
      <NavLink to='/select' onClick={this.onLinkChange} >Select</NavLink>,
      <NavLink to='/slider' onClick={this.onLinkChange} >Slider</NavLink>,
      <NavLink to='/snackbar' onClick={this.onLinkChange} >Snackbar</NavLink>,
      <NavLink to='/switch' onClick={this.onLinkChange} >Switch</NavLink>,
      <NavLink to='/table' onClick={this.onLinkChange} >Table</NavLink>,
      <NavLink to='/tabs'>Tabs</NavLink>,
      <NavLink to='/textfield' onClick={this.onLinkChange} >Textfield</NavLink>,
      <NavLink to='/textarea' onClick={this.onLinkChange} >Textarea</NavLink>
    ]
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
