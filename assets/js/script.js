var APIKey = "166a433c57516f51dfab1f7edaed8413";
var city = "";
var currentDate = "";
var tempF = "";
var humidityValue = "";
var windSpeed = "";
var uvIndexValue = "";
var latitude = "";
var longitude = "";
var minTempK = "";
var maxTempK = "";
var minTempF = "";
var maxTempF = "";
var dayhumidity = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";

var listOfSearchedCities = [];

var getSearchedCitiesFromLS = JSON.parse(localStorage.getItem("searched-cities"));
if (getSearchedCitiesFromLS !== null) {
    getSearchedCitiesFromLS.forEach(function(city) {
        city.toUpperCase();
    });
    listOfSearchedCities = getSearchedCitiesFromLS
}

$(document).ready(function() {
    displayCities(listOfSearchedCities);
    if (getSearchedCitiesFromLS !== null) {
        var lastCity = listOfSearchedCities[0];
        searchCity(lastCity);
    }
});

$("#search-btn").on("click", function() {
    event.preventDefault();
    clearDisplayWeatherInfo()
    resetGlobalVariables()
    var cityName = $("input").val().toUpperCase().trim();
    $("#search-input").val("");
    searchCity(cityName);

    if (cityName !== ""&& listOfSearchedCities[0] !== cityName) {
        listOfSearchedCities.unshift(cityName);
        localStorage.setItem("searched-cities", JSON.stringify(listOfSearchedCities));
        if (listOfSearchedCities.length === 1) {
            $("#searched-cities-card").removeClass("hide");
        }
        console.log($("ul#searched-cities-list a").length);
        if ($("ul#searched-cities-list a").length >= 5) {
            ($("ul#searched-cities-list a:eq(4)").remove());
        }
        $("#searched-cities-list").prepend('<a href="#" class="list-group-item" style="text-decoration: none; color: black;"> <li>${cityName}</li> </a>')
    }
});

$(document).on("click", ".list-group-item", function() {
    var cityName = $(this).text();
    clearDisplayWeatherInfo();
    resetGlobalVariables();
    searchCity(cityName);
});

function displayCurrentWeather() {
    var cardDiv = $("<div class='container border bg-light'>");
    var weatherImage = $("<img>").attr('src', currentWeatherIconUrl);
    var cardHeader = $("<h4>").text(city + " " + currentDate.toString());
    cardHeader.append(weatherImage);
    var temperatureEl = $("<p>").text("Temperature: " + tempF+ " ºF");
    var humidityEl = $("<p>").text("Humidity: " + humidityValue + "%");
    var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
    var uvIndexEl = $("<p>").text("UV Index: ");
    var uvIndexValueEl = $("<span>").text(uvIndexValue).css("background-color" getColorCodeForUVIndex(uvIndexValue));
        uvIndexEl.append(uvIndexValueEl);
        cardDiv.append(cardHeader);
        cardDiv.append(temperatureEl);
        cardDiv.append(humidityEl);
        cardDiv.append(windSpeed);
        cardDiv.append(uvIndexEl);
        $("#current-weather-conditions").append(cardDiv);
}