//add API integration, connect to OpenWeather App

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
  feelsLikeElement.innerHTML = `${feelsLike}°F`;
  maxTempElement.innerHTML = `${maxTemp}°F`;
  minTempElement.innerHTML = `${minTemp}°F`;
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
  feelsLikeElement.innerHTML = `${Math.round(feelsLikeTemperature)}°C`;
  maxTempElement.innerHTML = `${Math.round(maxTemperature)}°C`;
  minTempElement.innerHTML = `${Math.round(minTemperature)}°C`;
}

// format the dt. timestamp response for each forecast day which is used in the displayforecast function

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// injects html to display the next 5 days weather foreacast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastday, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
                <div class="forecast-time">${formatDay(forecastday.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastday.weather[0].icon
                  }@2x.png";
                  alt="sunny"
                />
                <div class="forecast-temp">
                  <span class="temp-high">${Math.round(
                    forecastday.temp.max
                  )}°</span> ${Math.round(forecastday.temp.min)}°
                </div>
          </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// get the city coordinates and send to API to get the next 5 days of weather

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

//displays temperature

function displayTemperature(response) {
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
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = `${Math.round(feelsLikeTemperature)}°C`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  maxTempElement.innerHTML = `${Math.round(maxTemperature)}°C`;
  minTempElement.innerHTML = `${Math.round(minTemperature)}°C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

// send city input to the API

function search(city) {
  let apiKey = `d956b0842cbabf1d3e0333b095cbca8d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

// handle the search form city input value

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrl).then(showCity);
  search(cityInputElement.value);
}

//Search current location to the API

function sendCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);

  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let units = "metric";
    let apiURL = `${apiEndPoint}lat=${latitude}&lon=${longitude}&units=${units}&apikey=${apiKey}`;
    axios.get(apiURL).then(displayTemperature);
  }
}

// formate the date and update last updated html element

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

  return `Last updated: ${date} at ${hours}:${minutes}`;
}

let currentDate = new Date();
console.log(currentDate);

let dateElement = document.querySelector("#current-time");
dateElement.innerHTML = formatDate(currentDate);

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", sendCurrentLocation);

//Show default city weather feature

let apiKey = `d956b0842cbabf1d3e0333b095cbca8d`;
let city = `Los Angeles`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//axios.get(apiUrl).then(showDefaultCity);

// Initalizing display city
search("New York");
