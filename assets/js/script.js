var sBtn = $('[type="submit"]')
sBtn.click(queryCity)
//not understanding why the click works and submit doesn't
var tArea = $('[type="text"]')
tArea.submit(queryCity)
var city
var cityInfo
var today = moment().format('L')
var lat
var lon

function queryCity() {
    city = tArea.val().trim()
    localStorage.setItem("cityName",city)
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d5831cd7b791b23429c5fcd8777aab06&units=imperial"
    fetch(queryUrl,{
        cache: 'reload',
    })
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log(data)
        cityInfo = data
        queryTwo()
    })
}

function queryTwo() {
    queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityInfo.coord.lat + "&lon=" + cityInfo.coord.lon + "&appid=d5831cd7b791b23429c5fcd8777aab06&units=imperial&exclude=minutely,hourly,alerts"
    addToList()
    fetch(queryUrl,{
        cache: 'reload',
    })
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        cityInfo = data
        console.log(data)
        displayWeather()
        localStorage.setItem("lastCity",JSON.stringify(data))
    })
}
$(document).ready(function () {
    if (!JSON.parse(localStorage.getItem("lastCity"))){ 
        return
    } else { 
        cityInfo = JSON.parse(localStorage.getItem("lastCity"))
        city = localStorage.getItem('cityName')
        displayWeather()
    }
})

function addToList() {
    var templi = $('<li></li>')
    templi.text(city)
    var here = $('#addCityHere')
    here.append(templi)
}

function displayWeather() {
    $('#cAndD').text(city + " (" + today + ")")
    $('#icon').attr('src'," http://openweathermap.org/img/wn/" + cityInfo.current.weather[0].icon + "@2x.png")
    $('#icon').attr('alt',cityInfo.current.weather[0].description)
    $('#icon').attr('title',cityInfo.current.weather[0].description)
    $('#temp').text("Temp: " + cityInfo.current.temp + "°F")
    $('#wind').text("Wind: " + cityInfo.current.wind_speed + " Mph")
    $('#hum').text("Humidity: " + cityInfo.current.humidity + "%")
    $('#uv').text("UVIndex: "+ cityInfo.current.uvi)
    for(i=0;i<5;i++){
        $('<li>',{class: "fiveDayLi"}).append(
            $("<h4>"+cityInfo.daily[i].temp.day + "</h4><img class='icon' title:'" + cityInfo.daily[i].weather[0].description + "' alt:'" + cityInfo.daily[i].weather[0].description + "' src='http://openweathermap.org/img/wn/" + cityInfo.daily[i].weather[0].icon + "@2x.png'><p>" + cityInfo.daily[i].temp.day + "</p><p>" + cityInfo.daily[i].wind_speed+"</p><p>" + cityInfo.daily[i].humidity+"</p>")).appendTo($('#fiveDay'))
    }
}