function showTime(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let timeMonth = months[date.getMonth()];
  let timeDate = date.getDate();
  let timeDay = days[date.getDay()];
  let timeHour = date.getHours();
  if (timeHour < 10) {
    timeHour = "0" + timeHour;
  }
  let timeMinute = date.getMinutes();
  if (timeMinute < 10) {
    timeMinute = "0" + timeMinute;
  }

  let todayDate = document.querySelector(".dateCurrent");
  todayDate.innerHTML = `${timeDate}th of ${timeMonth}, ${timeDay}, ${timeHour}:${timeMinute}`;
  return todayDate;
}
showTime(new Date());

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-search");
  let cityCurrent = document.querySelector(".cityCurrent");
  cityCurrent.innerHTML = `${searchInput.value}`;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
}
function getWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureCity = document.querySelector("#temperatureValue");
  temperatureCity.innerHTML = `${temperature}`;

  let temperatureMax = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#tempMax");
  tempMax.innerHTML = `${temperatureMax}°`;

  let temperatureMin = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#tempMin");
  tempMin.innerHTML = `${temperatureMin}°`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#feelsLikeTemp");
  feel.innerHTML = `${feelsLike}°`;

  let humidity = Math.round(response.data.main.humidity);
  let hum = document.querySelector("#humidity");
  hum.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} `;

  let weather = response.data.weather[0].description;
  let weatherDescription = document.querySelector(".temperature-status");
  weatherDescription.innerHTML = `${weather}`;
}

let apiKey = "58a6775f97527351bf6c6966e209be39";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&units=metric";
axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function userLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showTemp);
}
function showTemp(response) {
  console.log(response.data);
  let city = response.data.name;
  let currentCity = document.querySelector(".cityCurrent");
  currentCity.innerHTML = `${city}`;

  let temperature = Math.round(response.data.main.temp);
  let temperatureCity = document.querySelector("#temperatureValue");
  temperatureCity.innerHTML = `${temperature}`;

  let temperatureMax = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#tempMax");
  tempMax.innerHTML = `${temperatureMax}°`;

  let temperatureMin = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#tempMin");
  tempMin.innerHTML = `${temperatureMin}°`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#feelsLikeTemp");
  feel.innerHTML = `${feelsLike}°`;

  let humidity = Math.round(response.data.main.humidity);
  let hum = document.querySelector("#humidity");
  hum.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} `;

  let weather = response.data.weather[0].description;
  let weatherDescription = document.querySelector(".temperature-status");
  weatherDescription.innerHTML = `${weather}`;
}
let button = document.querySelector(".homeButton");
button.addEventListener("click", userLocation);
