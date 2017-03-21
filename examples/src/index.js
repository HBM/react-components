/* global ga */

import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Match} from 'react-router'
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
        <Match exactly pattern='/' component={HomeRoute} />
        <Match pattern='/bottomnavigation' component={BottomNavigationRoute} />
        <Match pattern='/button' component={ButtonRoute} />
        <Match pattern='/card' component={CardRoute} />
        <Match pattern='/checkbox' component={CheckboxRoute} />
        <Match pattern='/chip' component={ChipRoute} />
        <Match pattern='/header' component={HeaderRoute} />
        <Match pattern='/icon' component={IconRoute} />
        <Match pattern='/list' component={ListRoute} />
        <Match pattern='/menu' component={MenuRoute} />
        <Match pattern='/modal' component={ModalRoute} />
        <Match pattern='/navigation' component={NavigationRoute} />
        <Match pattern='/progress' component={ProgressRoute} />
        <Match pattern='/radiobutton' component={RadiobuttonRoute} />
        <Match pattern='/select' component={SelectRoute} />
        <Match pattern='/slider' component={SliderRoute} />
        <Match pattern='/snackbar' component={SnackbarRoute} />
        <Match pattern='/stepper' component={StepperRoute} />
        <Match pattern='/switch' component={SwitchRoute} />
        <Match pattern='/table' component={TableRoute} />
        <Match pattern='/tabs' component={TabsRoute} />
        <Match pattern='/textfield' component={TextfieldRoute} />
        <Match pattern='/textarea' component={TextareaRoute} />
      </Shell>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
            // <Match pattern='/tooltip' component={TooltipRoute} />
