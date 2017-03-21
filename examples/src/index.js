/* global ga */

import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from 'react-router-dom'
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
import StepperRoute from './stepperRoute'
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

  onChange = (link, sublink) => {
    // use google analytics to track single page apps
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
    if (window.ga) {
      ga('set', 'page', link.link)
      ga('send', 'pageview')
    }
    this.setState({
      title: link.text,
      subtitle: sublink && sublink.text
    })
  }

  render () {
    const links = [
      {text: 'Home', link: '/'},
      {text: 'Bottom Navigation', link: '/bottomnavigation'},
      {text: 'Button', link: '/button'},
      {text: 'Card', link: '/card'},
      {text: 'Checkbox', link: '/checkbox'},
      {text: 'Chip', link: '/chip'},
      {text: 'Header', link: '/header'},
      {text: 'Icon', link: '/icon'},
      {text: 'List', link: '/list'},
      {text: 'Menu', link: '/menu'},
      {text: 'Modal', link: '/modal'},
      {text: 'Navigation', link: '/navigation'},
      {text: 'Progress', link: '/progress'},
      {text: 'Radiobutton', link: '/radiobutton'},
      {text: 'Select', link: '/select'},
      {text: 'Slider', link: '/slider'},
      {text: 'Snackbar', link: '/snackbar'},
      {text: 'Stepper', link: '/stepper'},
      {text: 'Switch', link: '/switch'},
      {text: 'Table', link: '/table'},
      {text: 'Tabs', link: '/tabs'},
      {text: 'Textfield', link: '/textfield'},
      {text: 'Textarea', link: '/textarea'}
      // {text: 'Tooltip', link: '/tooltip'}
    ]
    return (
      <Shell
        links={links}
        title={this.state.title}
        subtitle={this.state.subtitle}
        onChange={this.onChange}
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
        <Route path='/stepper' component={StepperRoute} />
        <Route path='/switch' component={SwitchRoute} />
        <Route path='/table' component={TableRoute} />
        <Route path='/tabs' component={TabsRoute} />
        <Route path='/textfield' component={TextfieldRoute} />
        <Route path='/textarea' component={TextareaRoute} />
      </Shell>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
            // <Match pattern='/tooltip' component={TooltipRoute} />
