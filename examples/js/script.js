/* global ga */

import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Match} from 'react-router'
import ButtonRoute from './components/buttonRoute'
import CardRoute from './components/cardRoute'
import CheckboxRoute from './components/checkboxRoute'
import ChipRoute from './components/chipRoute'
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
import SwitchRoute from './components/switchRoute'
import TabsRoute from './components/tabsRoute'
import TextfieldRoute from './components/textfieldRoute'
import TextareaRoute from './components/textareaRoute'
import TooltipRoute from './components/tooltipRoute'

import {
  Header,
  Navigation
} from '../../'

class App extends React.Component {

  state = {
    subtitle: 'Home'
  }

  onChange = (link) => {
    // use google analytics to track single page apps
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
    if (typeof ga !== 'undefined') {
      ga('set', 'page', link.link)
      ga('send', 'pageview')
    }
    this.setState({
      subtitle: link.text
    })
  }

  render () {
    const links = [
      {text: 'Home', link: '/'},
      {text: 'Button', link: '/button'},
      {text: 'Card', link: '/card'},
      {text: 'Checkbox', link: '/checkbox'},
      {text: 'Chip', link: '/chip'},
      {text: 'Icon', link: '/icon'},
      {text: 'List', link: '/list'},
      {text: 'Menu', link: '/menu'},
      {text: 'Modal', link: '/modal'},
      {text: 'Progress', link: '/progress'},
      {text: 'Radiobutton', link: '/radiobutton'},
      {text: 'Select', link: '/select'},
      {text: 'Slider', link: '/slider'},
      {text: 'Snackbar', link: '/snackbar'},
      {text: 'Sparkline', link: '/sparkline'},
      {text: 'Switch', link: '/switch'},
      {text: 'Tabs', link: '/tabs'},
      {text: 'Textfield', link: '/textfield'},
      {text: 'Textarea', link: '/textarea'},
      {text: 'Tooltip', link: '/tooltip'}
    ]

    return (
      <HashRouter>
        <div>
          <Header title='HBM/md-components' subtitle={this.state.subtitle} />
          {/* wrap navigation into <Match /> to get access to location for componentDidMount */}
          <Match pattern='/' render={({location}) => (
            <Navigation location={location} links={links} onChange={this.onChange} />
          )} />
          <main>
            <Match exactly pattern='/' component={HomeRoute} />
            <Match pattern='/button' component={ButtonRoute} />
            <Match pattern='/card' component={CardRoute} />
            <Match pattern='/checkbox' component={CheckboxRoute} />
            <Match pattern='/chip' component={ChipRoute} />
            <Match pattern='/icon' component={IconRoute} />
            <Match pattern='/list' component={ListRoute} />
            <Match pattern='/menu' component={MenuRoute} />
            <Match pattern='/modal' component={ModalRoute} />
            <Match pattern='/progress' component={ProgressRoute} />
            <Match pattern='/radiobutton' component={RadiobuttonRoute} />
            <Match pattern='/select' component={SelectRoute} />
            <Match pattern='/slider' component={SliderRoute} />
            <Match pattern='/snackbar' component={SnackbarRoute} />
            <Match pattern='/sparkline' component={SparklineRoute} />
            <Match pattern='/switch' component={SwitchRoute} />
            <Match pattern='/tabs' component={TabsRoute} />
            <Match pattern='/textfield' component={TextfieldRoute} />
            <Match pattern='/textarea' component={TextareaRoute} />
            <Match pattern='/tooltip' component={TooltipRoute} />
          </main>
        </div>
      </HashRouter>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('react'))
