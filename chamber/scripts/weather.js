const apiKey = "605f592b73841a9996207bec5b19cf70";
const city = "Guayaquil";

async function getWeather() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  const currentRes = await fetch(currentUrl);
  const currentData = await currentRes.json();

  const forecastRes = await fetch(forecastUrl);
  const forecastData = await forecastRes.json();

  displayCurrent(currentData);
  displayForecast(forecastData);
}

function formatTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleTimeString('en-US', options).toLowerCase().replace(' ', '');
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function displayCurrent(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const div = document.getElementById("current-weather");
  div.innerHTML = `
    <img src="${iconUrl}" alt="${data.weather[0].description}" />
    <p><strong>${Math.round(data.main.temp)}°C</strong></p>
    <p>${capitalize(data.weather[0].description)}</p>
    <p>High: ${Math.round(data.main.temp_max)}°</p>
    <p>Low: ${Math.round(data.main.temp_min)}°</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Sunrise: ${formatTime(data.sys.sunrise)}</p>
    <p>Sunset: ${formatTime(data.sys.sunset)}</p>
  `;
}

function displayForecast(data) {
  const forecastList = document.getElementById("forecast-list");
  forecastList.innerHTML = "";

  const daily = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));
  const days = ["Today", "Wednesday", "Thursday"]; // puedes personalizar los nombres

  daily.slice(0, 3).forEach((entry, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${days[i]}: ${Math.round(entry.main.temp)}°C</strong>`;
    forecastList.appendChild(li);
  });
}

getWeather();
