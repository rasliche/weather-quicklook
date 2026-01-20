$('document').ready(function() {
  // Here's the base object
  var Conditions = {
    location: "zip=33042,us"
  };

  // Declared Functions
  var toFahr = function(temp) {
    return (temp * 1.8 + 32).toFixed();
  }

  var toCelc = function(temp) {
    return ((temp - 32)/1.8).toFixed();
  }

  var getWeather = function() {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?'+Conditions.location+'&APPID=0b9005c45c2567d9a42473381c4027ec', function(response) {
      var location = response.name;
      var temp = ((response.main.temp-273.15)*1.8+32).toFixed(1);
      var windspeed = (response.wind.speed * 0.868976).toFixed(2);
      var windgust = (response.wind.gust) ? response.wind.gust : "";
      var winddirection = response.wind.deg;
      var weathericon = response.weather[0].id;

      // Write to DOM
      $('.location').html(location);
      $('.temp').addClass("fahrenheit").html(temp);
      $('.windspeed').html(windspeed);
      $('.windgust').html(windgust);
      $('.winddirection').html('<i class="wi wi-wind from-'+winddirection.toFixed()+'-deg"></i>');
      $('.wicon').addClass('wi wi-owm-night-'+weathericon);

      // $('.json pre').html(JSON.stringify(response));
    }); // API Call
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      Conditions.location = "lat="+position.coords.latitude+"&lon="+position.coords.longitude;

      getWeather();
    }, // API Call
    function() {
      getWeather();
    }); // Location Call

  // 8724238 Munson Island Tide Station ID
  $.getJSON('http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=20130808 15:00&end_date=20130808 15:06&station=8454000&product=water_temperature&units=english&time_zone=gmt&application=ports_screen&format=json', function(response) {
    console.log(JSON.stringify(response));
  });

  // Adding interactivity
  $('.temp').click(function() {
    var newTemp;
    if ($('.temp').hasClass('fahrenheit')) {
      newTemp = toCelc($('.temp').html());
      $('.temp').removeClass('fahrenheit');
      $('.temp').addClass('celsius');
      $('.units').html('C')
    } else {
      newTemp = toFahr($('.temp').html());
      $('.temp').removeClass('celsius');
      $('.temp').addClass('fahrenheit');
      $('.units').html('F')
    }
    $('.temp').html(newTemp);
  });
});
