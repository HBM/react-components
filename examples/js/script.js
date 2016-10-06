
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import App from './components/app'
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
import TextfieldMultilineRoute from './components/textfieldMultilineRoute'
import TooltipRoute from './components/tooltipRoute'

// required for tabs component demo
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

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={HomeRoute} />
      <Route path='button' component={ButtonRoute} />
      <Route path='card' component={CardRoute} />
      <Route path='checkbox' component={CheckboxRoute} />
      <Route path='chip' component={ChipRoute} />
      <Route path='icon' component={IconRoute} />
      <Route path='list' component={ListRoute} />
      <Route path='menu' component={MenuRoute} />
      <Route path='modal' component={ModalRoute} />
      <Route path='progress' component={ProgressRoute} />
      <Route path='radiobutton' component={RadiobuttonRoute} />
      <Route path='select' component={SelectRoute} />
      <Route path='slider' component={SliderRoute} />
      <Route path='snackbar' component={SnackbarRoute} />
      <Route path='sparkline' component={SparklineRoute} />
      <Route path='switch' component={SwitchRoute} />
      <Route path='/tabs' component={TabsRoute}>
        <Route path='germany' component={Germany} />
        <Route path='spain' component={Spain} />
        <Route path='sweden' component={Sweden} />
      </Route>
      <Route path='textfield' component={TextfieldRoute} />
      <Route path='textfieldmultiline' component={TextfieldMultilineRoute} />
      <Route path='tooltip' component={TooltipRoute} />
    </Route>
  </Router>
), document.getElementById('react'))
