
import React from 'react'
import classnames from 'classnames'

const Textfield = ({
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
          <input
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
            autoFocus={autoFocus}
            className={classnames('Textfield-input', {
              'Textfield-input--error': (error || showCounter)
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
          <span
            className={classnames('Textfield-label',
              {'Textfield-label--floatup': (!float || !empty)},
              {'Textfield-error': showCounter})}
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

Textfield.propTypes = {
  autoCapitalize: React.PropTypes.string,
  autoComplete: React.PropTypes.string,
  autoCorrect: React.PropTypes.string,
  autoFocus: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  float: React.PropTypes.bool,
  icon: React.PropTypes.element,
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
  spellCheck: React.PropTypes.string,
  type: React.PropTypes.oneOf(['text', 'password', 'email', 'search', 'tel', 'url', 'number']),
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  length: React.PropTypes.number,
  defaultValue: React.PropTypes.oneOfType([
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

export default Textfield
