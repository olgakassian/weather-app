let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
let city = "New York";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

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
  console.log(response);
}

axios.get(apiUrl).then(displayTemperature);
