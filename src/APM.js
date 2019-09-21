import React, { Component, Fragment } from 'react';
import EchartsArea from './EchartsArea';

class APM extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      hitCount: 0,
      isKeyPressed: false,
      timeLineData: [],
    };
=======

  constructor (props) {
    super(props)
    this.state = this.getInitialState()
>>>>>>> e54b56c1897012fe6a04e0f45898cc5297a7863b
    // bind handles
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.reset = this.reset.bind(this);
  }

<<<<<<< HEAD
  shouldComponentUpdate(nextProps, nextState) {
=======
  getInitialState () {
    return {
      hitCount: 0,
      isKeyPressed: false,
      timeLineData: [],
      startTime: null,
      apm: 0
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
>>>>>>> e54b56c1897012fe6a04e0f45898cc5297a7863b
    if (nextState.timeLineData.length === 0) {
      return true;
    }
    if (nextState.timeLineData.length !== this.state.timeLineData.length) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  render() {
    return (
      <>
        <div>
          {this.state.hitCount}
          hits
        </div>
        <div>
          {this.state.apm}
          hit/m
        </div>
        <button onClick={this.reset}>Reset</button>
        <EchartsArea timeLineData={this.state.timeLineData} />
      </>
    );
  }

  handleKeyDown() {
    this.setState((prevState) => {
      const { hitCount } = prevState;
      const timeLineData = [...prevState.timeLineData];
      const newState = {};
      if (prevState.isKeyPressed) {
        return prevState;
      }
      newState.hitCount = hitCount + 1;
      newState.isKeyPressed = true;
      const now = new Date().getTime();
      if (!prevState.startTime) {
        newState.startTime = now;
      } else {
        // calc apm
        newState.apm = (newState.hitCount * 60000) / (now - prevState.startTime);
        timeLineData.push({ time: now, apm: newState.apm });
        newState.timeLineData = timeLineData;
      }
      return newState;
    });
  }

  handleKeyUp() {
    this.setState(() => ({ isKeyPressed: false }));
  }

<<<<<<< HEAD
  reset() {
    this.replaceState(() => ({}));
=======
  reset () {
    this.setState(() => this.getInitialState())
>>>>>>> e54b56c1897012fe6a04e0f45898cc5297a7863b
  }
}

export default APM;
