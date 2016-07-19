<script src="https://code.jquery.com/jquery-2.2.1.min.js"
        integrity="sha256-gvQgAFzTH6trSrAWoH1iPo9Xc96QxSZ3feW6kem+O00="
        crossorigin="anonymous">


/*$( document ).ready(function() {
	alert("welcome");
	}); */

function getWeather() {
  //var weather = $.post("http://api.openweathermap.org/data/2.5/weather?q=zip=77040,us&units=imperial&appid=2fa98ce6e15178b88df94c669226e90c");

  var locationZip = document.getElementById('locationZip');

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState ==4 && xhttp.status ==200) {
      var weather = xhttp.responseText;
      var temp = weather.main.temp;
      var humidity = weather.main.humidity;
      var wind = weather.wind.speed;
      var clouds = weather.clouds.all;
			displayWeather(temp, humidity, wind, clouds);
		}
	};
	xhttp.open("Get", "http://api.openweathermap.org/data/2.5/weather?q=zip=" + locationZip.value + ",us&units=imperial&appid=2fa98ce6e15178b88df94c669226e90c", true);
	xhttp.send();
};

function displayWeather(temp, humidity, wind, clouds) {
	var weatherDisplay = document.getElementById('displayWeather');

	weatherDisplay.innerHTML = "";
	weatherDisplay.appendChild(document.createElement('p'));
	weatherDisplay.appendChild(document.createTextNode("Current Temperature " + temp + " degrees"));
	weatherDisplay.appendChild(document.createElement('p'));
	weatherDisplay.appendChild(document.createTextNode("Humidity " + humidity + "%"));
	weatherDisplay.appendChild(document.createElement('p'));
	weatherDisplay.appendChild(document.createTextNode("Wind " + wind + "mph"));
	weatherDisplay.appendChild(document.createElement('p'));
	weatherDisplay.appendChild(document.createTextNode("Clouds " + clouds + "%"));
};

/*  Get current location from browser
navigator.geolocation.getCurrentPosition(function(position){console.log(position.coords.latitude)});
navigator.geolocation.getCurrentPosition(function(position){console.log(position.coords.longitude)});
API call using lat & long - api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
*/

</script>
