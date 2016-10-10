
import React from 'react'
import {withRouter} from 'react-router'
import {
  Header,
  Navigation
} from '../../../'

class App extends React.Component {

  state = {
    subtitle: 'Home'
  }

  onChange = (link) => {
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
      <div>
        <Header title='HBM/md-components' subtitle={this.state.subtitle} />
        <Navigation links={links} onChange={this.onChange} />
        <main className={this.props.location.pathname.substr(1) || 'home'} >
          {this.props.children}
        </main>
      </div>
    )
  }

}

export default withRouter(App)
