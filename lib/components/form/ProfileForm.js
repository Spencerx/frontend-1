import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import ValidInput from './ValidInput'
import ValidTextarea from './ValidTextarea'

import ProfileProps from '../../propTypes/profile'

export default class ProfileForm extends Base {
  template (css) {
    const { profile, onChange } = this.props
    return (
      <div>
        <ValidInput
          name='peername'
          label='Peername'
          value={profile.peername}
          onChange={onChange}
        />
        <ValidInput
          name='name'
          label='Name'
          value={profile.name}
          onChange={onChange}
        />
        <ValidInput
          name='email'
          label='Email'
          value={profile.email}
          onChange={onChange}
        />
        <ValidInput
          name='twitter'
          label='Twitter'
          value={profile.twitter}
          onChange={onChange}
        />
        <ValidInput
          name='homeurl'
          label='Home URL'
          value={profile.homeurl}
          onChange={onChange}
        />
        <ValidTextarea
          name='description'
          label='About Me'
          value={profile.description}
          onChange={onChange}
          small
        />
      </div>
    )
  }
  styles () {
    return {
    }
  }
}

ProfileForm.propTypes = {
  profile: ProfileProps,
  onChange: PropTypes.func.isRequired
}

ProfileForm.defaultProps = {

}
