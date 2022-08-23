let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let weather = document.getElementById("weather");
let searchInput = document.getElementById("input");
let button = document.getElementById("btn-search");
let iconFile;

//-----------------Fetching the location

// to know the current location of the user

//------brower to stop refreshing cos it wont allow us to fetch the currecnt loc

button.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=71b50d2e58b6074b44bd867b72286f87`
    );

    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feelsLike } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    loc.innerHTML = name;
    weather.textContent = main;
    tempValue.textContent = Math.round(feelsLike - 273);

    if (id < 300 && id > 200) {
      tempIcon.src = "./images/storm.svg";
    } else if (id < 400 && id > 300) {
      tempIcon.src = "./images/haze.svg";
    } else if (id < 600 && id > 500) {
      tempIcon.src = "./images/rain.svg";
    } else if (id < 700 && id > 600) {
      tempIcon.src = "./images/snow.svg";
    } else if (id < 800 && id > 700) {
      tempIcon.src = "./images/clouds.svg";
    } else if (id == 800) {
      tempIcon.src = "./images/sun.svg";
    }
  } catch (error) {
    alert("city not found");
  }
};

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=71b50d2e58b6074b44bd867b72286f87`;

      fetch(API)
        .then((Response) => {
          return Response.json();
        })

        .then((data) => {
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          loc.innerHTML = name;
          weather.textContent = main;
          tempValue.textContent = Math.round(feels_like - 273);

          if (id < 300 && id > 200) {
            tempIcon.src = "./images/storm.svg";
          } else if (id < 400 && id > 300) {
            tempIcon.src = "./images/haze.svg";
          } else if (id < 600 && id > 500) {
            tempIcon.src = "./images/rain.svg";
          } else if (id < 700 && id > 600) {
            tempIcon.src = "./images/snow.svg";
          } else if (id < 800 && id > 700) {
            tempIcon.src = "./images/clouds.svg";
          } else if (id == 800) {
            tempIcon.src = "./images/sun.svg";
          }

          console.log(data);
        });
    });
  }
});
