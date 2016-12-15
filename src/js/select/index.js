
import React from 'react'
import {Motion, spring} from 'react-motion'
import objectAssign from 'object-assign'

// CSS space
const PADDING_TOP = 12
const PADDING_TOP_WITH_LABEL = -12
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
    items: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    selectedIndex: React.PropTypes.number
  }

  static defaultProps = {
    items: ['one', 'two', 'three'],
    placeholder: 'Placeholder',
    selectedIndex: -1
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
   * Make dropdown list as wide as parent placeholder including caret
   */
  componentDidMount () {
    const selectRect = this.ref.getBoundingClientRect()
    this.setState({
      width: selectRect.width
    })
  }

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
    const {selectedIndex, label, disabled} = this.props
    const {open} = this.state
    const empty = selectedIndex === -1
    const text = empty ? this.props.placeholder : this.props.items[selectedIndex]

    return (
      <div className='Select' ref={(c) => { this.ref = c }}>
        {
          label &&
          <span className='Select-label'>{this.props.label}</span>
        }
        <button className='Select-body' onClick={this.open} disabled={disabled}>
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
              items={this.props.items}
              selectedIndex={selectedIndex}
              onClick={this.props.onChange}
              width={this.state.width}
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
    items: React.PropTypes.array.isRequired,
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
    const scrollable = this.props.items.length > MAX_LIST_LENGTH
    const indexWithinFirstTwoItems = index < 2

    if (scrollable && !indexWithinFirstTwoItems) {
      const scrollTop = (LIST_ITEM_HEIGHT * (index - 2))
      this.ref.scrollTop = scrollTop
    }
  }

  /**
   * Handle click on list item
   */
  onClick = (index, event) => {
    event.preventDefault()
    this.props.onClick(index)
  }

  /**
   * Render list component
   */
  render () {
    const {items, selectedIndex} = this.props

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
    if (items.length > MAX_LIST_LENGTH) {
      if (selectedIndex >= 2 && selectedIndex <= items.length - 3) {
        // handle "center" items => always set to third position
        top = -1 * (paddingTop + (LIST_ITEM_HEIGHT * 2))
      } else if (selectedIndex === items.length - 2) {
        // handle second last item
        top = -1 * (paddingTop + (LIST_ITEM_HEIGHT * 3))
      } else if (selectedIndex === items.length - 1) {
        // handle last item
        top = -1 * (paddingTop + (LIST_ITEM_HEIGHT * 4))
      }
    }

    const style = {
      top: top,
      width: this.props.width + (2 * PADDING_LEFT)
    }

    return (
      <ul
        ref={(c) => { this.ref = c }}
        className='Select-list'
        style={objectAssign(style, this.props.style)}
      >
        {items.map((item, i) =>
          <li key={i} className='Select-listItem'>
            <a href
              className='Select-listItemLink'
              onClick={this.onClick.bind(this, i)}
            >
              {item}
            </a>
          </li>
        )}
      </ul>
    )
  }

}
