import React, { Component, Fragment } from 'react'
import EchartsArea from './EchartsArea'

class APM extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hitCount: 0,
      isKeyPressed: false,
      timeLineData: []
    }
    // bind handles
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.reset = this.reset.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.timeLineData.length === 0) {
      return true
    }
    if (nextState.timeLineData.length !== this.state.timeLineData.length) {
      return true
    }
    return false
  }

  componentDidMount () {
    document.addEventListener("keydown", this.handleKeyDown)
    document.addEventListener("keyup", this.handleKeyUp)
  }

  render () {
    return (
      <Fragment>
        <div>{this.state.hitCount}hits</div>
        <div>{this.state.apm}hit/m</div>
        <button onClick={this.reset}>Reset</button>
        <EchartsArea timeLineData={this.state.timeLineData} />
      </Fragment>
    )
  }

  handleKeyDown () {
    this.setState(prevState => {
      const hitCount = prevState.hitCount
      let timeLineData = [...prevState.timeLineData]
      let newState = {}
      if (prevState.isKeyPressed) {
        return prevState
      }
      newState.hitCount = hitCount + 1
      newState.isKeyPressed = true
      const now = new Date().getTime()
      if (!prevState.startTime) {
        newState.startTime = now
      } else {
        // calc apm
        newState.apm = newState.hitCount * 60000 / (now - prevState.startTime)
        timeLineData.push({time: now, apm: newState.apm})
        newState.timeLineData = timeLineData
      }
      return newState
    })
  }

  handleKeyUp () {
    this.setState(() => ({isKeyPressed: false}))
  }

  reset () {
    this.replaceState(() => ({}))
  }

}

export default APM