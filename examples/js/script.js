/* global ga */

import React from 'react'
import ReactDOM from 'react-dom'
import {Match} from 'react-router'
import {Shell} from '../../'
import BottomNavigationRoute from './components/bottomnavigationRoute'
import ButtonRoute from './components/buttonRoute'
import CardRoute from './components/cardRoute'
import CheckboxRoute from './components/checkboxRoute'
import ChipRoute from './components/chipRoute'
import HeaderRoute from './components/headerRoute'
import HomeRoute from './components/homeRoute'
import IconRoute from './components/iconRoute'
import ListRoute from './components/listRoute'
import MenuRoute from './components/menuRoute'
import ModalRoute from './components/modalRoute'
import NavigationRoute from './components/navigationRoute'
import ProgressRoute from './components/progressRoute'
import RadiobuttonRoute from './components/radiobuttonRoute'
import SelectRoute from './components/selectRoute'
import SliderRoute from './components/sliderRoute'
import SnackbarRoute from './components/snackbarRoute'
import StepperRoute from './components/stepperRoute'
import SwitchRoute from './components/switchRoute'
import TableRoute from './components/tableRoute'
import TabsRoute from './components/tabsRoute'
import TextfieldRoute from './components/textfieldRoute'
import TextareaRoute from './components/textareaRoute'
import TooltipRoute from './components/tooltipRoute'

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
      {text: 'Textarea', link: '/textarea'},
      {text: 'Tooltip', link: '/tooltip'}
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
        <Match pattern='/tooltip' component={TooltipRoute} />
      </Shell>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('react'))
