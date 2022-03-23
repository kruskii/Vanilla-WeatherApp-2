//add API integration, connect to OpenWeather App

// add axios to use ajax to html

function showCity(response) {
  console.log(response.data);
  console.log(response.data.name);
  console.log(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = `d956b0842cbabf1d3e0333b095cbca8d`;
let city = `Paris`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCity);
