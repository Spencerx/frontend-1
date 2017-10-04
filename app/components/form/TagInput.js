import React, { PropTypes } from 'react'

// TODO - work in progress
class TagInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { tagString: '' };
    [
      'handleOnChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.setState({ tagString: this.props.value.join(', ')})
  }

  handleOnChange (e) {
    this.setState({ tagString: e.target.value })
    let tags = e.target.value.trim().split(',').map(i => { return i.trim() }).filter(i => i)
    console.log(tags)
    this.props.onChange(this.props.name, tags, e)
  }

  render () {
    const { label, name, showError, error, value, placeholder, onChange, helpText, showHelpText } = this.props
    return (
      <div className={(error && showError) ? 'validFormField form-group has-error' : 'validFormField form-group'}>
        {label ? <label className='control-label' htmlFor={name}>{label}</label> : undefined }
        <input
          id={name}
          name={name}
          type='text'
          className='form-control'
          value={this.state.tagString}
          placeholder={placeholder}
          onChange={(e) => this.handleOnChange(e)}
        />
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <i className='help hint'>{helpText}</i>}
      </div>
    )
  }
}

TagInput.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // an error message to displacy
  error: PropTypes.string,
  // value to display in the field
  value: PropTypes.arrayOf(PropTypes.string),
  // placeholder text for an empty field. default: ""
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool
}

TagInput.defaultProps = {
  name: undefined,
  error: undefined,
  showError: true,
  placeholder: ''
}

export default TagInput