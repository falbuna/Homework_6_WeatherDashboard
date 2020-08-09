const Cities = [];

const TodaysDate = moment().format('MM/DD/YYYY');

initial();

function initial(){

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

        $('.city').html('<h3>' + response.name + ' (' + TodaysDate + ')' + '<img id="wIcon" src="https://openweathermap.org/img/wn/' + Weathericon + '@2x.png" />' + '</h3>');
        $('.temp').html('Temperature: ' + tempF.toFixed(2) + ' &#8457');
        $('.humidity').text('Humidity: ' + response.main.humidity + '%');
        $('.windspd').text('Wind Speed: ' + response.wind.speed + ' MPH');
        
        const lati = response.coord.lat;
        const longi = response.coord.lon;

            const UVurl = "https://api.openweathermap.org/data/2.5/uvi?appid=3cc36befffcdde3fee1a588394a435ef&lon=" + longi + "&lat=" + lati;

            $.ajax({
            url: UVurl,
            method: "GET"
            }).then(function(response){
                const UVvalue = response.value;
                    if (UVvalue < 3){
                        $('.uvindex').html('UV Index: ' + '<span class="border rounded" style="background-color: green; color: white">' + UVvalue + '</span>');
                    }
                    if (UVvalue > 6){
                        $('.uvindex').html('UV Index: ' + '<span class="border rounded" style="background-color: red; color: white">' + UVvalue + '</span>');
                    }
                    else {
                        $('.uvindex').html('UV Index: ' + '<span class="border rounded" style="background-color: yellow; color: black">' + UVvalue + '</span>');
                    }
            });

            // const forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + City + ",US&appid=3cc36befffcdde3fee1a588394a435ef";
            const forcastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + longi + "&exclude=current,minutely,hourly,&appid=3cc36befffcdde3fee1a588394a435ef";


            $.ajax({
                url: forcastURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
            })
        });
};

$('.btn').on('click', function(event){
    event.preventDefault();
    const cityinput = $('#city-input').val().trim();
    localStorage.setItem('city', cityinput);

    Cities.push(cityinput);

    displayweatherinfo();

    const cityBtnDiv = $('<div>');
    cityBtnDiv.text(cityinput);
    cityBtnDiv.addClass("city-div");
    $("#city-div").prepend(cityBtnDiv);    
});