/* globals getComputedStyle */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextfieldWrapper = ({
  children,
  defaultValue,
  error,
  float,
  icon,
  label,
  value,
  length,
  htmlFor,
  suffix,
  onSuffixSize,
  dense
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
    <label className={classnames('mdc-Textfield', {'mdc-Textfield--nolabel': !label})} htmlFor={htmlFor}>
      <div className='mdc-Textfield-icon-wrapper'>
        {
          icon
            ? <div className='mdc-Textfield-icon'>{icon}</div>
            : null
        }
        <div className='mdc-Textfield-wrapper'>
          {
            suffix
              ? <div
                className={classnames('mdc-Textfield-suffix', {
                  'mdc-Textfield-suffix--dense': dense
                })}
                ref={node => node && onSuffixSize(node.getClientRects()[0])}
              >
                {suffix}
              </div>
              : null
          }
          {children}
          <span
            className={classnames('mdc-Textfield-label', {
              'mdc-Textfield-label--dense': dense,
              'mdc-Textfield-label--floatup': (!float || !empty),
              'mdc-Textfield-error': showCounter
            })}
          >
            {label}
          </span>
          <div className='mdc-Textfield-states'>
            <span className='mdc-Textfield-error'>{error}</span>
            {
              length
                ? <span className={classnames('mdc-Textfield-char-counter', {
                  'mdc-Textfield-error': showCounter})}>{valueLength} / {length}</span>
                : null
            }
          </div>
        </div>
      </div>
    </label>
  )
}

export const Textfield = ({float, error, length, htmlFor, inputRef, suffix, dense, ...rest}) => {
  let inputNode
  let suffixRect
  const patchInputPadding = _suffixRect => {
    suffixRect = _suffixRect
  }
  const ref = node => {
    inputNode = node
    if (inputRef) {
      inputRef(node)
    }
    if (suffixRect && inputNode) {
      inputNode.style.paddingRight = `${suffixRect.width + 12}px`
      inputNode.style.boxSizing = 'border-box'
    }
  }
  return (
    <TextfieldWrapper
      defaultValue={rest.defaultValue}
      error={error}
      float={float}
      icon={rest.icon}
      label={rest.label}
      value={rest.value}
      length={length}
      htmlFor={htmlFor}
      suffix={suffix}
      onSuffixSize={patchInputPadding}
      dense={dense}
    >
      <input
        className={classnames('mdc-Textfield-input', {
          'mdc-Textfield-input--dense': dense,
          'mdc-Textfield-input--error': error
        })}
        ref={ref}
        {...rest}
      />
    </TextfieldWrapper>
  )
}

Textfield.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  float: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
  length: PropTypes.number
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

  handleInput = (event) => {
    this.props.onInput && this.props.onInput(event)
    this.resize(event)
  }

  render () {
    const {
      defaultValue,
      error,
      float,
      icon,
      label,
      length,
      resizable,
      value,
      htmlFor,
      ...rest
    } = this.props

    return (
      <TextfieldWrapper
        defaultValue={defaultValue}
        error={error}
        float={float}
        icon={icon}
        label={label}
        value={value}
        length={length}
        htmlFor={htmlFor}
      >
        <textarea
          className={classnames('mdc-Textfield-input', {
            'mdc-Textfield-input--error': error
          })}
          defaultValue={defaultValue}
          onInput={this.handleInput}
          style={{resize: resizable ? 'vertical' : 'none', boxSizing: 'border-box', overflowY: 'hidden'}}
          value={value}
          {...rest}
        />
      </TextfieldWrapper>
    )
  }
}

Textarea.propTypes = {
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  float: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
  length: PropTypes.number,
  maxRows: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  resizable: PropTypes.bool,
  rows: PropTypes.number,
  spellCheck: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
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
