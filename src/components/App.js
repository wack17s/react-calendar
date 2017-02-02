import React, { Component } from 'react';

import './App.css';
import req from '../req';
import { fillDay, clearAll, fillAll, divide, dayNames } from '../utils';

let mousedown = false;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = divide(req);
  }

  handleDay = (e) => {
    const day = e.target.innerHTML;
    this.setState((prevState) => {
      return {
        [day]: prevState[day].length === 24 ? [] : fillDay()
      }
    });
  };

  handleHour = (e) => {
    const td = e.target.id.split('_');
    const day = td[0];
    const val = {
      bt: parseInt(td[1], 10),
      et: parseInt(td[2], 10)
    };
    this.setState({
      [day]: this.state[day].some(item => item.bt === val.bt && item.et === val.et)
        ? this.state[day].filter(item => item.bt !== val.bt && item.et !== val.et)
        : this.state[day].concat(val)
    });
  };

  handleDown = (e) => {
    e.preventDefault()
    mousedown = true;
  };

  handleUp = (e) => {
    e.preventDefault()
    mousedown = false;
  };

  handleOver = (e) => {
    e.preventDefault()
    if (mousedown) {
      const td = e.target.id.split('_');
      const day = td[0];
      const val = {
        bt: parseInt(td[1], 10),
        et: parseInt(td[2], 10)
      };
      if (!this.state[day].some(item => item.bt === val.bt && item.et === val.et)) {
        this.setState({
          [day]: this.state[day].concat(val)
        });
      }
    }
  };

  handleSave = () => {
    console.log(JSON.stringify(this.state));
  };

  handleClear = () => {
    this.setState(
      clearAll()
    );
  };

  handleFillAll = () => {
    this.setState(
      fillAll()
    );
  };

  render() {

    const style = (clicked) => {
      const color = clicked ? 'grey' : 'white';

      return {backgroundColor: color, height: '40px', width: '20px'};
    };

    const Td = (props) => 
      <td
        id={props.day + '_' + props.bt1 + '_' + props.et1}
        style={style(props.clicked)}
        onMouseDown={this.handleDown}
        onClick={this.handleHour}
        onMouseUp={this.handleUp}
        onMouseOver={this.handleOver}
      ></td>;

    const isClicked = (state, day, n) => {
      return state[day].some(item => item.bt === n * 60 && n * 60 + 59 === item.et);
    };

    const days = (req, day) => {
      const res = [];
      for (let n = 0; n < 24; n++) {
        res.push(
          <Td
            clicked={isClicked(req, day, n)}
            day={day}
            bt1={n*60}
            et1={n*60+59}
            key={day + n}
          />
        );
      }

      return res;
    };

    const week = (req) => {
      const res = [];
      for (let day = 0; day < 7; day++) {
        res.push(
          <tr key={dayNames[day]} >
            <td onClick={this.handleDay} >{dayNames[day]}</td>
            {days(req, dayNames[day])}
          </tr>
        );
      }

      return res;
    };

    const head = () => {
      const res = [];
      for (let n = 1; n <= 24; n++) {
        res.push(<td key={'head_' + n} >{n}</td>);
      }

      return res;
    };

    return (
      <div>
        <table>
          <caption>weekly calendar</caption>
          <thead>
            <tr>
              <td></td>
              {head()}
            </tr>
          </thead>
          <tbody >
            {week(this.state)}
          </tbody>
        </table>
        <button type="button" onClick={this.handleSave} >Save</button>
        <button type="button" onClick={this.handleClear} >Clear all</button>
        <button type="button" onClick={this.handleFillAll} >Fill all</button>
      </div>
      );
  }
}

export default App;
