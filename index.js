const apiKey = "8fc44ad8cb0bf1ded01149c2fbd4c336";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();

  document.querySelector(".city").innerText = data.name;
  document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = data.wind.speed + " km/hr";

  const weatherMain = data.weather[0].main;

  if (weatherMain === "Clouds") {
    weatherIcon.src = "./clouds.png";
  } else if (weatherMain === "Clear") {
    weatherIcon.src = "./clear.png";
  } else if (weatherMain === "Rain") {
    weatherIcon.src = "./rain.png";
  } else if (weatherMain === "Drizzle") {
    weatherIcon.src = "./drizzle.png";
  } else if (weatherMain === "Mist") {
    weatherIcon.src = "./mist.png";
  } else if (weatherMain === "Snow") {
    weatherIcon.src = "./snow.png";
  } else {
    weatherIcon.src = ""; // default or fallback image if needed
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  }
});
