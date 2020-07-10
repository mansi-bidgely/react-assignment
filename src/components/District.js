import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { StateCases } from "./StateCases.js";
import "./style.scss";
import {
  stateClickData,
  tableDataRender,
  handleClickData,
} from "../helpers/apiData.js";
import "./style.scss";

class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateName: null,
      stateConfirm: null,
      stateActive: null,
      stateRecover: null,
      stateDeath: null,
      dateCurrent: null,
      dataAll: [],
    };
  }

  componentDidMount() {
    let today = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let time = today.getHours() + ":" + today.getMinutes();
    let val =
      today.getDate() +
      " " +
      months[today.getMonth()] +
      " " +
      today.getFullYear();
    this.setState({
      dateCurrent: val + " " + time,
    });
    const { state } = this.props.location.state;
    tableDataRender().then((data) => {
      let i = 0;
      let j = 0;

      for (i in data) {
        console.log(data[i].state);
        if (data[i].state == state) {
          console.log(data[i].districtData);
          this.setState({
            dataAll: data[i].districtData,
          });
        }
      }
    });

    handleClickData(this.state.userInput).then((data) => {
      let i = "";
      let j = 0;
      for (i in data) {
        if (data[i].state == state) {
          this.setState({
            stateName: data[i].state,
            stateConfirm: data[i].confirmed,
            stateRecover: data[i].recovered,
            stateActive: data[i].active,
            stateDeath: data[i].deaths,
          });
        } else {
        }
      }
    });
  }
  renderTableData() {
    const dataAll = this.state.dataAll;
    return this.state.dataAll.map((dataAll, index) => {
      const { name, confirmed, active, recovered, deaths } = dataAll; //destructuring
      return (
        <tr key={name}>
          <td>{name}</td>

          <td>{confirmed}</td>
        </tr>
      );
    });
  }

  render() {
    const nameState = this.state.stateName;
    const totalState = this.state.stateConfirm;
    const activeState = this.state.stateActive;
    const recoverState = this.state.stateRecover;
    const deathState = this.state.stateDeath;
    const date = this.state.dateCurrent;
    return (
      <div className="container">
        <div className="main">
          <div className="row top-margin">
            <div className="col-md-6">
              <StateCases
                name={nameState}
                active={activeState}
                confirm={totalState}
                recover={recoverState}
                death={deathState}
                date={date}
              />
            </div>

            <div className="col-md-6">
              <h3 className="stateWise">District Wise data</h3>
              <table
                className="table table-bordered table-striped"
                id="state_table"
              >
                <tr>
                  <th>Name</th>
                  <th>Confirm</th>
                </tr>
                <tbody>{this.renderTableData()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default District;
