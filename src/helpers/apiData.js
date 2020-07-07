export const stateClickData = () => {
  return fetch("https://api.covid19india.org/data.json").then((results) => {
    return results.json();
  });
};

export const defaultStateData = () => {
  const DEFAULT_STATE = "Madhya Pradesh";
  return fetch(
    "http://covid19-india-adhikansh.herokuapp.com/state/" + DEFAULT_STATE
  ).then((results) => {
    return results.json();
  });
};

export const tableDataRender = () => {
  return fetch("https://api.covidindiatracker.com/state_data.json").then(
    (results) => {
      return results.json();
    }
  );
};

export const handleClickData = (stateSearch) => {
  let defaultSearch;
  if (stateSearch == "") {
    defaultSearch = "Madhya Pradesh";
  } else {
    defaultSearch = stateSearch;
  }
  return fetch(
    "http://covid19-india-adhikansh.herokuapp.com/state/" + defaultSearch
  ).then((results) => {
    return results.json();
  });
};
