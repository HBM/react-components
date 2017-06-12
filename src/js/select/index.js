
import React from 'react'
import PropTypes from 'prop-types'
import {Motion, spring} from 'react-motion'
import keycode from 'keycode'
import classnames from 'classnames'

const PADDING_TOP_WITH_LABEL = -12
const PADDING_LEFT = 16
const LIST_ITEM_HEIGHT = 48

// list length
const MAX_LIST_LENGTH = 5

export default class Select extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string
  }

  static defaultProps = {
    options: [
      {value: 'one', label: 'one'},
      {value: 'two', label: 'two'},
      {value: 'three', label: 'three'}
    ],
    placeholder: 'Placeholder',
    value: ''
  }

  state = {
    open: false
  }

  onKeyDown = event => {
    if (event.which === keycode('enter') || event.which === keycode('space')) {
      // prevent page scroll and space
      event.preventDefault()
      this.open()
    }
  }

  open = () => {
    this.setState({
      open: true
    })
    document.addEventListener('click', this.close)
  }

  close = () => {
    this.setState({
      open: false
    })
    document.removeEventListener('click', this.close)
  }

  findTableTag = (node) => {
    while (node.parentNode) {
      node = node.parentNode
      if (node.tagName === 'TABLE') {
        return true
      }
    }
    return false
  }

  componentDidMount () {
    const selectRect = this.ref.getBoundingClientRect()

    const isInsideTable = this.findTableTag(this.ref)

    this.setState({
      isInsideTable,
      width: selectRect.width
    })

    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const {width} = this.ref.getBoundingClientRect()
    this.setState({
      width
    })
  }

  onChange = (item) => {
    this.props.onChange({
      target: {
        name: this.props.name,
        ...item
      }
    })
  }

  onEnter = item => {
    this.props.onChange({
      target: {
        name: this.props.name,
        ...item
      }
    })
    this.onEscape()
  }

  onEscape = () => {
    this.close()
    this.button.focus()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.open && (nextState.open === this.state.open)) {
      return false
    }
    return true
  }

  render () {
    const {label, disabled, options, value} = this.props
    const {open} = this.state
    const selectedIndex = options.findIndex(option => option.value === value)
    const empty = selectedIndex === -1
    const text = empty ? this.props.placeholder : this.props.options[selectedIndex].label

    return (
      <div
        className={classnames('mdc-Select', {
          'is-insideTable': this.state.isInsideTable
        })}
        ref={(c) => { this.ref = c }}
      >
        {
          label &&
          <span className='mdc-Select-label'>{this.props.label}</span>
        }
        <div
          tabIndex='0'
          ref={elem => { this.button = elem }}
          className='mdc-Select-body'
          disabled={disabled}
          onClick={this.open}
          onKeyDown={this.onKeyDown}
        >
          <span className={empty ? 'mdc-Select-placeholder' : ''}>
            {text}
          </span>
          <span className='mdc-Select-caret' />
        </div>
        <Motion style={{
          opacity: spring(open ? 1 : 0)
        }}>
          {style =>
            open &&
            <List
              style={{
                opacity: style.opacity
              }}
              hasLabel={!!this.props.label}
              options={this.props.options}
              selectedIndex={selectedIndex}
              onClick={this.onChange}
              onEnter={this.onEnter}
              width={this.state.width}
              isInsideTable={this.state.isInsideTable}
              onEscape={this.onEscape}
            />
          }
        </Motion>
      </div>
    )
  }
}

class List extends React.Component {
  static propTypes = {
    hasLabel: PropTypes.bool,
    options: PropTypes.array.isRequired,
    isInsideTable: PropTypes.bool,
    selectedIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    width: PropTypes.number
  }

  componentDidMount () {
    const index = this.props.selectedIndex

    // create boolean helper variables
    const scrollable = this.props.options.length > MAX_LIST_LENGTH
    const indexWithinFirstTwoItems = index < 2

    if (scrollable && !indexWithinFirstTwoItems) {
      const scrollTop = (LIST_ITEM_HEIGHT * (index - 2))
      this.ref.scrollTop = scrollTop
    }

    const focus = index >= 0 ? index : 0
    this[`li${focus}`].focus()
  }

  onClick = event => {
    const index = parseInt(event.target.getAttribute('data-id'))
    this.props.onClick(this.props.options[index])
  }

  onBlur = event => {
    // close list when focus is outside of list
    if (event.relatedTarget && !event.relatedTarget.classList.contains('mdc-Select-listItem')) {
      this.props.onEscape()
    }
  }

  onKeyDown = event => {
    const index = parseInt(event.target.getAttribute('data-id'))
    if (event.which === keycode('enter')) {
      return this.props.onEnter(this.props.options[index])
    }
    if (event.which === keycode('escape')) {
      return this.props.onEscape()
    }
    if (event.which === keycode('down')) {
      event.preventDefault()
      if (event.target.nextSibling) {
        return event.target.nextSibling.focus()
      }
    }
    if (event.which === keycode('up')) {
      event.preventDefault()
      if (event.target.previousSibling) {
        return event.target.previousSibling.focus()
      }
    }
  }

  render () {
    // CSS space
    let PADDING_TOP = 12
    if (this.props.isInsideTable) {
      // when select component is inside a table cell we have to remove
      // border bottom, padding top and padding bottom.
      // this changes the location of the text.
      // that leads to the list menu / overlay no being directly on top of the text.
      // we therefore have to modify the padding top to fix the overlay position.
      PADDING_TOP = 17
    }

    const {options, selectedIndex} = this.props

    // handle list absolute position top
    const paddingTop = this.props.hasLabel ? PADDING_TOP_WITH_LABEL : PADDING_TOP

    let top
    if (selectedIndex === -1) {
      // set position to first element, i.e. selectedIndex = 0
      top = -1 * paddingTop
    } else {
      top = -1 * (paddingTop + (LIST_ITEM_HEIGHT * selectedIndex))
    }

    // handle scrollable lists with more than 5 list items
    if (options.length > MAX_LIST_LENGTH) {
      if (selectedIndex >= 2 && selectedIndex <= options.length - 3) {
        // handle "center" items => always set to third position
        top = -1 * (paddingTop + (LIST_ITEM_HEIGHT * 2))
      } else if (selectedIndex === options.length - 2) {
        // handle second last item
        top = -1 * (paddingTop + (LIST_ITEM_HEIGHT * 3))
      } else if (selectedIndex === options.length - 1) {
        // handle last item
        top = -1 * (paddingTop + (LIST_ITEM_HEIGHT * 4))
      }
    }

    let width = this.props.width + (2 * PADDING_LEFT)
    let left = this.props.isInsideTable ? -17 : -16
    let padding = 16

    // check if select overlay is wider than window which would cause horizontal overflow
    // if so decrease padding left and right from 16px to 8px
    // adjust absolute position left and inner link padding accordingly
    if (width > document.body.clientWidth) {
      width = this.props.width + PADDING_LEFT
      left = -8
      padding = 8
    }

    const style = {top, width, left}

    return (
      <ul
        ref={(c) => { this.ref = c }}
        className='mdc-Select-list'
        style={Object.assign(style, this.props.style)}
      >
        {options.map((item, i) =>
          <li key={i}
            tabIndex='0'
            className='mdc-Select-listItem'
            data-id={i}
            onClick={this.onClick}
            style={{padding: `0 ${padding}px`}}
            onKeyDown={this.onKeyDown}
            onBlur={this.onBlur}
            ref={elem => { this[`li${i}`] = elem }}
          >
            {item.label}
          </li>
        )}
      </ul>
    )
  }
}
