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

function displayFahreinheitTemp(event) {
  event.preventDefault();
  let fahreinheitTemperature = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahreinheitLink.classList.add("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahreinheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  fahreinheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  tempElement.innerHTML = Math.round(celsiusTemp);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2 daily-forecast-section">
         <div class="weather-forecast-date">${day}</div>
         <img
           class="forecast-icon"
           src="https://openweathermap.org/img/wn/04d@2x.png"
           alt=""
           width="40px"
         />
         <div class="weather-forecast-temperatures">
           <span class="max-temp">18º </span>
           <span class="min-temp"> 12º</span>
         </div>
       </div>
     
     `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahreinheitLink = document.querySelector("#fahrenheit-link");
fahreinheitLink.addEventListener("click", displayFahreinheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("New York");
