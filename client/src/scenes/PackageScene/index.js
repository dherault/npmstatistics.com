import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'
import color from 'chartjs-color'
import moment from 'moment'

import './index.css'

import API from '../../api'

class PackageScene extends Component {

  componentDidMount() {
    const { packageData } = this.props

    if (!packageData) {
      API.fetchPackage(this.props.match.params.packageId)
    }
  }

  componentDidUpdate() {
    const { packageData, match: { params: { packageId } } } = this.props

    if (!packageData) {
      return API.fetchPackage(packageId)
    }

    if (packageData.error || this.packageId === packageId) return

    this.packageId = packageId

    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif"

    const elementId = 'chart-daily'

    const dailyDownloads = packageData.downloads.map(point => ({
      y: point.downloads,
      t: moment(point.day),
    }))

    const dailyVersions = Object.keys(packageData.time)
    .filter(key => key !== 'created' && key !== 'modified')
    .map(key => ({
      y: 10,
      t: moment(packageData.time[key]),
    }))

    console.log('dailyVersions', dailyVersions)

    if (this.chart) this.chart.destroy()

    this.chart = new Chart(elementId, {
      type: 'line',
      data: {
        datasets: [
          {
            type: 'line',
            data: dailyDownloads,
            backgroundColor: color('goldenrod').alpha(0.5).rgbString(),
            borderColor: 'goldenrod',
            fill: false,
            borderWidth: 1,
            lineTension: 0,
            pointRadius: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 2,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              ticks: {
                source: 'auto',
                autoSkip: true,
              },
              time: {
                tooltipFormat: 'll',
              },
            },
          ],
        },
        tooltips: {
          intersect: false,
          mode: 'index',
        },
      },
    })
  }

  renderTitle() {
    const { match: { params: { packageId } } } = this.props

    return (
      <h1>
        {packageId}
      </h1>
    )
  }

  renderError() {
    return (
      <div className="PackageScene">
        {this.renderTitle()}
        Error
      </div>
    )
  }

  renderNotFound() {
    return (
      <div className="PackageScene">
        {this.renderTitle()}
        The packge does not exist.
      </div>
    )
  }

  renderLoading() {
    return (
      <div className="PackageScene">
        {this.renderTitle()}
        loading...
      </div>
    )
  }

  render() {
    const { packageData } = this.props

    if (!packageData) return this.renderLoading()
    if (packageData.error === 'Not found') return this.renderNotFound()
    if (packageData.error) return this.renderError()

    return (
      <div className="PackageScene">
        {this.renderTitle()}
        <canvas id="chart-daily" className="PackageScene-canvas" />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  packageData: state.packages[props.match.params.packageId],
})

export default connect(mapStateToProps)(PackageScene)
