
import React from 'react'
import Header from '../header'
import Navigation from '../navigation'

const Shell = ({title, subtitle, links, onChange, children}) => (
  <div>
    <Header title={title} subtitle={subtitle} />
    <Navigation onChange={onChange} >
      {links.map((link, index) => React.cloneElement(link, {key: index}))}
    </Navigation>
    <main>
      {children}
    </main>
  </div>
)

export default Shell
