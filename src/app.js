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

function displayTemperature(response) {
  let tempElement = response.data.main.temp;
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
}

let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
let city = "New York";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
