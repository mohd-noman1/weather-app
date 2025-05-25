const apiKey = '64b32a0226f1c586a204fd56bf867e83'; // Replace with your OpenWeatherMap API key

const getWeather = async () => {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    resultDiv.innerHTML = '<p>Loading...</p>';
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp}&deg;C</p>
        <p>Weather: ${data.weather[0].description}</p>
      `;
    } else {
      resultDiv.innerHTML = '<p>City not found. Try again.</p>';
    }
  } catch (error) {
    resultDiv.innerHTML = '<p>Error fetching data.</p>';
    console.error(error);
  }
};

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);
