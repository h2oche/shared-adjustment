import React, { Component } from 'react';

export class Timer extends Component {
  state = {
    leftSeconds: 0,
  }

  key = null;

  formatLeftTime = () => {
    let td = new Date(new Date(2019, 3, 1).getTime() + this.state.leftSeconds);
    return `${td.getHours()}시간 ${td.getMinutes()}분 ${td.getSeconds()}초`;
  }

  componentWillMount() {
    this.key = setInterval(() => {
      const {startAt} = this.props;
      const endAt = startAt + 1000 * 60 * 90;
      let leftSeconds = endAt - new Date().getTime();

      if(leftSeconds < 0) {
        this.props.end();
        clearInterval(this.key);
      }
      else
        this.setState({leftSeconds});
    }, 1000);
  }

  componentWillUnmount() {
    if(this.key) clearInterval(this.key);
  }

  render() {
    return (
      <div>
        남은시간 : {this.formatLeftTime()}
      </div>
    )
  }
}

export default Timer
