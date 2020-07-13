import React, { Component } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { StateCases } from "./StateCases.js";
import {
  stateClickData,
  tableDataRender,
  handleClickData,
} from "../helpers/apiData.js";
import { BrowserRouter as Router, Link } from "react-router-dom";
import District from "./District.js";

class DashboardIndex extends Component {
  constructor() {
    super();
    this.state = {
      Confirmed: null,
      activeCases: null,
      Cured: null,
      Death: null,
      stateWiseData: [],
      stateName: null,
      stateConfirm: null,
      stateActive: null,
      stateRecover: null,
      stateDeath: null,
      searchValue: null,
      dateCurrent: null,
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onClickData = this.onClickData.bind(this);
  }

  handleData() {
    let i = "";
    handleClickData(this.state.userInput).then((data) => {
      for (i in data) {
        if (data[i].state == "Madhya Pradesh" && this.state.userInput == "") {
          this.setState({
            stateName: data[i].state,
            stateConfirm: data[i].confirmed,
            stateRecover: data[i].recovered,
            stateActive: data[i].active,
            stateDeath: data[i].deaths,
          });
        } else if (
          data[i].state == this.state.userInput &&
          this.state.userInput != ""
        ) {
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

  handleKey = (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      let i = "";
      this.handleData();
    }
  };

  handleClick(event) {
    let i = "";
    this.handleData();
  }

  onClickData(event) {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText,
    });
  }

  handleChange(event) {
    const suggestions = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ];
    let userInput = event.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      (suggestions) =>
        suggestions.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: event.currentTarget.value,
    });
    this.setState({ searchValue: event.target.value });
  }

  componentDidMount() {
    let j = 0;
    stateClickData().then((data) => {
      this.setState({
        Confirmed: data.statewise[j].confirmed,
        activeCases: data.statewise[j].active,
        Cured: data.statewise[j].recovered,
        Death: data.statewise[j].deaths,
      });
    });

    tableDataRender().then((data) => {
      this.setState({
        stateWiseData: data,
      });
    });

    this.handleData();

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
  }

  renderTableData() {
    const stateWiseData = this.state.stateWiseData;
    return this.state.stateWiseData.map((stateWiseData, index) => {
      const { state, confirmed, active, recovered, deaths } = stateWiseData; //destructuring
      return (
        <tr key={state}>
          <td>
            <Link to={{ pathname: "/district", state: { state } }}>
              {state}
            </Link>
          </td>
          <td>{confirmed}</td>
          <td>{active}</td>
          <td>{recovered}</td>
          <td>{deaths}</td>
        </tr>
      );
    });
  }

  render() {
    const name = this.state.stateName;
    const total = this.state.stateConfirm;
    const active = this.state.stateActive;
    const recover = this.state.stateRecover;
    const death = this.state.stateDeath;
    const date = this.state.dateCurrent;

    const {
      onChange,
      onKeyDown,
      onClickData,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={this.onClickData}
                >
                  {suggestion}
                </li>
              );
            })}
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <div className="container">
        <div className="main">
          <div className="row margin-top">
            <div className="col-md-6">
              <div className="search">
                <label>Search your city, resources, etc</label>
                <div className="search">
                  <input
                    type="text"
                    value={this.state.value}
                    onKeyUp={this.handleKey}
                    onChange={this.handleChange}
                    value={this.state.userInput}
                    className="searchInput"
                  />
                  {suggestionsListComponent}

                  <button
                    type="button"
                    className="searchBtn"
                    onClick={this.handleClick}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="countryHead">India</label>
              <div className="countryHeader">
                <div className="confirmedCountry">
                  <span id="tag">Confirmed</span>
                  <div id="confirmCases" className="number">
                    {this.state.Confirmed}
                  </div>
                </div>
                <div className="activeCountry">
                  <span id="tag">Active</span>
                  <div id="activeCases" className="number">
                    {this.state.activeCases}
                  </div>
                </div>
                <div className="recoveredCountry">
                  <span id="tag">Recovered</span>
                  <div id="recovered" className="number">
                    {this.state.Cured}
                  </div>
                </div>
                <div className="deathCountry">
                  <span id="tag">Death</span>
                  <div id="death" className="number">
                    {this.state.Death}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row top-margin">
            <div className="col-md-6">
              <StateCases
                name={name}
                active={active}
                confirm={total}
                recover={recover}
                death={death}
                date={date}
              />
            </div>

            <div className="col-md-6 left-margin">
              <h3 className="stateWise">State Wise data</h3>
              <table
                className="table table-bordered table-striped"
                id="state_table"
              >
                <tr>
                  <th>Name</th>
                  <th>Confirm</th>
                  <th>Active</th>
                  <th>Recover</th>
                  <th>Death</th>
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

export default DashboardIndex;
