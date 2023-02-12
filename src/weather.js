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
  dateTime();
  celsiusTemperature = Math.round(response.data.temperature.current);
  celsiusFeelsLike = Math.round(response.data.temperature.feels_like);
  let currentTemperature = celsiusTemperature;
  let temperatureElement = document.querySelector("#curr-temp");
  temperatureElement.innerHTML = `${currentTemperature}`;
  let currentConditions = response.data.condition.description;
  let conditionsElement = document.querySelector("#conditions");
  conditionsElement.innerHTML = `${currentConditions}`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  //let currentTempHighElement = document.querySelector("#curr-high");
  //let currentTempHigh = Math.round(response.data.main.temp_max);
  //currentTempHighElement.innerHTML = `${currentTempHigh}°`;
  //let currentTempLowElement = document.querySelector("#curr-low");
  //let currentTempLow = Math.round(response.data.main.temp_min);
  // currentTempLowElement.innerHTML = `${currentTempLow}°`;
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = celsiusFeelsLike;
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}
function convertToCoords(response) {
  let latitude = response.data.coordinates.latitude;
  let longitude = response.data.coordinates.longitude;
  let apiKey = "o599f3bbe3f722tbacc3ebf3032624a0";
  let apiUrlCoords = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCoords).then(changeTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  cityInput.value.trim();
  if (cityInput.value === "" || cityInput.value === " ") {
    city.innerHTML = `Please enter city...`;
  } else {
    let apiKey = "o599f3bbe3f722tbacc3ebf3032624a0";
    let apiUrlCity = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput.value}&key=${apiKey}`;
    axios.get(apiUrlCity).then(convertToCoords);
  }
}
function changeToCurrentLocation(position) {
  dateTime();
  celsiusTemperature = Math.round(position.data.temperature.current);
  celsiusFeelsLike = Math.round(position.data.temperature.feels_like);
  let currentCityElement = document.querySelector("#city");
  let currentCity = position.data.city;
  currentCityElement.innerHTML = `${currentCity}`;
  let currentTempElement = document.querySelector("#curr-temp");
  let currentTemp = celsiusTemperature;
  currentTempElement.innerHTML = `${currentTemp}`;
  let currentConditionsElement = document.querySelector("#conditions");
  let currConditions = position.data.condition.description;
  currentConditionsElement.innerHTML = `${currConditions}`;
  //let currentTempHighElement = document.querySelector("#curr-high");
  //let currentTempHigh = Math.round(position.data.main.temp_max);
  // currentTempHighElement.innerHTML = `${currentTempHigh}°`;
  //let currentTempLowElement = document.querySelector("#curr-low");
  //let currentTempLow = Math.round(position.data.main.temp_min);
  // currentTempLowElement.innerHTML = `${currentTempLow}°`;
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = celsiusFeelsLike;
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = position.data.temperature.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${position.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", position.data.condition.description);
}
function receiveCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "o599f3bbe3f722tbacc3ebf3032624a0";
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(changeToCurrentLocation);
}
function getCurrentLatitudeLongitude(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(receiveCurrentPosition);
}
function displayFahrenheit(event) {
  event.preventDefault;
  let currentTemperature = document.querySelector("#curr-temp");
  currentTemperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeFahrenheit = Math.round((celsiusFeelsLike * 9) / 5 + 32);
  feelsLike.innerHTML = `Feels like: ${feelsLikeFahrenheit}°`;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
function displayCelsius(event) {
  event.preventDefault;
  let currentTemperature = document.querySelector("#curr-temp");
  currentTemperature.innerHTML = celsiusTemperature;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels like: ${celsiusFeelsLike}°`;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let celsiusTemperature = null;
let celsiusFeelsLike = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLatitudeLongitude);

dateTime();
