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
  let farenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let feelsLike = Math.round((feelsLikeTemperature * 9) / 5 + 32);
  let maxTemp = Math.round((maxTemperature * 9) / 5 + 32);
  let minTemp = Math.round((minTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  temperatureElement.innerHTML = farenheitTemperature;
  feelsLikeElement.innerHTML = feelsLike;
  maxTempElement.innerHTML = maxTemp;
  minTempElement.innerHTML = minTemp;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let feelsLikeElement = document.querySelector("#feels-like");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");

  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  feelsLikeElement.innerHTML = Math.round(feelsLikeTemperature);
  maxTempElement.innerHTML = Math.round(maxTemperature);
  minTempElement.innerHTML = Math.round(minTemperature);
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

  celsiusTemperature = response.data.main.temp;
  feelsLikeTemperature = response.data.main.feels_like;
  maxTemperature = response.data.main.temp_max;
  minTemperature = response.data.main.temp_min;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(feelsLikeTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  maxTempElement.innerHTML = Math.round(maxTemperature);
  minTempElement.innerHTML = Math.round(minTemperature);
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

// add html forecast feature

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thurs", "Fri", "Sat"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col">
                <div class="forecast-time">${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
                  alt="sunny"
                />
                <div class="forecast-temp">
                  <span class="temp-high">11°</span> 1°
                </div>
          </div>
              `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//Convert temperature to farenheit feature

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

//Convert to temperature to celsius feature

let celsiusTemperature = null;
let feelsLikeTemperature = null;
let maxTemperature = null;
let minTemperature = null;

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

  celsiusTemperature = response.data.main.temp;
  feelsLikeTemperature = response.data.main.feels_like;
  maxTemperature = response.data.main.temp_max;
  minTemperature = response.data.main.temp_min;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(feelsLikeTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  maxTempElement.innerHTML = Math.round(maxTemperature);
  minTempElement.innerHTML = Math.round(minTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", sendCurrentLocation);

function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let daysIndex = now.getDay();

  let date = days[daysIndex];

  console.log(hours);
  console.log(minutes);
  console.log(date);

  return `As of ${date} at ${hours}:${minutes}`;
}

let currentDate = new Date();
console.log(currentDate);
let dateElement = document.querySelector("#current-time");
dateElement.innerHTML = formatDate(currentDate);

displayForecast();
