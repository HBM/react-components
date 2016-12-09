
import React from 'react'
import classNames from 'classnames'
import accept from 'attr-accept'
import Button from '../button/'

export default class Upload extends React.Component {

  static propTypes = {
    accept: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    buttonText: React.PropTypes.string,
    textBefore: React.PropTypes.string,
    textAfter: React.PropTypes.string
  }

  static defaultProps = {
    accept: '*',
    disabled: false,
    buttonText: 'Select File',
    textBefore: '',
    textAfter: 'or drag file in this area'
  }

  state = {
    isOverWindow: false,
    isOverDropzone: false
  }

  // counter is an internal variable which is updated during drag enter and drag leave events.
  // the problem is that the browser fires drag leave and drag enter events
  // when dragging over a child element of window.
  counter = 0

  // prevent drag and drop of multiple files
  // this only works in chrome since Firefox does not allow access to files while dragging
  isInvalid (event) {
    const edt = event.dataTransfer
    // event.dataTransfer is empty during tests. no need to check every time in the following if ...
    if (!edt) return false
    // check for disabled
    if (this.props.disabled) return true
    // check firefox
    if (edt.mozItemCount && edt.mozItemCount !== 1) {
      return true
    }
    // check chrome
    if (edt.items && edt.items.length !== 1) {
      return true
    }
    // check mime types. only works in chrome. files is a FileList (no real array)
    const unaccepted = edt.files && Array.prototype.slice.call(edt.files).every((file) =>
      !accept(file, this.props.accept)
    )
    return unaccepted
  }

  onDragEnter = (event) => {
    if (this.isInvalid(event)) return
    // prevent event to allow drop
    event.preventDefault()
    this.setState({
      isOverDropzone: true
    })
  }

  onDragOver = (event) => {
    if (this.isInvalid(event)) return
    // If you want to allow a drop, you must prevent the default handling by cancelling the event
    // https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations#Specifying_Drop_Targets
    event.preventDefault()
  }

  onDragLeave = (event) => {
    event.preventDefault()
    this.setState({
      isOverDropzone: false
    })
  }

  onDocumentDragEnter = (event) => {
    // prevent drag & drop of multiple items
    if (this.isInvalid(event)) return
    ++this.counter
    this.setState({
      isOverWindow: true
    })
  }

  onDocumentDragLeave = (event) => {
    event.preventDefault()
    if (--this.counter > 0) {
      return
    }
    // update state only when really leaving the document
    // not when leaving document children
    this.setState({
      isOverWindow: false
    })
  }

  onChange = (event) => {
    event.preventDefault()
    this.counter = 0
    // event.target.files is from standard file upload dialog
    // event.dataTransfer.files is from drap and drop api
    let files = event.target.files || event.dataTransfer.files
    this.setState({
      isOverWindow: false,
      isOverDropzone: false
    })
    // call callback to send files to parent
    this.props.onChange(files)
  }

  onClick = (event) => {
    this.fileInput.click()
  }

  componentDidMount () {
    document.addEventListener('dragenter', this.onDocumentDragEnter)
    document.addEventListener('dragleave', this.onDocumentDragLeave)
  }

  componentWillUnmount () {
    document.removeEventListener('dragenter', this.onDocumentDragEnter)
    document.removeEventListener('dragleave', this.onDocumentDragLeave)
  }

  render () {
    const klass = classNames('Upload', {
      'is-disabled': this.props.disabled,
      'is-over-window': this.state.isOverWindow,
      'is-over-dropzone': this.state.isOverDropzone
    })

    return (
      <div
        className={klass}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onChange}
      >
        <div className='Upload-textBefore'>
          {this.props.textBefore}
        </div>
        <Button raised onClick={this.onClick} disabled={this.props.disabled}>
          {this.props.buttonText}
        </Button>
        <div className='Upload-textAfter'>
          {this.props.textAfter}
        </div>
        <input
          accept={this.props.accept}
          className='Upload-fileInput'
          disabled={this.props.disabled}
          type='file'
          onChange={this.onChange}
          ref={(el) => (this.fileInput = el)}
        />
      </div>
    )
  }

}
