
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast'
const apiKey = 'c99d36592ac7f6c76c8592278329bdfb'
const url = `${baseURL}?appid=${apiKey}&units=imperial`

const htmlBody = document.querySelector('body')

function getLocation() {
  navigator.geolocation.getCurrentPosition(function (locationData) {
    $.get(url + '&lat=' + locationData.coords.latitude + '&lon=' + locationData.coords.longitude).
      then(function (data) {
        console.log(data)
        getWeather(data)
      });
  })
}
getLocation()

function getWeather(data) {

  let iconURL = 'http://openweathermap.org/img/w/'

  let pageDisplay = `
  <header>
    <h1>Weather Dash</h1>
  </header>

  <main>

  <section id="outer-grid">
  <div>
    <h2>Search for your city</h2>
    <form>
      <input class="city-input" type="text" placeholder="e.g. Philadelphia">
      <label for=""></label>
      <button class="search-btn">Search</button>
      <hr>
    </form>
    <button class="city-btn">Los Angeles</button>
    <button class="city-btn">New York</button>
    <button class="city-btn">Chicago</button>
    <button class="city-btn">Miami</button>
    <button class="city-btn">Philadelphia</button>
    <button class="city-btn">Dallas</button>
  </div>

  <div id="current-weather">
    <h2>${data.city.name}
      <img src="${iconURL}${data.list[0].weather[0].icon}.png" align="top" height="40px">
    </h2>
    <p>&#128167 ${(data.list[0].pop) * 100}%</p>
    <p>Temp: ${Math.trunc(data.list[0].main.temp)}&#8457 (feels like ${Math.trunc(data.list[0].main.feels_like)}&#8457)</p>
    <p>Humidity: ${data.list[0].main.humidity}%</p>
    <p>Wind: ${data.list[0].wind.speed} MPH</p>
  </div>
   
  <section id="inner-grid">

  </section>

  </section>

  </main>

  <footer>
    <div>
      <a target="_blank" href="https://www.linkedin.com/in/greg-p-54590b15a">LinkedIn </a>
      I
      <a target="_blank" href="https://github.com/greg-pfeifer">Github</a>
    </div>
    <div id="api-anchor">
      Powered by
      <a target="_blank" href="https://openweathermap.org/api">OpenWeather API</a>
    </div>
  </footer>
  `;

  htmlBody.innerHTML = pageDisplay
  let innerGrid = document.querySelector("#inner-grid")

  let days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  for (let count = 6; count <= 38; count += 8) {

    let rawDate = data.list[count].dt_txt
    let splitDate = rawDate.split(" ")
    let weekday = splitDate[0];

    let d = new Date(weekday);
    let dayName = days[d.getDay()];

    let iconURL = 'http://openweathermap.org/img/w/'

    let div = document.createElement('div')
    div.innerHTML = `
    <h1>${dayName} ${dayjs(rawDate).format('MM/DD')}
      <img src="${iconURL}${data.list[count].weather[0].icon}.png" height="35px">
    </h1>
    <p>&#128167 ${Math.trunc((data.list[count].pop) * 100)}%</p>
    <p>Temp: ${Math.trunc(data.list[count].main.temp)}&#8457</p>
    <p>Humidity: ${data.list[count].main.humidity}%</p>
    <p>Wind: ${data.list[count].wind.speed} MPH</p>
    `;
    innerGrid.appendChild(div)
  }

  const cityInput = document.querySelector('.city-input')
  const searchBtn = document.querySelector('.search-btn')
  const cityBtns = document.querySelectorAll('.city-btn')

  searchBtn.addEventListener('click', event => {
    event.preventDefault()
    if (!cityInput.value) {
      alert('Enter city name, then press the \'Search\' button')
      return
    }
    citySearch(cityInput.value)
  })

  cityBtns.forEach(cityBtns => {
    cityBtns.addEventListener('click', () => {
      citySearch(cityBtns.innerHTML)
    })
  })
}

function citySearch(input) {
  let searchURL = `${baseURL}?q=${input}&appid=${apiKey}&units=imperial`
  $.get(searchURL).
    then(function (data) {
      getWeather(data)
    })
}


