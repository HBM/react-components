/**
 * Card component
 */

import React from 'react'
import classNames from 'classnames'

const container = (name) => ({children, className}) => (
  <div className={classNames(name, className)}>
    {children}
  </div>
)

export const Card = container('mdc-Card')
export const Actions = container('mdc-Card-actions')
export const Title = container('mdc-Card-title')
export const Text = container('mdc-Card-text')
export const Content = container('mdc-Card-content')
