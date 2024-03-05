import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.secondsRef = React.createRef();
    this.minutesRef = React.createRef();
    this.minuteRef = React.createRef();
    this.hourRef = React.createRef();
  }

  componentDidMount() {
    this.createSpikes();
    this.getTime();
    this.interval = setInterval(this.getTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createSpikes = () => {
    const seconds = this.secondsRef.current;
    const minutes = this.minutesRef.current;

    for (let s = 0; s < 60; s++) {
      let mSpikeEl = document.createElement('i');
      let sSpikeEl = document.createElement('i');
      mSpikeEl.className = 'spike'
      sSpikeEl.className = 'spike'
      mSpikeEl.style.setProperty('--rotate', `${6 * s}deg`);
      sSpikeEl.style.setProperty('--rotate', `${6 * s}deg`);
      mSpikeEl.setAttribute('data-i', s);
      sSpikeEl.setAttribute('data-i', s);

      seconds.append(sSpikeEl);
      minutes.append(mSpikeEl);
    }
  }

  getTime = () => {
    const seconds = this.secondsRef.current;
    const minutes = this.minutesRef.current;
    const minute = this.minuteRef.current;
    const hour = this.hourRef.current;

    let date = new Date(),
        s = date.getSeconds(),
        m = date.getMinutes();

    hour.textContent = date.getHours();
    minute.textContent = m;

    minutes.style.setProperty('--dRotate', `${6 * m}deg`);

    if (s === 0) {
      seconds.classList.add('stop-anim')
    } else {
      seconds.classList.remove('stop-anim')
    }
    if (m === 0) {
      minutes.classList.add('stop-anim')
    } else {
      minutes.classList.remove('stop-anim')
    }

    seconds.style.setProperty('--dRotate', `${6 * s}deg`);
  }

  render() {
    return (
      <div className="clock">
        <div ref={this.secondsRef} className="seconds"></div>
        <div ref={this.minutesRef} className="minutes"></div>
        <div ref={this.minuteRef} className="minute">44</div>
        <div ref={this.hourRef} className="hour"></div>
      </div>
    );
  }
}

export default Clock;