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

  navigator.geolocation.getCurrentPosition(
    function(position) {
      Conditions.location = "lat="+position.coords.latitude+"&lon="+position.coords.longitude;

      $.getJSON('http://api.openweathermap.org/data/2.5/weather?'+Conditions.location+'&APPID=0b9005c45c2567d9a42473381c4027ec', function(response) {
        var location = response.name;
        var temp = ((response.main.temp-273.15)*1.8+32).toFixed(1);
        var windspeed = (response.wind.speed * 0.868976).toFixed(2);
        var windgust = (response.wind.gust) ? response.wind.gust : "";
        var winddirection = response.wind.deg;

        // Write to DOM
        $('.location').html(location);
        $('.temp').addClass("fahrenheit").html(temp);
        $('.windspeed').html(windspeed);
        $('.windgust').html(windgust);
        $('.winddirection').html('<i class="wi wi-wind from-'+winddirection.toFixed()+'-deg"></i>');
        $('.wicon').html('<img src="http://openweathermap.org/img/w/'+response.weather[0].icon+'.png"></img');

        $('.json pre').html(JSON.stringify(response));
      })
    },
    function() {
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?'+Conditions.location+'&APPID=0b9005c45c2567d9a42473381c4027ec', function(response) {
        var location = response.name;
        var temp = ((response.main.temp-273.15)*1.8+32).toFixed(1);
        var windspeed = (response.wind.speed * 0.868976).toFixed(2);
        var windgust = (response.wind.gust) ? response.wind.gust : "";
        var winddirection = response.wind.deg;

        // Write to DOM
        $('.location').html(location);
        $('.temp').addClass("fahrenheit").html(temp);
        $('.windspeed').html(windspeed);
        $('.windgust').html(windgust);
        $('.winddirection').html('<i class="wi wi-wind from-'+winddirection.toFixed()+'-deg"></i>');
        $('.wicon').html('<img src="http://openweathermap.org/img/w/'+response.weather[0].icon+'.png"></img');

        $('.json pre').html(JSON.stringify(response));
      });
    });

  // API Call

  // Adding interactivity
  $('.temp').click(function() {
    var newTemp;
    if ($('.temp').hasClass('fahrenheit')) {
      newTemp = toCelc($('.temp').html());
      $('.temp').removeClass('fahrenheit');
    } else {
      newTemp = toFahr($('.temp').html());
      $('.temp').addClass('fahrenheit');
    }
    $('.temp').html(newTemp);
  });
}); 
