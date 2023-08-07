let searchEl = document.querySelector("input");
let searchBtn = document.querySelector("#searchBtn");
let cityBtns = document.querySelector("#cityBtns");
let weatherEl = document.querySelectorAll(".weather");

function getWeather(location) {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=48a7e18c666050565ed304894777941b`)
        .then(response => response.json())
        .then(citiesFound => {
            let firstCity = citiesFound[0];

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=48a7e18c666050565ed304894777941b`)
        })

        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < weatherEl.length; i++) {

                // let newSpan = document.createElement("span");
                // newSpan.textContent = data.list[i].dt_txt.split(" ")[0];
                // weatherEl[i].appendChild(newSpan);
            }
        })
}

searchBtn.addEventListener("click", () => {
    getWeather(searchEl.value);
})

cityBtns.addEventListener("click", event => {
    if (event.target.matches("button")) {
        getWeather(event.target.textContent);
    }
})