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

export const Card = container('Card')
export const Actions = container('Card-actions')
export const Title = container('Card-title')
export const Text = container('Card-text')
export const Content = container('Card-content')
