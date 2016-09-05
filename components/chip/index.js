
import React from 'react'

const keyEnter = 13
const keyBackspace = 8
const keyDelete = 46
const keyArrowLeft = 37
const keyArrowRight = 39

// input fields which handles all logic
export default class Chip extends React.Component {

  static propTypes = {
    delimiters: React.PropTypes.arrayOf(React.PropTypes.number),
    onChange: React.PropTypes.func,
    initialValues: React.PropTypes.arrayOf(React.PropTypes.string)
  }

  static defaultProps = {
    onChange: () => {},
    delimiters: [keyEnter]
  }

  constructor (props) {
    super(props)
    const chipFromString = (str) => {
      return {text: str}
    }
    this.state = {
      value: '',
      // chips is an array ob objects with keys text, ...
      chips: props.initialValues && props.initialValues.map(chipFromString) || []
    }
  }

  onKeyPress = (event) => {
    if ((this.props.delimiters.indexOf(event.which) > -1) && this.state.value.trim() !== '') {
      if (event.which !== keyEnter) {
        event.preventDefault()
      }
      this.setState({
        value: '',
        chips: [...this.state.chips, {
          text: this.state.value.trim()
        }]
      }, () => {
        this.callOnChange()
      })
    }
  }

  callOnChange = () => {
    this.props.onChange(this.state.chips.map(c => c.text))
  }

  // KeyPress event is invoked only for character (printable) keys.
  // That's why we need KeyDown event for backspace and arrow keys.
  onKeyDown = (event) => {
    // toggle through chips when input field is empty and when we have some chips to toggle through
    if (this.state.value !== '' || !this.state.chips.length) {
      return
    }
    // go left
    if (event.which === keyBackspace || event.which === keyArrowLeft) {
      return this[`element#${this.state.chips.length - 1}`].focus()
    }
    // go right
    if (event.which === keyArrowRight) {
      return this[`element#${0}`].focus()
    }
  }

  onChange = (event) => {
    const {value} = event.target
    this.setState({value})
  }

  onDelete = (index) => {
    // remove focused chip
    this.setState({
      chips: [...this.state.chips.slice(0, index), ...this.state.chips.slice(index + 1)]
    }, () => {
      // callback function is executed once setState is completed and the component is re-rendered.
      if (this.state.chips.length === 0) {
        // focus input field when all chips are gone
        this.input.focus()
      } else if (this.state.chips.length === index) {
        // if last chip is deleted select chip to the left
        this[`element#${index - 1}`].focus()
      } else {
        // focus chip to the right
        this[`element#${index}`].focus()
      }
      this.callOnChange()
    })
  }

  onChipArrowLeft = (index) => {
    if (index === 0) {
      this.input.focus()
    } else {
      this[`element#${index - 1}`].focus()
    }
  }

  onChipArrowRight = (index) => {
    if (index === this.state.chips.length - 1) {
      this.input.focus()
    } else {
      this[`element#${index + 1}`].focus()
    }
  }

  onWrapperClick = (event) => {
    // do not handle click events on children, e.g. chips
    if (event.target === event.currentTarget) {
      this.input.focus()
    }
  }

  render () {
    return (
      <div
        className='Chip-wrapper'
        onClick={this.onWrapperClick}
      >
        {this.state.chips.map((chip, i) =>
          <Element
            key={i}
            index={i}
            text={chip.text}
            onDelete={this.onDelete}
            onArrowLeft={this.onChipArrowLeft}
            onArrowRight={this.onChipArrowRight}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            ref={c => { this[`element#${i}`] = c }}
          />
        )}
        <input
          className='Chip-input'
          type='text'
          onKeyPress={this.onKeyPress}
          onKeyDown={this.onKeyDown}
          value={this.state.value}
          onChange={this.onChange}
          ref={c => { this.input = c }}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          autoFocus={this.props.autoFocus}
        />
      </div>
    )
  }

}

class Element extends React.Component {

  static propTypes = {
    autoFocus: React.PropTypes.bool,
    icon: React.PropTypes.string,
    onDelete: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    text: React.PropTypes.string
  }

  static defaultProps = {
    autoFocus: false,
    text: 'Chip'
  }

  focus = () => {
    this.chipRef.focus()
  }

  render () {
    const {text, onDelete, icon, index, onArrowLeft, onArrowRight, onBlur, onFocus} = this.props
    const textStyle = {
      marginLeft: icon ? 8 : 12,
      marginRight: onDelete ? 0 : 12
    }
    const button = (
      <button
        tabIndex='-1'
        className='Chip-delete'
        onClick={() => { onDelete(index) }}
      >
        &times;
      </button>
    )

    return (
      <div
        className='Chip'
        tabIndex='0'
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(event) => {
          if (event.which === keyBackspace || event.which === keyDelete) {
            event.preventDefault()
            return onDelete(index)
          }
          if (event.which === keyArrowLeft) {
            return onArrowLeft(index)
          }
          if (event.which === keyArrowRight) {
            return onArrowRight(index)
          }
        }}
        ref={c => { this.chipRef = c }}
      >
        {icon ? <div className='Chip-icon'>{icon}</div> : null}
        <span style={textStyle}>
          {text}
        </span>
        {onDelete ? button : null}
      </div>
    )
  }

}
