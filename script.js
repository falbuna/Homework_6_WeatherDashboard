// This will hold the Cities previously searched.
const Cities = [];
// TodaysDate is gotten from moment.js and puts it in MM/DD/YYYY Format
const TodaysDate = moment().format('MM/DD/YYYY');

// This calls the initialize function
initial();

// The initialize function will display the weather info from whatever is saved in local storage. If the user refreshes or leaves and come back, the last veiwed city will display.
function initial(){
    displayweatherinfo();
};

// This function will display the weather information into the main-weather div.
function displayweatherinfo(){

// The City constant gets pulled from local storage
const City = localStorage.getItem('city')
    // This is the URL for the Open Weather Map API that will change depending on the city input
    const WeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + ",US&appid=3cc36befffcdde3fee1a588394a435ef";
    // The Ajax for the Open Weather API
    $.ajax({
    url: WeatherURL,
    method: "GET"
    }).then(function(response){
        // This constant will change the temperature from Kelvin to Fahrenheit
        const tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // This constant will get the value of the weather icon
        const Weathericon = response.weather[0].icon;

        // This will get the name of the city from the Ajax response and the icon from the open weather map website. The date is retrieved from moment.js from the beginning of this doc.
        $('.city').html('<h3>' + response.name + ' (' + TodaysDate + ')' + '<img id="wIcon" src="https://openweathermap.org/img/wn/' + Weathericon + '@2x.png" />' + '</h3>');
        // This will get the temperature from the tempf equation to display in degrees Fahrenheit.
        $('.temp').html('Temperature: ' + tempF.toFixed(2) + ' &#8457');
        // The humidity is pulled from the Ajax response and inserted to the html.
        $('.humidity').text('Humidity: ' + response.main.humidity + '%');
        // The windspeed is pulled from the Ajax resposne and inserted to the html.
        $('.windspd').text('Wind Speed: ' + response.wind.speed + ' MPH');
        
        // The latitude and longitute coordinates are needed for the UV and 5 Day Forcast Ajax requests
        const lati = response.coord.lat;
        const longi = response.coord.lon;
            
            // This URL is for the UV Request from the Open Weather Map. The longitute and latitude are needed.
            const UVurl = "https://api.openweathermap.org/data/2.5/uvi?appid=3cc36befffcdde3fee1a588394a435ef&lon=" + longi + "&lat=" + lati;
            // The Ajax for the UV request for the Open Weather API
            $.ajax({
            url: UVurl,
            method: "GET"
            }).then(function(response){
                const UVvalue = response.value;
                    // If the UV Value is lower than 3, the background of the of the UV Index Value will be Green to indicate favorable.
                    if (UVvalue < 3){
                        $('.uvindex').html('UV Index: ' + '<span class="border rounded" style="background-color: green; color: white">' + UVvalue + '</span>');
                    }
                    // If The UV Value is greater than 6, the background of the UV Index Value will be Red to indicate servere.
                    if (UVvalue > 6){
                        $('.uvindex').html('UV Index: ' + '<span class="border rounded" style="background-color: red; color: white">' + UVvalue + '</span>');
                    }
                    // If the UV Value is more than 3 but less than 6, the background of the UV Index Value will be Yellow to indicate moderate.
                    else {
                        $('.uvindex').html('UV Index: ' + '<span class="border rounded" style="background-color: yellow; color: black">' + UVvalue + '</span>');
                    }
            });

            const forcastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + longi + "&exclude=current,minutely,hourly,&appid=3cc36befffcdde3fee1a588394a435ef";

            $.ajax({
                url: forcastURL,
                method: "GET"
            }).then(function(response){

                const cards = $("#forcastRow");

                for (let i = 1; i <= 5; i++){
                let UTCFormat = response.daily[i].dt;
                const ForDate = moment.unix(UTCFormat).format("MM/DD/YYYY");

                const ForWIcon = response.daily[i].weather[0].icon;              
                
                const FortempF = (((response.daily[i].feels_like.day - 273.15) * 1.80 + 32).toFixed(2));

                const Forhumidity = (response.daily[i].humidity);

                const cardDiv = $("<div>");
                cardDiv.addClass("card bg-primary");
                cardDiv.attr("id", "cards")

                const dateDiv = $("<div>");
                dateDiv.attr('id', 'Date: ' + ForDate);
                dateDiv.html('<h5>' + ForDate + '</h5>');
                dateDiv.addClass('cardDate');

                cardDiv.append(dateDiv);

                const iconDiv = $("<div>");
                iconDiv.attr('id', 'wIcon');
                iconDiv.html('<img id="wIcon" src="https://openweathermap.org/img/wn/' + ForWIcon + '@2x.png" />');
                iconDiv.addClass('cardIcon');

                cardDiv.append(iconDiv);

                const tempDiv = $("<div>");
                tempDiv.attr('id', 'Temp:' + FortempF);
                tempDiv.html('Temp: ' + FortempF + ' &#8457')
                tempDiv.addClass('cardTemp');

                cardDiv.append(tempDiv);

                const humidityDiv = $("<div>");
                humidityDiv.attr('id', 'Humidity:' + Forhumidity);
                humidityDiv.html('Humidity: ' + Forhumidity + '%');
                humidityDiv.addClass('cardHumidity');

                cardDiv.append(humidityDiv);

                cards.append(cardDiv);

                };
            });
        });
};

// This will signify that if the search button is clicked, the searched city will be displayed and saved to local storage.
$('.btn').on('click', function(event){
    event.preventDefault();
    const cityinput = $('#city-input').val().trim();
    localStorage.setItem('city', cityinput);

    Cities.push(cityinput);

    displayweatherinfo();
    
    // A list of the previously searched cities will display
    const cityDiv = $('<div>');
    cityDiv.text(cityinput);
    cityDiv.addClass("city-div");
    cityDiv.attr("data-value");
    $("#city-div").prepend(cityDiv);
});

$('#city-div').on('click', function(event){
    event.preventDefault();
    let citytarget = event.target;
    console.log("I've been clicked!");
    const cityinput = $(citytarget).attr('value');
    console.log(citytarget);
});