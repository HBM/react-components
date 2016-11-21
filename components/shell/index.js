
import React from 'react'
import {HashRouter} from 'react-router'
import {Header, Navigation} from '../../'

const Shell = ({title, subtitle, links, onChange, children}) => (
  <HashRouter>
    <div>
      <Header title={title} subtitle={subtitle} />
      <Navigation links={links} onChange={onChange} />
      <main>
        {children}
      </main>
    </div>
  </HashRouter>
)

export default Shell
