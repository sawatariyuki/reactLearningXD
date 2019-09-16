import React, { Component, Fragment } from 'react'

class APM extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hitCount: 0,
      isKeyPressed: false
    }
    // bind handles
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.reset = this.reset.bind(this)
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
      </Fragment>
    )
  }

  handleKeyDown () {
    this.setState(prevState => {
      const hitCount = prevState.hitCount
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