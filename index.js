/// updates webpage with new city and temperature
function updateWeatherData(response) {
  let cityName = response.data.name;
  let temperature = response.data.main.temp;
  let titleChange = document.querySelector("#weatherH1");
  titleChange.textContent = cityName;
  let changeTemp = document.querySelector("#celcius");
  changeTemp.textContent = Math.round(temperature);
}
/// Error Handling
function handleError(error) {
  if (error.response) {
    // The request was made, but the server responded with an error status
    console.error("Server responded with an error:");
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  } else if (error.request) {
    // The request was made, but no response was received
    console.error("No response received from the server.");
  } else {
    // Something else happened while setting up the request
    console.error("Error setting up the request:", error.message);
  }
}
// Returns weather form inputted city
function getWeatherByCity(city) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateWeatherData).catch(handleError);
}

function getWeatherByCoordinates(latitude, longitude) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateWeatherData).catch(handleError);
}

// Returns weather from current location
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  } else {
    console.error("Location is not suported by this browser.");
  }
}
// Seach Engine Input
function submitCity(event) {
  event.preventDefault();
  let input = document.querySelector("#changeCity");
  let city = input.value;
  getWeatherByCity(city);
}
//Displays Current Day
function currrentDay() {
  let currentDateElement = document.querySelector("#currentDate");
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString("en-UK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  currentDateElement.textContent = formattedDate;
}
currrentDay();

/// Event listeners to buttons
let form = document.querySelector("#cityForm");
form.addEventListener("submit", submitCity);

let currentLocationBtn = document.querySelector("#currentLocation");
currentLocationBtn.addEventListener("click", getCurrentLocationWeather);
