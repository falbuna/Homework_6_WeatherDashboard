const Cities = [];

const TodaysDate = moment().format('MM/DD/YYYY');

initial();

function initial(){
    const storedCity = localStorage.getItem('city');
    displayweatherinfo();
}

function displayweatherinfo(){

const City = localStorage.getItem('city')

const WeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + ",US&appid=3cc36befffcdde3fee1a588394a435ef";

    $.ajax({
    url: WeatherURL,
    method: "GET"
    }).then(function(response){
        console.log(response);
        
        const tempF = (response.main.temp - 273.15) * 1.80 + 32;

        const Weathericon = response.weather[0].icon;
        const lati = response.coord.lat;
        const longi = response.coord.lon;

        $('.city').html('<h3>' + response.name + ' (' + TodaysDate + ')' + '</h3>');
        $('.temp').text('Temperature: ' + tempF.toFixed(2) + ' F');
        $('.humidity').text('Humidity: ' + response.main.humidity + '%');
        $('.windspd').text('Wind Speed: ' + response.wind.speed + 'MPH');

    const UVurl = "https://api.openweathermap.org/data/2.5/uvi?appid=3cc36befffcdde3fee1a588394a435ef&lon=" + longi + "&lat=" + lati;

    $.ajax({
        url: UVurl,
        method: "GET"
    }).then(function(response){
        $('.uvindex').text('UV Index: ' + response.value);
    })
    })
}

$('.btn').on('click', function(event){
    event.preventDefault();
    const cityinput = $('#city-input').val().trim();
    localStorage.setItem('city', cityinput);

    Cities.push(cityinput);

    displayweatherinfo();

    const cityBtnDiv = $('<button>');
    cityBtnDiv.text(cityinput);
    cityBtnDiv.addClass("city-btn");
    $("#city-buttons").prepend(cityBtnDiv);
    
    });