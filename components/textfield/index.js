
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

export const Textfield = ({
  autoCapitalize,
  autoComplete,
  autoCorrect,
  autoFocus,
  defaultValue,
  disabled,
  error,
  float,
  icon,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  spellCheck,
  type,
  length,
  value
}) => {
  return (
    <TextfieldWrapper defaultValue={defaultValue} error={error} float={float} icon={icon} label={label} value={value} length={length}>
      <input
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        className={classnames('Textfield-input', {
          'Textfield-input--error': error
        })}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={spellCheck}
        type={type}
        value={value}
      />
    </TextfieldWrapper>
  )
}

Textfield.propTypes = {
  autoCapitalize: React.PropTypes.string,
  autoComplete: React.PropTypes.string,
  autoCorrect: React.PropTypes.string,
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
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  spellCheck: React.PropTypes.bool,
  type: React.PropTypes.oneOf(['text', 'password', 'email', 'search', 'tel', 'url', 'number']),
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
}

Textfield.defaultProps = {
  autoFocus: false,
  disabled: false,
  float: true,
  readOnly: false,
  type: 'text'
}

export const TextfieldMultiline = ({
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
  spellCheck,
  value
}) => {
  const newlines = (value || defaultValue || '').match(/\n/g)
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
        placeholder={placeholder}
        readOnly={readOnly}
        style={{resize: resizable ? 'vertical' : 'none'}}
        rows={(newlines ? newlines.length : 0) + 1}
        spellCheck={spellCheck}
        value={value}
      />
    </TextfieldWrapper>
  )
}

TextfieldMultiline.propTypes = {
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
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  resizable: React.PropTypes.bool,
  spellCheck: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
}

TextfieldMultiline.defaultProps = {
  autoFocus: false,
  disabled: false,
  float: true,
  readOnly: false,
  resizable: false
}
