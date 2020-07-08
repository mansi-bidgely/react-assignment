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

export const handleClickData = () => {
  return fetch("https://api.covidindiatracker.com/state_data.json").then(
    (results) => {
      return results.json();
    }
  );
};
