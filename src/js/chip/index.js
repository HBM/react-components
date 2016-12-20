
import React from 'react'
import Icon from '../icon'

const keyEnter = 13
const keyBackspace = 8
const keyDelete = 46
const keyArrowLeft = 37
const keyArrowRight = 39

const focusLeftOrRight = (event, leftKeys, rightKeys) => {
  // go left
  if (leftKeys.indexOf(event.which) > -1) {
    if (event.target.previousSibling) {
      return event.target.previousSibling.focus()
    }
    return event.target.parentNode.lastChild.focus()
  }
  // go right
  if (rightKeys.indexOf(event.which) > -1) {
    if (event.target.nextSibling) {
      return event.target.nextSibling.focus()
    }
    return event.target.parentNode.firstChild.focus()
  }
}

// input fields which handles all logic
export default class Chip extends React.Component {

  static propTypes = {
    autoFocus: React.PropTypes.bool,
    deletable: React.PropTypes.bool,
    delimiters: React.PropTypes.arrayOf(React.PropTypes.number),
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  static defaultProps = {
    deletable: true,
    delimiters: [keyEnter],
    value: []
  }

  state = {
    inputValue: ''
  }

  onKeyPress = (event) => {
    const text = this.state.inputValue.trim()
    if ((this.props.delimiters.indexOf(event.which) > -1) && text !== '') {
      if (event.which !== keyEnter) {
        // prevent window.history.back() for backspace (for example)
        event.preventDefault()
      }
      // empty input field
      this.setState({
        inputValue: ''
      })
      // notify parent component
      this.props.onChange([
        ...this.props.value,
        {text}
      ])
    }
  }

  // KeyPress event is invoked only for character (printable) keys.
  // That's why we need KeyDown event for backspace and arrow keys.
  onKeyDown = (event) => {
    // toggle through chips when input field is empty and when we have some chips to toggle through
    if (this.state.inputValue !== '' || !this.props.value.length) {
      return
    }
    return focusLeftOrRight(event, [keyBackspace, keyArrowLeft], [keyArrowRight])
  }

  onChange = (event) => {
    this.setState({inputValue: event.target.value})
  }

  onDelete = (target, index) => {
    // remove focused chip
    const value = [
      ...this.props.value.slice(0, index),
      ...this.props.value.slice(index + 1)
    ]
    // focus appropriate element
    if (value.length === 0) {
      // focus input field when all chips are gone
      this.input.focus()
    } else if (value.length === index) {
      // if last chip is deleted select chip to the left
      target.previousSibling.focus()
    }
    // notify parent component
    this.props.onChange(value)
  }

  onWrapperClick = (event) => {
    // do not handle click events on children, e.g. chips
    if (event.target === event.currentTarget && this.input) {
      this.input.focus()
    }
  }

  render () {
    return (
      <div
        className='Chip-wrapper'
        onClick={this.onWrapperClick}
      >
        {this.props.value.map((chip, i) =>
          <Element
            key={i}
            index={i}
            text={chip.text}
            icon={chip.icon}
            onDelete={this.props.onChange && this.props.deletable && this.onDelete}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
        )}
        {this.props.onChange && <input
          className='Chip-input'
          type='text'
          onKeyPress={this.onKeyPress}
          onKeyDown={this.onKeyDown}
          value={this.state.inputValue}
          onChange={this.onChange}
          ref={c => { this.input = c }}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          autoFocus={this.props.autoFocus}
          placeholder={this.props.placeholder}
        />}
      </div>
    )
  }

}

const Element = ({
    autoFocus,
    icon,
    index,
    onBlur,
    onDelete,
    onFocus,
    text
  }) => {
  const textStyle = {
    marginLeft: icon ? 8 : 12,
    marginRight: onDelete ? 0 : 12
  }
  const onKeyDown = (event) => {
    if (onDelete && (event.which === keyBackspace || event.which === keyDelete)) {
      event.preventDefault()
      return onDelete(event.target, index)
    }
    return focusLeftOrRight(event, [keyArrowLeft], [keyArrowRight])
  }

  return (
    <div
      className='Chip'
      tabIndex='0'
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      {icon ? <div className='Chip-icon'>{icon}</div> : null}
      <span style={textStyle}>
        {text}
      </span>
      {onDelete
        ? (
          <button
            type='button'
            tabIndex='-1'
            className='Chip-delete'
            onClick={(event) => {
              onDelete(event.currentTarget.parentElement, index)
            }}
          >
            <Icon.Cancel style={{width: 22, height: 22, display: 'block'}} />
          </button>
        )
        : null
      }
    </div>
  )
}
