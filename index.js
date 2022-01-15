let currentTime = new Date();

function displayTime() {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
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
  let day = days[currentTime.getDay()];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date-time");
dateElement.innerHTML = displayTime(currentTime);

function showWeather(response) {
  document.querySelector("#main-weather").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector(
    "#humidity-level"
  ).innerHTML = `💧 ${response.data.main.humidity}%`;
  document.querySelector("#wind-level").innerHTML = `🌬 ${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;
  document.querySelector("#cityName").innerHTML = `${response.data.name}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h2 = document.querySelector("#cityName");
  h2.innerHTML = `${searchInput.value}`;

  let apiKey = "973e48712864976fc2baad0a36b5f0f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function getCurrentCityTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);

  function searchPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "973e48712864976fc2baad0a36b5f0f8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(showWeather);
  }
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentCityTemp);
