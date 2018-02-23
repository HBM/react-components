// @flow

import * as React from 'react'
import classnames from 'classnames'

type Props = {
  children: React.Node,
  className: string,
  dense: boolean,
  disabled: boolean,
  filled: boolean,
  name: string,
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
  raised: boolean,
  type: 'submit' | 'reset' | 'button'
}

const Button = (props: Props) => (
  <button
    className={classnames('mdc-Button', {
      'mdc-Button--raised': props.raised,
      'mdc-Button--filled': props.filled,
      'mdc-Button--dense': props.dense
    }, props.className)}
    disabled={props.disabled}
    name={props.name}
    type={props.type}
    onClick={props.onClick}
  >
    {props.children}
  </button>
)

Button.defaultProps = {
  className: '',
  dense: false,
  disabled: false,
  filled: false,
  raised: false,
  type: 'button'
}

export default Button
