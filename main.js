document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
  
    // Get selected city coordinates
    const cityCoordinates = document.getElementById('citySelect').value;
    const [lat, lon] = cityCoordinates.split(',');
  
    // Fetch weather data from 7Timer! API
    fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`)
      .then(response => response.json())
      .then(data => {
        displayWeather(data.dataseries);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  });
  
  function displayWeather(forecastData) {
    const weatherResults = document.getElementById('weatherResults');
    weatherResults.innerHTML = ''; // Clear previous results
  
    forecastData.forEach(day => {
      // Parse the date from YYYYMMDD format
      const dateString = day.date.toString(); // Convert to string
      const year = dateString.slice(0, 4); // Extract year
      const month = dateString.slice(4, 6); // Extract month
      const dayOfMonth = dateString.slice(6, 8); // Extract day
  
      // Create a Date object
      const date = new Date(`${year}-${month}-${dayOfMonth}`);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
  
      // Extract weather and temperature data
      const weather = day.weather;
      const maxTemp = day.temp2m.max;
      const minTemp = day.temp2m.min;
  
      // Get weather icon
      const weatherIcon = getWeatherIcon(weather);
  
      // Create a card for each day's forecast
      const card = document.createElement('div');
      card.classList.add('forecast-card');
      card.innerHTML = `
        <div class="weather-icon">${weatherIcon}</div>
        <h3>${formattedDate}</h3>
        <p>${weather}</p>
        <p>Max: ${maxTemp}°C</p>
        <p>Min: ${minTemp}°C</p>
      `;
  
      // Append the card to the results container
      weatherResults.appendChild(card);
    });
  }
  
  function getWeatherIcon(weather) {
    // Map weather conditions to icons
    const icons = {
      clear: '☀️',
      pcloudy: '⛅',
      cloudy: '☁️',
      rain: '🌧️',
      snow: '❄️',
      ts: '⛈️',
    };
    return icons[weather] || '🌈'; // Default icon if condition not found
  }