/**
 * Card component
 */

import React from 'react'

const container = (className) => ({children}) => (
  <div className={className}>
    {children}
  </div>
)

export const Card = container('Card')
export const Actions = container('Card-actions')
export const Title = container('Card-title')
export const Text = container('Card-text')
export const Content = container('Card-content')
