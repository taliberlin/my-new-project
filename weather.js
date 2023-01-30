function dateTime() {
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = weekdays[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayOfWeek = document.querySelector("#day-of-week");
  dayOfWeek.innerHTML = `${day}`;

  let today = document.querySelector("#date");
  today.innerHTML = `${month} ${date}, ${year}`;

  let time = document.querySelector("#time");
  time.innerHTML = `${hours}:${minutes}`;
}
function changeTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#curr-temp");
  temperatureElement.innerHTML = `${currentTemperature}`;
  let currentConditions = response.data.weather[0].description;
  let conditionsElement = document.querySelector("#conditions");
  conditionsElement.innerHTML = `${currentConditions}`;
  let currentTempHighElement = document.querySelector("#curr-high");
  let currentTempHigh = Math.round(response.data.main.temp_max);
  currentTempHighElement.innerHTML = `${currentTempHigh}°`;
  let currentTempLowElement = document.querySelector("#curr-low");
  let currentTempLow = Math.round(response.data.main.temp_min);
  currentTempLowElement.innerHTML = `${currentTempLow}°`;
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.main.feels_like);
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#search-input");
  cityInput.value.trim();
  if (cityInput.value === "" || cityInput.value === " ") {
    city.innerHTML = `Please enter city...`;
  } else {
    city.innerHTML = `${cityInput.value}`;
  }
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let apiUrlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&appid=${apiKey}`;
  axios.get(apiUrlCity).then(function convertToCoords(response) {
    let latitude = response.data[0].lat;
    let longitude = response.data[0].lon;
    let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
    let apiUrlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlCoords).then(changeTemperature);
  });
}
function changeToCurrentLocation(position) {
  let currentCityElement = document.querySelector("#city");
  let currentCity = position.data.name;
  currentCityElement.innerHTML = `${currentCity}`;
  let currentTempElement = document.querySelector("#curr-temp");
  let currentTemp = Math.round(position.data.main.temp);
  currentTempElement.innerHTML = `${currentTemp}`;
  let currentConditionsElement = document.querySelector("#conditions");
  let currConditions = position.data.weather[0].description;
  currentConditionsElement.innerHTML = `${currConditions}`;
  console.log(position);
  let currentTempHighElement = document.querySelector("#curr-high");
  let currentTempHigh = Math.round(position.data.main.temp_max);
  currentTempHighElement.innerHTML = `${currentTempHigh}°`;
  let currentTempLowElement = document.querySelector("#curr-low");
  let currentTempLow = Math.round(position.data.main.temp_min);
  currentTempLowElement.innerHTML = `${currentTempLow}°`;
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(position.data.main.feels_like);
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;
}
function receiveCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(changeToCurrentLocation);
}
function getCurrentLatitudeLongitude(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(receiveCurrentPosition);
}
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLatitudeLongitude);

dateTime();
