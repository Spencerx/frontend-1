/* globals __BUILD__ */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import SearchBar from '../form/SearchBar'
import ProfilePhoto from '../profile/ProfilePhoto'

import ExternalLink from '../ExternalLink.APP_TARGET'

export default class TopBar extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'handleGoBack',
      'handleGoForward',
      'handleSearch',
      'handleChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    if (this.props.location) {
      this.props.setLocationBarText(this.props.location.pathname)
    }
  }

  componentDidUpdate (prevProps) {
    const location = this.props && this.props.location
    const prevLocation = prevProps && prevProps.location
    if (prevLocation.pathname !== location.pathname && location.pathname !== '/search') {
      this.props.setLocationBarText(location.pathname)
    }

    ReactTooltip.rebuild()
  }

  handleGoBack () {
    this.props.history && this.props.history.goBack()
    // this.props.goBack && this.props.goBack()
  }
  handleGoForward () {
    this.props.history && this.props.history.goForward()
  }

  handleSearch (e) {
    if (e.key === 'Enter') {
      const { searchString } = this.props

      if (searchString.indexOf('/') === 0 && searchString.indexOf(' ') < 0) {
        this.props.history.push(searchString)
        return
      }
      this.props.setSearch(searchString)
      this.props.history.push({
        pathname: '/search',
        search: searchString ? '?q=' + searchString : ''
      })
    }
  }

  handleChange (e) {
    this.props.setLocationBarText(e.target.value)
    // only run search on 'Enter'
    // if (e.target.value.indexOf('/') !== 0) { this.props.runDatasetSearch(e.target.value) }
  }

  render () {
    const { layout, sessionProfile, searchString, profile, location } = this.props
    const current = (path) => {
      return (path === location.pathname) ? 'top-bar-current' : ''
    }

    return (
      <div className='top-bar-wrap' style={layout}>
        {__BUILD__.ELECTRON && <div className='top-bar-title-bar'>
          <p>qri</p>
        </div>}
        <div className='top-bar-no-shrink'>
          {__BUILD__.ELECTRON && <div className='top-bar-item-spacing'>
            <a className='top-bar-nav-button top-bar-first-item' onClick={this.handleGoBack} data-tip='forward'>left</a>
            <a className='top-bar-nav-button' onClick={this.handleGoForward} data-tip='back'>right</a>
          </div>}
          {sessionProfile && <Link className={`top-bar-nav-button top-bar-item-spacing ${current('/collection')}`} to='/collection' data-tip='collection'>layers</Link>}
          <Link className={`top-bar-nav-button top-bar-item-spacing ${current('/network')}`} to='/network' data-tip='network'>usergroup</Link>
          {(sessionProfile && !__BUILD__.READONLY) &&
          <Link className={`top-bar-nav-button top-bar-item-spacing ${current('/edit')}`} to='/edit' data-tip='edit'>edit</Link>}
        </div>
        <SearchBar onKeyUp={this.handleSearch} searchString={searchString} onChange={this.handleChange} />
        <div className='top-bar-help'>
          <ExternalLink href='https://discord.gg/etap8Gb' className='top-bar-nav-button top-bar-item-spacing' target='_blank' data-tip='discord'>chat</ExternalLink>
          <ExternalLink href='https://qri.io/docs' className='top-bar-nav-button top-bar-item-spacing' target='_blank' data-tip='documentation'>help</ExternalLink>
          {sessionProfile && <Link className='top-bar-nav-button top-bar-item-spacing' to='/profile' data-tip='profile'><ProfilePhoto profile={profile} size='sm' /></Link>}
        </div>
        <ReactTooltip place='bottom' type='dark' effect='solid' delayShow='1000' />
      </div>
    )
  }
}

TopBar.propTypes = {
  sessionProfile: PropTypes.string,
  setViewMode: PropTypes.func,
  history: PropTypes.object
}

TopBar.defaultProps = {
}
