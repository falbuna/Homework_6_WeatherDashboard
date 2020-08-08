const Cities = [];

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
        const TodaysDate = moment().format('MM/DD/YYYY');
        $('.city').html('<h3>' + response.name + ' (' + TodaysDate + ')' + '</h3>');
        const tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $('.temp').text('Temperature: ' + tempF.toFixed(2) + ' F');
        $('.humidity').text('Humidity: ' + response.main.humidity + '%');
        $('.windspd').text('Wind Speed: ' + response.wind.speed + 'MPH');
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