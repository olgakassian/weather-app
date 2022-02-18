function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celsiusTemp = response.data.main.temp;

  let tempElement = celsiusTemp;
  document.querySelector("#temperature").innerHTML = Math.round(tempElement);
  let cityElement = response.data.name;
  document.querySelector("#city").innerHTML = cityElement;
  let descriptionElement = response.data.weather[0].description;
  document.querySelector("#description").innerHTML = descriptionElement;
  let humidityElement = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = humidityElement;
  let windElement = response.data.wind.speed;
  document.querySelector("#wind").innerHTML = windElement;
  let dateElement = formatDate(response.data.dt * 1000);
  document.querySelector("#date").innerHTML = dateElement;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#entered-city");
  search(cityInputElement.value);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 daily-forecast-section">
         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
         <img
           class="forecast-icon"
           src="https://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png"
           alt=""
           width="42px"
         />
         <div class="weather-forecast-temperatures">
           <span class="max-temp">${Math.round(forecastDay.temp.max)}º </span>
           <span class="min-temp">${Math.round(forecastDay.temp.min)}º</span>
         </div>
       </div>
     
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
