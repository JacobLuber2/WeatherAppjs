let apiKey = document.querySelector("#apiKey");
let displayWeather = document.querySelector("#display");
let fetchWeather = document.getElementById("fetchWeather");
let data = null;
let toggle = document.getElementById("toggle");
let saveBtn = document.getElementById("save");
let toggleF = false;
let toggleC = true;
let newLine = document.createElement("br");
let div = document.getElementById("removeButtons");
let ul = document.querySelector("ul");
let br = document.createElement("br");
function getGeoLocation(country1, city1) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city1},${country1}&limit=1&appid=${apiKey.value}`, { mode: `cors` })
        .then((response) => {
            return response.json();
        })
        .then((geoLocation) => {
            getWeather(geoLocation[0].lat, geoLocation[0].lon);
        })
}
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey.value}`, { mode: `cors` })
        .then((response) => {
            return response.json();
        })
        .then((weather) => {
            display(weather);
            data = weather;
        })
        .catch((err) => console.error(err));
};
fetchWeather.addEventListener("click", (event) => {
    event.preventDefault();
    let country1 = document.querySelector("#CountryName").value;
    let city1 = document.querySelector("#CityName").value;
    getGeoLocation(country1, city1);
});
function display(weather) {
    let convert1 = (weather.main.temp - 273.15) * 9 / 5 + 32;
    let convert2 = Math.round(convert1);
    document.querySelector("#display").textContent = `It is currently ${convert2} °F in ${weather.name}, ${weather.sys.country}`;
}
function conversion(weather) {
    if (toggleF == true) {
        toggleC = true;
        toggleF = false;
        document.querySelector("#toggle").textContent = "In fahrenheit";
        let convert1 = (weather.main.temp - 273.15) * 9 / 5 + 32;
        let convert2 = Math.round(convert1);
        document.querySelector("#display").textContent = `It is currently ${convert2} °F in ${weather.name}, ${weather.sys.country}`;
    }
    else if (toggleC == true) {
        toggleF = true;
        toggleC = false;
        document.querySelector("#toggle").textContent = "In celsius";
        let convert1 = (weather.main.temp - 273.15);
        let convert2 = Math.round(convert1);
        document.querySelector("#display").textContent = `It is currently ${convert2} °C in ${weather.name}, ${weather.sys.country}`;
    }
}
toggle.addEventListener("click", (event) => {
    event.preventDefault();
    conversion(data);
});
saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let newLocation = document.createElement("button");
    let newLocation2 = document.getElementById(data.name);
    let removeBtn = document.createElement("button");
    if (newLocation2) {
        alert(`${data.name} location already saved`);
    } else {
        newLocation.className = data.name;
        newLocation.id = data.name;
        newLocation.textContent = `${data.name}, ${data.sys.country}`;
        let temp1 = data.sys.country
        let temp2 = data.name
        removeBtn.id = `remove ${data.name}`
        removeBtn.textContent = `remove ${data.name}`
        removeBtn.addEventListener("click", (event) => {
            newLocation.remove(data.id)
            removeBtn.remove(data.id)
        });
        newLocation.addEventListener("click", (event) => {
            event.preventDefault();
            helper(temp1, temp2);
        });
        ul.append(newLocation)
        ul.append(removeBtn)
        br.appendChild(newLocation);
        br.appendChild(removeBtn);
    }

});
function helper(country, name) {
    console.log({ country, name })
    getGeoLocation(country, name)
}



