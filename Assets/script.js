let searchEl = document.querySelector("input");
let searchBtn = document.querySelector("#searchBtn");
let cityBtns = document.querySelector("#cityBtns");
let weatherEl = document.querySelectorAll(".weather");
let currentWthrEl = document.querySelector("#currentWthr");
let searchHistEl = document.querySelector("#cityBtns");
let recents = JSON.parse(localStorage.getItem("recents")) || [];

searchHistory();

//checks local storage to display most recently searched city weather
if (recents.length) {
    getWeather(recents[0]);
}

//populates previous searches
function searchHistory() {
    for (let i = 0; i < recents.length; i++) {
        let newBtn = document.createElement("button");
        newBtn.textContent = recents[i];
        searchHistEl.prepend(newBtn);
    }
}

//function makes fetch requests passing in appropriate location on function call and displays data to screen
function getWeather(location) {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=48a7e18c666050565ed304894777941b`)
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
                `<span class = "firstSpan">${recents[0]} ${moment(data.list[0].dt, "X").format("M/D/YYYY")}</span>
                <img id="crntWthrIcon" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">
                <span>Temp: ${data.list[0].main.temp} ℉</span>
                <span>Wind: ${data.list[0].wind.speed} MPH</span >
                <span>Humidity: ${data.list[0].main.humidity} % </span>`;

            //loops through forecast divs to display forecast data
            let x = 7;
            for (let i = 0; i < weatherEl.length; i++) {
                weatherEl[i].innerHTML =
                    `<span class = "forecastSpan">${moment(data.list[x].dt, "X").format("M/D/YYYY")}</span>
                    <img src="https://openweathermap.org/img/wn/${data.list[x].weather[0].icon}@2x.png">
                    <span>Temp: ${data.list[x].main.temp} ℉</span>
                    <span>Wind: ${data.list[x].wind.speed} MPH</span >
                    <span>Humidity: ${data.list[x].main.humidity} % </span>`

                x += 7;
            }
        })
}

//even listners for search button and preset city buttons, calling fetch on click
searchBtn.addEventListener("click", function () {
    getWeather(searchEl.value);

    recents.unshift(searchEl.value);
    if (recents.length > 8) {
        recents.pop();
    }

    localStorage.setItem("recents", JSON.stringify(recents));

    let newBtn = document.createElement("button");
    newBtn.textContent = searchEl.value;
    searchHistEl.prepend(newBtn);
})

cityBtns.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        getWeather(event.target.textContent);

        recents.unshift(event.target.textContent);
        if (recents.length > 8) {
            recents.pop();
        }
        localStorage.setItem("recents", JSON.stringify(recents));
    }
})
