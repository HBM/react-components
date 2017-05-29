
import React from 'react'
import {Motion, spring} from 'react-motion'

const PADDING_TOP_WITH_LABEL = -14
const PADDING_LEFT = 16
const LIST_ITEM_HEIGHT = 48

// list length
const MAX_LIST_LENGTH = 5

/**
 * Select component
 */
export default class Select extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    options: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    name: React.PropTypes.string
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

  /**
   * Show list
   */
  open = () => {
    this.setState({
      open: true
    })
    document.addEventListener('click', this.close)
  }

  /**
   * Hide list
   */
  close = () => {
    this.setState({
      open: false
    })
    document.removeEventListener('click', this.close)
  }

  /**
   * Check if Select component is inside table.
   */
  findTableTag = (node) => {
    while (node.parentNode) {
      node = node.parentNode
      if (node.tagName === 'TABLE') {
        return true
      }
    }
    return false
  }

  /**
   * Make dropdown list as wide as parent placeholder including caret
   */
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

  onChange = (item) => this.props.onChange({
    target: {
      name: this.props.name,
      ...item
    }
  })

  /**
   * Component should not update when it is open. In that case it should
   * only update when open state changes.
   * It should not update itself when list is open and value comes in again.
   * This would causes scrolling and that would irritate the user.
   */
  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.open && (nextState.open === this.state.open)) {
      return false
    }
    return true
  }

  render () {
    const {label, disabled, options, value, name} = this.props
    const {open} = this.state
    const selectedIndex = options.findIndex(option => option.value === value)
    const empty = selectedIndex === -1
    const text = empty ? this.props.placeholder : this.props.options[selectedIndex].label

    return (
      <div className='Select' ref={(c) => { this.ref = c }}>
        {
          label &&
          <span className='Select-label'>{this.props.label}</span>
        }
        <button name={name} className='Select-body' onClick={this.open} disabled={disabled}>
          <span className={empty ? 'Select-placeholder' : ''}>
            {text}
          </span>
          <span className='Select-caret' />
        </button>
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
              width={this.state.width}
              isInsideTable={this.state.isInsideTable}
            />
          }
        </Motion>
      </div>
    )
  }
}

/**
 * List component
 */
class List extends React.Component {
  static propTypes = {
    hasLabel: React.PropTypes.bool,
    options: React.PropTypes.array.isRequired,
    isInsideTable: React.PropTypes.bool,
    selectedIndex: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    width: React.PropTypes.number
  }

  /**
   * Scroll to correct list item
   */
  componentDidMount () {
    const index = this.props.selectedIndex

    // create boolean helper variables
    const scrollable = this.props.options.length > MAX_LIST_LENGTH
    const indexWithinFirstTwoItems = index < 2

    if (scrollable && !indexWithinFirstTwoItems) {
      const scrollTop = (LIST_ITEM_HEIGHT * (index - 2))
      this.ref.scrollTop = scrollTop
    }
  }

  /**
   * Handle click on list item
   */
  onClick = (event) => {
    const index = parseInt(event.target.getAttribute('data-id'))
    event.preventDefault()
    this.props.onClick(this.props.options[index])
  }

  /**
   * Render list component
   */
  render () {
    // CSS space
    let PADDING_TOP = 10
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
        className='Select-list'
        style={Object.assign(style, this.props.style)}
      >
        {options.map((item, i) =>
          <li key={i}
            className='Select-listItem'
            data-id={i}
            onClick={this.onClick}
            style={{padding: `0 ${padding}px`}}
          >
            {item.label}
          </li>
        )}
      </ul>
    )
  }
}
