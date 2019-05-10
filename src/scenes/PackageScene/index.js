import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.css'

import API from '../../api'

class PackageScene extends Component {

  componentDidMount() {
    const { packageData } = this.props

    if (!packageData) {
      API.fetchPackage(this.props.match.params.packageId)
    }
  }

  render() {
    const { packageData } = this.props

    return (
      <div className="PackageScene">
        <pre>{JSON.stringify(packageData, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  packageData: state.packages[props.match.params.packageId],
})

export default connect(mapStateToProps)(PackageScene)
