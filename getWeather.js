var temp = "";
var humidity = "";
var description = "";
var wind = "";
var clouds = "";
var feelsLike = "";
var dispFeelsLike = "";

function getWeather() {
    // openweather api = http://api.openweathermap.org/data/2.5/weather?q=zip=77040,us&units=imperial&appid=2fa98ce6e15178b88df94c669226e90c

  var locationZip = document.getElementById('locationZip');

  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState ==4 && xhttp.status ==200) {
      weather = JSON.parse(xhttp.responseText);
      temp = weather.main.temp;
      humidity = weather.main.humidity;
      description = weather.weather[0].description;
      wind = weather.wind.speed;
      clouds = weather.clouds.all;
      //test to see response object from api server
      console.log(weather);
      heatIndex(temp,humidity);
			displayWeather(description, temp, dispFeelsLike, humidity, wind, clouds);
		}
	};
  if (locationZip.value === "") {
    var weatherDisplay = document.getElementById('displayWeather');
    weatherDisplay.innerHTML = "";
    weatherDisplay.appendChild(document.createElement('p'));
    weatherDisplay.appendChild(document.createTextNode("Please enter Zip code"));
    }	else {
	    xhttp.open("Get", "http://api.openweathermap.org/data/2.5/weather?q=zip=" + locationZip.value + ",us&units=imperial&appid=2fa98ce6e15178b88df94c669226e90c", true);
	    xhttp.send();
    }
}
//openweather.org does not supply feels like temp, so we'll calculate ourselves
function heatIndex(temp, humidity) {
      //heat index equation from http://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
      feelsLike = -42.379 + 2.04901523*temp + 10.14333127*humidity - .22475541*temp*humidity - .00683783*temp*temp - .05481717*humidity*humidity + .00122874*temp*temp*humidity + .00085282*temp*humidity*humidity - .00000199*temp*temp*humidity*humidity;
      //heat index adjustments based on temp and humidity
      if (temp > 79 && temp < 113 && humidity <13){
        feelsLike = feelsLike - ((13-humidity)/4)*((17-Math.abs(temp-95))/17)*((17-Math.abs(temp-95))/17);
      } else {
        if (temp > 80 && temp < 87 && humidity > 85) {
          feelsLike = feelsLike + ((humidity-85)/10)*((87-temp)/5);
        } else {
          if (temp < 80) {
            feelsLike = 0.5 * (temp +61 + ((temp-68)*1.2) + (humidity*0.094));
          }
        }
      }
      //feelsLike has too many decimals, let's reduce to 2 decimals
      dispFeelsLike = (Math.floor(feelsLike*100))/100;
      //end of heat index equation
      console.log(feelsLike);
}

function displayWeather(description, temp, dispFeelsLike, humidity, wind, clouds) {
  var weatherDisplay = document.getElementById('displayWeather');

	weatherDisplay.innerHTML = "";
  weatherDisplay.appendChild(document.createElement('p'));
  weatherDisplay.appendChild(document.createTextNode("Conditions: " + description));
	weatherDisplay.appendChild(document.createElement('p'));
  weatherDisplay.appendChild(document.createTextNode("Current Temperature " + temp + " degrees"));
  weatherDisplay.appendChild(document.createElement('p'));
  weatherDisplay.appendChild(document.createTextNode("Feels like: " + dispFeelsLike + " degrees"));
  weatherDisplay.appendChild(document.createElement('p'));
  weatherDisplay.appendChild(document.createTextNode("Humidity " + humidity + "%"));
  weatherDisplay.appendChild(document.createElement('p'));
  weatherDisplay.appendChild(document.createTextNode("Wind " + wind + "mph"));
  weatherDisplay.appendChild(document.createElement('p'));
  weatherDisplay.appendChild(document.createTextNode("Clouds " + clouds + "%"));
}

// Get current location from browser *only works on secured/https*
// openweather api free account is http so cannot get current location
// must upgrade to paid account or use another weather api
/*
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    var position ="Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    console.log(position);
}
*/
/*
navigator.geolocation.getCurrentPosition(function(position){console.log(position.coords.latitude)});
navigator.geolocation.getCurrentPosition(function(position){console.log(position.coords.longitude)});
API call using lat & long - api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
*/
