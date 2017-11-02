import React, { PropTypes } from 'react'

import Base from './Base'
import TabPanel from './TabPanel'
import Spinner from './Spinner'
import ProfileForm from './form/ProfileForm'

export default class Settings extends Base {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    };
    [
      'handleSetPanel',
      'renderProfile',
      'renderTheme',
      'handleChange',
      'handleCancel',
      'handleSave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.props.loadSettings()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.profile && !nextProps.profile) {
      this.props.loadSettings()
    } else if (!nextProps.localProfile && nextProps.profile) {
      this.props.updateProfile(nextProps.profile)
    } else {
      this.setState({loading: false})
    }
  }

  handleChange (name, value) {
    const { localProfile } = this.props
    const change = Object.assign(localProfile, { [name]: value })
    this.props.updateProfile(change)
  }

  handleSave () {
    this.props.saveProfile(this.props.localProfile)
    this.props.loadSettings()
  }

  handleSetPanel (i) {
    return this.props.setPanelIndex(i)
  }

  handleCancel () {
    this.props.updateProfile(this.props.profile)
  }

  renderProfile () {
    const { loading } = this.state
    if (loading) {
      return (<Spinner />)
    }
    return (
      <div>
        <ProfileForm
          profile={this.props.localProfile}
          onChange={this.handleChange}
          onSubmit={this.handleSave}
          onCancel={this.handleCancel}
        />
      </div>
    )
  }

  renderTheme () {
    return (
      <div><label>themes coming soon!</label></div>
    )
  }

  template (css) {
    const { profile, theme, index, bounds } = this.props
    const tabPanelBounds = Object.assign({}, bounds, { height: bounds.height - 69 })
    return (
      <div className={css('wrap')} style={{height: `${bounds.height}px`}}>
        <header>
          <h1>Settings</h1>
          <hr />
        </header>
        <TabPanel
          index={index}
          labels={['Profile', 'Theme']}
          onSelectPanel={this.handleSetPanel}
          bounds={tabPanelBounds}
          components={[
            this.renderProfile(),
            this.renderTheme()
          ]}
          />
      </div>
    )
  }

  styles () {
    const {bounds} = this.props
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20,
        height: `${bounds.height}px`
      }
    }
  }
}

Settings.PropTypes = {
  settings: PropTypes.object,
  bounds: PropTypes.object
}

Settings.defaultProps = {

}