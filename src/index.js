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
  todayDate.innerHTML = `Lastly updated at: ${timeDate}th of ${timeMonth}, ${timeDay}, ${timeHour}:${timeMinute}`;
  return todayDate;
}
showTime(new Date());

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-search");
  let cityCurrent = document.querySelector(".cityCurrent");

  if (searchInput.value.trim() === "") {
    alert("Enter a city!🙄");
    return false;
  }
  let apiKey = "84a3odd1fb91cb0984343bb2db506t7f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=metric`;
  // axios.get(`${apiUrl}`).then(getWeather);
  axios.get(`${apiUrl}`).then((response) => {
    if (response.data.status === "not_found") {
      alert("This city does not exist 😭");
      return false;
    } else {
      getWeather(response);
      cityCurrent.innerHTML = `${searchInput.value.trim()}`;
    }
  });
}

function getWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let temperatureCity = document.querySelector("#temperatureValue");
  temperatureCity.innerHTML = `${temperature}`;

  let city = response.data.city;
  let currentCity = document.querySelector(".cityCurrent");
  currentCity.innerHTML = `${city}`;
  //will work on tempmax and tempmin when added an API for week forecast
  // let temperatureMax = Math.round(response.data.main.temp_max);
  // let tempMax = document.querySelector("#tempMax");
  // tempMax.innerHTML = `${temperatureMax}°`;

  // let temperatureMin = Math.round(response.data.main.temp_min);
  // let tempMin = document.querySelector("#tempMin");
  // tempMin.innerHTML = `${temperatureMin}°`;

  let feelsLike = Math.round(response.data.temperature.feels_like);
  let feel = document.querySelector("#feelsLikeTemp");
  feel.innerHTML = `${feelsLike}°`;

  let humidity = Math.round(response.data.temperature.humidity);
  let hum = document.querySelector("#humidity");
  hum.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} `;

  let weather = response.data.condition.description;
  let weatherDescription = document.querySelector(".temperature-status");
  weatherDescription.innerHTML = `${weather}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

let apiKey = "84a3odd1fb91cb0984343bb2db506t7f";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Kharkiv&key=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(getWeather);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function userLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "84a3odd1fb91cb0984343bb2db506t7f";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios
    .get(`${apiUrl}lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`)
    .then(getWeather);
}

let button = document.querySelector(".homeButton");
button.addEventListener("click", userLocation);
