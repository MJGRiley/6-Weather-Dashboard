var sBtn = $('[type="submit"]')
sBtn.click(queryCity)
//not understanding why the click works and submit doesn't
var tArea = $('[type="text"]')
tArea.submit(queryCity)
var city
var cityInfo
var cityInfo2
var today = moment().format('L')
var lat
var lon

function queryCity() {
    city = tArea.val().trim()
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
        getFiveDay()
        localStorage.setItem("lastCity",JSON.stringify(data))
    })
}

function addToList() {
    var templi = $('<li></li>')
    templi.text(city)
    var here = $('#addCityHere')
    here.append(templi)
    console.log('WTF')

}

function displayWeather() {
    $('#cAndD').text(city + " (" + today + ")")
    $('#icon')
    $('#temp').text("Temp: " + cityInfo.current.temp + "°F")
    $('#wind').text("Wind: " + cityInfo.current.wind_speed + " Mph")
    $('#hum').text("Humidity: " + cityInfo.current.humidity + "%")
    $('#uv').text("UVIndex: "+ cityInfo.current.uvi)
}

function getFiveDay() {

}

function storeLastCity() {
}