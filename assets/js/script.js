var owmAPI = "788d5638d7c8e354a162d6c9747d1bdf";
var currentCity = "";
var lastCity = "";

var handleErrors = function(reponse) {
    if (!reponse.ok) {
        throw Error(reponse.statusText);
    }
    return response;
}

var getCurrentConditions = function(event) {
    let city = $('#search-city').val();
    currentCity = $('#search-city').val();
    let queryURL = ""
}