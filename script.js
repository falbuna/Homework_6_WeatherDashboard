                const City = "San Diego"

                const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&appid=3cc36befffcdde3fee1a588394a435ef";

                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function(response){
                        console.log(response);
                        $('.city').html('<h3>' + response.name + ' (Date) </h3>');
                        const tempF = (response.main.temp - 273.15) * 1.80 + 32;
                        $('.temp').text('Temperature: ' + tempF.toFixed(2) + ' F');
                    })