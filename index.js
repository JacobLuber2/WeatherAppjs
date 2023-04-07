let country1 = document.querySelector("#CountryName");
let city1 = document.querySelector("#CityName");
let apiKey = document.querySelector("#apiKey");
let displayWeather = document.querySelector("#display");
let fetchWeather = document.getElementById("fetchWeather");
let toggle = document.getElementById("toggle");
let data = null;
let saveBtn = document.getElementById("save");
let savedLocationsContainer = [];
let toggleF = false;
let toggleC = true;
let ul = document.querySelector("ul");
function getGeoLocation(country1, city1) {
console.log(country1.value, city1.value);
 fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city1.value},${country1.value}&limit=1&appid=${apiKey.value}`, { mode: `cors` })
        .then((response) => {
            return response.json();
        })
        .then((geoLocation) => {
            console.log(geoLocation[0].lat, geoLocation[0].lon);
            getWeather(geoLocation[0].lat, geoLocation[0].lon);
        })
}
function getWeather(lat, lon) {
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey.value}`, { mode: `cors`})
        .then((response) => {
           return response.json();
        })
        .then((weather) => {
            console.log(weather);
            display(weather);
            data = weather;
            console.log(`data`, data);
        })
        .catch((err) => console.error(err));
};
fetchWeather.addEventListener("click", (event) => {
    event.preventDefault();
    getGeoLocation(country1, city1);  
});
function display(weather) {
console.log(`weather`, weather)
let convert1 = (weather.main.temp-273.15)*9/5+32;
let convert2 = Math.round(convert1);
document.querySelector("#display").textContent = `It is currently ${convert2} °F in ${weather.name}, ${weather.sys.country}`;
}
function conversion(weather) {
if (toggleF == true) {
toggleC = true;
toggleF = false;
document.querySelector("#toggle").textContent = "In fahrenheit";
let convert1 = (weather.main.temp-273.15)*9/5+32;
let convert2 = Math.round(convert1);
document.querySelector("#display").textContent = `It is currently ${convert2} °F in ${weather.name}, ${weather.sys.country}`;
}
else if (toggleC == true) {
toggleF = true;
toggleC = false;
document.querySelector("#toggle").textContent = "In celsius";
let convert1 = (weather.main.temp-273.15);
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
newLocation.className = data.name;
newLocation.id = data.name;
newLocation.textContent = `${data.name}, ${data.sys.country}`;
data.name = document.querySelector("#CityName");
data.sys.country = document.querySelector("#CountryName");

newLocation.addEventListener("click", (event) => {
event.preventDefault();
let temp1 = data.sys.country
let temp2 = data.name
helper(temp1, temp2);
});
ul.appendChild(newLocation)
});

function helper(country, name) {
console.log({country, name})
getGeoLocation(country, name)
}





