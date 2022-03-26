//add API integration, connect to OpenWeather App

// add axios to use ajax to connect to API

//function that shows default city value

function showDefaultCity(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//convert temperature feature

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let feelsLikeElement = document.querySelector("#feels-like");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let temperature = temperatureElement.innerHTML;
  let feelsLike = feelsLikeElement.innerHTML;
  let maxTemp = maxTempElement.innerHTML;
  let minTemp = minTempElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  feelsLikeElement.innerHTML = Math.round((feelsLike * 9) / 5 + 32);
  maxTempElement.innerHTML = Math.round((maxTemp * 9) / 5 + 32);
  minTempElement.innerHTML = Math.round((minTemp * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let feelsLikeElement = document.querySelector("#feels-like");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let temperature = temperatureElement.innerHTML;
  let feelsLike = feelsLikeElement.innerHTML;
  let maxTemp = maxTempElement.innerHTML;
  let minTemp = minTempElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  feelsLikeElement.innerHTML = Math.round(((feelsLike - 32) * 5) / 9);
  maxTempElement.innerHTML = Math.round(((maxTemp - 32) * 5) / 9);
  minTempElement.innerHTML = Math.round(((minTemp - 32) * 5) / 9);
}

//Show default city weather feature

let apiKey = `d956b0842cbabf1d3e0333b095cbca8d`;
let city = `Los Angeles`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showDefaultCity);

//Search Form City Feature

function showCity(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = `d956b0842cbabf1d3e0333b095cbca8d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCity);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//Convert temperature to farenheit feature

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

//Convert to temperature to celsius feature
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Search current location feature

function sendCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);

  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "d956b0842cbabf1d3e0333b095cbca8d";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let units = "metric";
    let apiURL = `${apiEndPoint}lat=${latitude}&lon=${longitude}&units=${units}&apikey=${apiKey}`;
    axios.get(apiURL).then(showCurrentCity);
  }
}

function showCurrentCity(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", sendCurrentLocation);
