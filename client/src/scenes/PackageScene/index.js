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
    if (this.hasCharts) return

    Chart.defaults.global.defaultFontFamily = "'Lato', sans-serif"

    this.hasCharts = true

    const { packageData } = this.props

    const elementId = 'chart-daily'

    const dailyDownloads = packageData.downloads.map(point => ({
      y: point.downloads,
      t: moment(point.day),
    }))

    this.dailyChart = new Chart(elementId, {
      type: 'line',
      data: {
        datasets: [
          {
            data: dailyDownloads,
            backgroundColor: color('goldenrod').alpha(0.5).rgbString(),
            borderColor: 'goldenrod',
            type: 'line',
            pointRadius: 0,
            fill: false,
            borderWidth: 1,
            lineTension: 0,
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
        Not found
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
