import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class Online extends Base {
  template (css) {
    const { online, style, small, blue } = this.props
    const className = small ? css('small') : css('regular')
    const iconStyle = online ? 'connected' : ''
    const textStyle = blue ? 'linkMedium' : ''
    return (
      <div className={className} style={style}>
        <span className={`icon-inline ${iconStyle} ${small ? css('small') : ''}`}>{online ? 'flash' : 'hyphen'}</span>
        <span className={`${textStyle} ${css('text')}`}>{ online ? '  online' : '  offline' }</span>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      online: {
        color: palette.online,
        margin: 0
      },
      offline: {
        color: palette.primaryLight,
        margin: 0
      },
      text: {
        marginLeft: 5,
        position: 'relative',
        top: -2
      },
      small: {
        fontSize: 14,
        margin: 0
      },
      regular: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 0
      }
    }
  }
}

Online.propTypes = {
  online: PropTypes.bool,
  style: PropTypes.object,
  small: PropTypes.bool
}

Online.defaultProps = {
}
