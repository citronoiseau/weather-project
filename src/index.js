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
  todayDate.innerHTML = `Last updated at: ${timeDate}th of ${timeMonth}, ${timeDay}, ${timeHour}:${timeMinute}`;
  return todayDate;
}
showTime(new Date());

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecastDaily = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = ``;
  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="card text-center mb-3 border-0" id="celcius">
          <div class="card-body">
            <h5 class="card-title weekday">${formatDay(forecastDay.time)}</h5>
             <img src="${
               forecastDay.condition.icon_url
             }" alt="Icon" class="forecastIcon" />
            <p class="card-text forecast-text">
              ${Math.round(
                forecastDay.temperature.maximum
              )}° <span class="minTemperature">   ${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
            </p>
          </div>
        </div>`;
      forecast.innerHTML = forecastHTML;
    }
  });
  let forecastDailyF = response.data.daily;
  let forecastF = document.querySelector("#forecast-fahrenheit");
  let forecastHTMLF = ``;
  forecastDailyF.forEach(function (forecastDayF, index) {
    if (index < 5) {
      forecastHTMLF =
        forecastHTMLF +
        `<div class="card text-center mb-3 border-0" id="celcius">
          <div class="card-body">
            <h5 class="card-title weekday">${formatDay(forecastDayF.time)}</h5>
             <img src="${
               forecastDayF.condition.icon_url
             }" alt="Icon" class="forecastIcon" />
            <p class="card-text forecast-text">
              ${Math.round(
                (forecastDayF.temperature.maximum * 9) / 5 + 32
              )}° <span class="minTemperature">    ${Math.round(
          (forecastDayF.temperature.minimum * 9) / 5 + 32
        )}°</span>
            </p>
          </div>
        </div>`;
      forecastF.innerHTML = forecastHTMLF;
    }
  });

  function showFahrenheitTemp(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let controlsC = document.getElementsByClassName("temp-celcius");
    let controlsF = document.getElementsByClassName("temp-fahrenheit");
    Array.from(controlsC).forEach(e => e.classList.add("invisible"));
    Array.from(controlsF).forEach(e => e.classList.remove("invisible"));
  }

  function showCelsiusTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let controlsC = document.getElementsByClassName("temp-celcius");
    let controlsF = document.getElementsByClassName("temp-fahrenheit");
    Array.from(controlsC).forEach(e => e.classList.remove("invisible"));
    Array.from(controlsF).forEach(e => e.classList.add("invisible"));
  }

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemp);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemp);

  // showCelsiusTemp(event);
}

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
  axios.get(apiUrl).then((response) => {
    if (response.data.status === "not_found") {
      alert("This city does not exist 😭");
      return false;
    } else {
      getWeather(response);
      cityCurrent.innerHTML = searchInput.value.trim();
    }
  });
}

function getForecast(city) {
  let apiKey = "84a3odd1fb91cb0984343bb2db506t7f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getWeather(response) {
  console.log(response.data);
  let celsiusTemp = Math.round(response.data.temperature.current);
  let fahrenheitTemp = Math.round(celsiusTemp * 9 / 5 + 32);
  let temperatureCityC = document.querySelector("#temperatureValueC");
  temperatureCityC.innerHTML = `${celsiusTemp}`;

  let temperatureCityF = document.querySelector("#temperatureValueF");
  temperatureCityF.innerHTML = `${fahrenheitTemp}`;

  let city = response.data.city;
  let currentCity = document.querySelector(".cityCurrent");
  currentCity.innerHTML = `${city}`;

  let feelsLikeC = Math.round(response.data.temperature.feels_like);
  let feelsLikeF =  Math.round(feelsLikeC * 9 / 5 + 32);;
  let feelC = document.querySelector("#feelsLikeTempC");
  let feelF = document.querySelector("#feelsLikeTempF");
  feelC.innerHTML = `${feelsLikeC}°`;
  feelF.innerHTML = `${feelsLikeF}°`;

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

  getForecast(response.data.city);
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
// function showFahrenheitTemp(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#temperatureValue");
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
//   temperature.innerHTML = Math.round(fahrenheitTemp);
// }

// function showCelsiusTemp(event) {
//   event.preventDefault();
//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   let temperature = document.querySelector("#temperatureValue");
//   temperature.innerHTML = Math.round(celsiusTemp);
// }
// let celsiusTemp = null;

let button = document.querySelector(".homeButton");
button.addEventListener("click", userLocation);

// let forecastF = document.querySelector("#forecast-fahrenheit");
// forecastF.classList.add("invisible");

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", showFahrenheitTemp);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", showCelsiusTemp);
