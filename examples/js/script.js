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
import ProgressRoute from './components/progressRoute'
import RadiobuttonRoute from './components/radiobuttonRoute'
import SelectRoute from './components/selectRoute'
import SliderRoute from './components/sliderRoute'
import SnackbarRoute from './components/snackbarRoute'
import SparklineRoute from './components/sparklineRoute'
import StepperRoute from './components/stepperRoute'
import SwitchRoute from './components/switchRoute'
import TableRoute from './components/tableRoute'
import TabsRoute from './components/tabsRoute'
import TextfieldRoute from './components/textfieldRoute'
import TextareaRoute from './components/textareaRoute'
import TooltipRoute from './components/tooltipRoute'

const sub1 = () => (
  <div>
    <p>
      Navigation submenu #1
    </p>
    <p>
      Checkout the navigation on the left side to see the component in action.
    </p>
  </div>
)

const sub2 = () => (
  <div>
    <p>
      Navigation submenu #2
    </p>
    <p>
      Checkout the navigation on the left side to see the component in action.
    </p>
  </div>
)

const sub3 = () => (
  <div>
    <p>
      Navigation submenu #3
    </p>
    <p>
      Checkout the navigation on the left side to see the component in action.
    </p>
  </div>
)

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
      {
        text: 'Navigation',
        link: '/navigation',
        links: [
          {text: 'submenu #1', link: '/sub1'},
          {text: 'submenu #2', link: '/sub2'},
          {text: 'submenu #3', link: '/sub3'}
        ]
      },
      {text: 'Progress', link: '/progress'},
      {text: 'Radiobutton', link: '/radiobutton'},
      {text: 'Select', link: '/select'},
      {text: 'Slider', link: '/slider'},
      {text: 'Snackbar', link: '/snackbar'},
      {text: 'Sparkline', link: '/sparkline'},
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
        <Match pattern='/navigation/sub1' component={sub1} />
        <Match pattern='/navigation/sub2' component={sub2} />
        <Match pattern='/navigation/sub3' component={sub3} />
        <Match pattern='/progress' component={ProgressRoute} />
        <Match pattern='/radiobutton' component={RadiobuttonRoute} />
        <Match pattern='/select' component={SelectRoute} />
        <Match pattern='/slider' component={SliderRoute} />
        <Match pattern='/snackbar' component={SnackbarRoute} />
        <Match pattern='/sparkline' component={SparklineRoute} />
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
