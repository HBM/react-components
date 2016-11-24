/* globals getComputedStyle */
import React from 'react'
import classnames from 'classnames'

const TextfieldWrapper = ({
  children,
  defaultValue,
  error,
  float,
  icon,
  label,
  value,
  length
}) => {
  const isValueEmpty = value === undefined || value === ''
  const isDefaultValueEmpty = defaultValue === undefined || defaultValue === ''
  const empty = isValueEmpty && isDefaultValueEmpty
  let valueLength = 0
  if (!isDefaultValueEmpty) {
    valueLength = defaultValue.length
  }
  if (!isValueEmpty) {
    valueLength = value.length
  }
  const showCounter = valueLength > length
  return (
    <label className={classnames('Textfield', {'Textfield--nolabel': !label})} >
      <div className='Textfield-icon-wrapper'>
        {
          icon
          ? <div className='Textfield-icon'>{icon}</div>
          : null
        }
        <div className='Textfield-wrapper'>
          {children}
          <span
            className={classnames('Textfield-label', {
              'Textfield-label--floatup': (!float || !empty)},
              {'Textfield-error': showCounter}
            )}
          >
            {label}
          </span>
          <div className='Textfield-states'>
            <span className='Textfield-error'>{error}</span>
            {
              length
              ? <span className={classnames('Textfield-char-counter', {
                'Textfield-error': showCounter})}>{valueLength} / {length}</span>
              : null
            }
          </div>
        </div>
      </div>
    </label>
  )
}

export const Textfield = ({float, error, length, ...rest}) => (
  <TextfieldWrapper
    defaultValue={rest.defaultValue}
    error={error}
    float={float}
    icon={rest.icon}
    label={rest.label}
    value={rest.value}
    length={length}
  >
    <input
      className={classnames('Textfield-input', {
        'Textfield-input--error': error
      })}
      {...rest}
    />
  </TextfieldWrapper>
)

Textfield.propTypes = {
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  float: React.PropTypes.bool,
  icon: React.PropTypes.element,
  label: React.PropTypes.string,
  length: React.PropTypes.number,
}

Textfield.defaultProps = {
  autoFocus: false,
  disabled: false,
  float: true,
  readOnly: false,
  type: 'text'
}

export class Textarea extends React.Component {

  resize = ({target}) => {
    const borderBottomHeight = 1
    const prevHeight = target.style.height
    // temporarily reset to auto to force re-calc of target.scrollHeight for shrinken input ("deleting text")
    target.style.height = 'auto'
    const newHeight = target.scrollHeight + borderBottomHeight
    if (this.props.maxRows) {
      const _getComputedStyle = this.props.getComputedStyle || getComputedStyle
      // relies on the line-height css style to be given in px
      const maxHeight = (this.props.maxRows + 1) * _getComputedStyle(target)['line-height'].split('px')[0]
      if (newHeight < maxHeight) {
        target.style.height = `${newHeight}px`
      } else {
        target.style.height = prevHeight
      }
    } else {
      target.style.height = `${newHeight}px`
    }
  }

  render () {
    const {
      autoFocus,
      defaultValue,
      disabled,
      error,
      float,
      icon,
      label,
      length,
      name,
      onChange,
      placeholder,
      readOnly,
      resizable,
      rows,
      spellCheck,
      value
    } = this.props

    return (
      <TextfieldWrapper defaultValue={defaultValue} error={error} float={float} icon={icon} label={label} value={value} length={length}>
        <textarea
          autoFocus={autoFocus}
          className={classnames('Textfield-input', {
            'Textfield-input--error': error
          })}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
          onChange={onChange}
          onInput={this.resize}
          placeholder={placeholder}
          readOnly={readOnly}
          rows={rows}
          style={{resize: resizable ? 'vertical' : 'none', boxSizing: 'border-box', overflowY: 'hidden'}}
          spellCheck={spellCheck}
          value={value}
        />
      </TextfieldWrapper>
    )
  }
}

Textarea.propTypes = {
  autoFocus: React.PropTypes.bool,
  defaultValue: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  disabled: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  float: React.PropTypes.bool,
  icon: React.PropTypes.element,
  label: React.PropTypes.string,
  length: React.PropTypes.number,
  maxRows: React.PropTypes.number,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  resizable: React.PropTypes.bool,
  rows: React.PropTypes.number,
  spellCheck: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
}

Textarea.defaultProps = {
  autoFocus: false,
  disabled: false,
  float: true,
  readOnly: false,
  resizable: false,
  rows: 2
}
