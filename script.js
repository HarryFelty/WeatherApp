let searchEl = document.querySelector("input");
let searchBtn = document.querySelector("#searchBtn");
let cityBtns = document.querySelector("#cityBtns");
let weatherEl = document.querySelectorAll(".weather");
let currentWthrEl = document.querySelector("#currentWthr");

//checks local storage to display most recently searched city weather
if (JSON.parse(localStorage.getItem("city"))) {
    getWeather(JSON.parse(localStorage.getItem("city")));
}

//function makes fetch requests passing in appropriate location on function call and displays data to screen
function getWeather(location) {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=48a7e18c666050565ed304894777941b`)
        .then(response => response.json())
        .then(citiesFound => {
            let firstCity = citiesFound[0];

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=48a7e18c666050565ed304894777941b&units=imperial`)
        })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            //sets current weather div
            currentWthrEl.innerHTML =
                `<span class = "firstSpan">${JSON.parse(localStorage.getItem("city"))} ${moment(data.list[0].dt, "X").format("M/D/YYYY")}</span>
                <img id="crntWthrIcon" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">
                <span>Temp: ${data.list[0].main.temp} ℉</span>
                <span>Wind: ${data.list[0].wind.speed} MPH</span >
                <span>Humidity: ${data.list[0].main.humidity} % </span>`;

            //loops through forecast divs to display forecast data
            let x = 7;
            for (let i = 0; i < weatherEl.length; i++) {
                weatherEl[i].innerHTML =
                    `<span class = "firstSpan">${moment(data.list[x].dt, "X").format("M/D/YYYY")}</span>
                    <img src="https://openweathermap.org/img/wn/${data.list[x].weather[0].icon}@2x.png">
                    <span>Temp: ${data.list[x].main.temp} ℉</span>
                    <span>Wind: ${data.list[x].wind.speed} MPH</span >
                    <span>Humidity: ${data.list[x].main.humidity} % </span>`

                x += 7;
            }
        })
}

//even listners for search button and preset city buttons, calling fetch on click
searchBtn.addEventListener("click", () => {
    getWeather(searchEl.value);
    localStorage.setItem("city", JSON.stringify(searchEl.value));
})

cityBtns.addEventListener("click", event => {
    if (event.target.matches("button")) {
        getWeather(event.target.textContent);
        localStorage.setItem("city", JSON.stringify(event.target.textContent));
    }
})