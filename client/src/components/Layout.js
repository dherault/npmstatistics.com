import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GitHubButton from 'react-github-btn'

import './Layout.css'

import history from '../history'

class Layout extends Component {

  state = {
    searchType: 'package',
    search: '',
  }

  handleSelectChange = e => {
    this.setState({
      searchType: e.target.value,
    })
  }

  handleInputChange = e => {
    this.setState({
      search: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { searchType, search } = this.state

    if (search.length === 0) return

    history.push(`/${searchType}/${search}`)
  }

  render() {
    const { children } = this.props
    const { searchType, search } = this.state

    return (
      <>
        <nav className="Layout-nav x4">
          <Link to="/" className="Layout-nav-brand">
            NPM Statistics
          </Link>

          <div className="Layout-nav-github">
            <GitHubButton
              href="https://github.com/dherault/npmstatistics.com"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star dherault/npmstatistics.com on GitHub"
            >
              Star
            </GitHubButton>
          </div>

          <form onSubmit={this.handleSubmit} className="Layout-nav-search x4">
            <select
              value={searchType}
              onChange={this.handleSelectChange}
              className="Layout-nav-select"
            >
              <option value="package">package</option>
              <option value="user">user</option>
            </select>

            <input
              value={search}
              onChange={this.handleInputChange}
              className="Layout-nav-input"
              autoComplete="on"
              autoCorrect="off"
            />
          </form>
        </nav>
        <div className="Layout-content">
          {children}
        </div>
      </>
    )
  }
}

export default Layout
