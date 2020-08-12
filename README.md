# Homework 6 WeatherDashboard

Homework for Week 6

The Weather Dashboard can be found here: [https://falbuna.github.io/Homework_6_WeatherDashboard/](https://falbuna.github.io/Homework_6_WeatherDashboard/) 

## Introduction

A traveler who likes to travel reached out to me as a junior developer to develop a website that will display the weather outlook for multiple cities so that they can plan their trip accordingly. The main use of the site would be to display the current weather conditions for the city inputed into the search bar, display the previously searched cities, and to display the 5-day forcast of the current city.

My motivation for taking on this project was to test my knowledge and skills on Ajax and further my undserstanding of jQuery. The toughest part of this assignment was getting the 5-Day Forcast to display correctly.

## Usage

When the user first enters the webpage, this is what they will see.

![Weather Dashboard with no weather information](https://github.com/falbuna/Homework_6_WeatherDashboard/blob/master/Assets/FirstView.PNG)

When the user enters a city in the search bar, they will get the City Name, Date, Temperature, Humidity, Wind Speed, UV Index, and a 5-Day Forecast.

![Weather Dashboard with San Diego Weather Information](https://github.com/falbuna/Homework_6_WeatherDashboard/blob/master/Assets/FirstSearch.PNG)

As the user searches for more cities, they will be placed underneath the search bar. If the user clicks any of the cities under the search bar, the page will display the weather information for that city.

![Weather Dashboard with additional cities searched.](https://github.com/falbuna/Homework_6_WeatherDashboard/blob/master/Assets/MoreSearches.PNG)

When the user returns to the page or refreshes, the last searched city will display.

![Weather Dashboard with infromation for Denver.](https://github.com/falbuna/Homework_6_WeatherDashboard/blob/master/Assets/LastSearched.PNG)

## How I Coded the App

I first started with getting the Ajax request to work with a static default city. Once I got that working, I was able to display the city name and temperature to the main weather display on the html page. I then worked on getting the search bar to work by storing the city to local storage. Once it was saved to local storage, I was able to get the main weather display to change depending on the city that was searched by clicking on the search button. I then got the humidity and wind speed to display to the main weather display by pulling from the same Ajax request for the city name and temperature. The next thing I did was to get the searched city to save to local storage, so that when the page is refreshed or reopened, the last searched city will display on the main weather display. The next task I tackled was to get the UV index to show to the main weather page. This turned out be a challenge because the UV index value had to be pulled from a different Ajax request from the other weather information. Once I got that figured out, the next hurdle was to change the background of the value depending on if the UV conditions were favorable (green for less than 3), moderate (yellow for a UV index value between 3 and 6), or extreme (red for greater than 6). Finding a way to change the container of the UV index value only took my quite a bit longer than the other tasks. I figured out that I could use a span tag around the value to keep it separate from the rest of the text. I then used if statements to append the text depending on the UV index value. One of the last and challenging tasks was to get the 5-Day Forecast to display as 5 different cards. I had to get another Ajax request for the forecast and getting the data I needed from that request. I was able to use a for loop to loop through the array of the Ajax request and get the data needed for the 5-Day Forecast cards. Lastly, I finished up the assignment by having the city display when the user clicks any of the previously searched cities. 