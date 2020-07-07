export const stateClickData = () => {
  return fetch("https://api.covid19india.org/data.json").then((results) => {
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
  const DEFAULT_STATE = "Madhya Pradesh";
  let stateName = stateSearch ? stateSearch : DEFAULT_STATE;
  return fetch(
    "http://covid19-india-adhikansh.herokuapp.com/state/" + stateName
  ).then((results) => {
    return results.json();
  });
};
