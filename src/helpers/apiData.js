export const stateClickData = () => {
  return fetch("https://api.covid19india.org/data.json")
  .then(results => {
  return results.json();
  })
}

export const DefaultStateData = () => {
  const DEFAULT_STATE = "Madhya Pradesh"
  return fetch( "http://covid19-india-adhikansh.herokuapp.com/state/" + DEFAULT_STATE)
  .then(results => {
  return results.json();
  })
}
  
export const TableDataRender = () => {
  return fetch( "https://api.covidindiatracker.com/state_data.json")
  .then(results => {
  return results.json();
  })
}

export const HandleKeyData = (stateSearch) => {
  return fetch( 'http://covid19-india-adhikansh.herokuapp.com/state/'+ stateSearch)
  .then(results => {
  return results.json();
  })
}

export const HandleClickData = (stateSearch) => {
  return fetch( 'http://covid19-india-adhikansh.herokuapp.com/state/'+ stateSearch)
  .then(results => {
  return results.json();
  })
}