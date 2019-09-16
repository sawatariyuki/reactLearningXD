import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

class EchartsArea extends Component {

  constructor (props) {
    super(props)
    this.state = {
      timeLineData: []
    }
    this.getOption = this.getOption.bind(this)
  }

  render () {
    return (
      <ReactEcharts
        option={this.getOption(this.props.timeLineData)}
        style={{height: '350px', width: '1000px'}}
        className='echarts-area' />
    )
  }

  getOption (timeLineData) {
    const option = {
      xAxis: {
        type: 'category',
        data: timeLineData.map(item => item.time)
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: timeLineData.map(item => item.apm),
        type: 'line'
      }]
    }
    return option
  }

}

export default EchartsArea