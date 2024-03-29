var apiKey = "c3bb0467c5fe3c085d6f9dc0307b561b";
var currentDate = moment().format("L");
var searchArray = [];

var futureDay1 = moment().add(1,'days').startOf('day').format("L");
var futureDay2 = moment().add(2,'days').startOf('day').format("L");
var futureDay3 = moment().add(3,'days').startOf('day').format("L");
var futureDay4 = moment().add(4,'days').startOf('day').format("L");
var futureDay5 = moment().add(5,'days').startOf('day').format("L");

$(document).ready(function(){

renderSearches();
loadBoston();

function renderSearches(){
    var pulledCurrentCity = localStorage.getItem("currentCity");
    pulledCurrentCity = JSON.parse(pulledCurrentCity);

    searchArray.push(pulledCurrentCity);
    
    for (var i = 0; i < searchArray.length; i++){
        var city = searchArray[i];
        var newLi = $('<li class="list-group-item"></li>');
        $("#search-list").append(newLi);
        $(newLi).append(city);
    };
};

function loadBoston(){
    var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=Boston,us&APPID=${apiKey}&units=imperial`
    $.ajax({
        url: currentUrl,
        method: "GET"
    }).done(function(response){
        var currentCity = response.name; 
        var currentTemp = response.main.temp;
        var currentHumidity = response.main.humidity;
        var currentWind = response.wind.speed;
        var currentLat = response.coord.lat;
        var currentLon = response.coord.lon;
        var currentIcon = response.weather[0].icon;
        var currentIconUrl = `http://openweathermap.org/img/w/${currentIcon}.png`;
        var setIcon = $("#current-icon").attr('src', currentIconUrl);
        
        $("#current-city").append(currentCity + "(");
        $("#current-city").append(" " + currentDate + ")");
        $("#current-city").append(setIcon);
        $("#current-temp").append(currentTemp + " °F");
        $("#current-humidity").append(currentHumidity + " %");
        $("#current-wind").append(currentWind + " MPH");

        var currentUvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${currentLat}&lon=${currentLon}&APPID=${apiKey}`;

        $.ajax({
            url: currentUvUrl,
            method: "GET"
        }).done(function(response){
            console.log(response);
            console.log(response.value);
            var currentUv = response.value;
            $("#uv-index").append(currentUv);
        });

        var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity},us&APPID=${apiKey}&units=imperial`;

        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).done(function(response){
            console.log(response);
            console.log(response.list[0].main.temp);
            console.log(response.list[0].weather[0].icon);
    
            var icon1 = response.list[0].weather[0].icon;
            var icon2 = response.list[1].weather[0].icon;
            var icon3 = response.list[2].weather[0].icon;
            var icon4 = response.list[3].weather[0].icon;
            var icon5 = response.list[4].weather[0].icon;

            var icon1Url = `http://openweathermap.org/img/w/${icon1}.png`;
            var icon2Url = `http://openweathermap.org/img/w/${icon2}.png`;
            var icon3Url = `http://openweathermap.org/img/w/${icon3}.png`;
            var icon4Url = `http://openweathermap.org/img/w/${icon4}.png`;
            var icon5Url = `http://openweathermap.org/img/w/${icon5}.png`;

            $("#icon1").attr({
                src: icon1Url,
                width: 50, 
                height: 50
            });
            $("#icon2").attr({
                src: icon2Url,
                width: 50, 
                height: 50
            });
            $("#icon3").attr({
                src: icon3Url,
                width: 50, 
                height: 50
            });
            $("#icon4").attr({
                src: icon4Url,
                width: 50, 
                height: 50
            });
            $("#icon5").attr({
                src: icon5Url,
                width: 50, 
                height: 50
            });

            $("#temp1").append(response.list[0].main.temp + " °F");
            $("#temp2").append(response.list[1].main.temp + " °F");
            $("#temp3").append(response.list[2].main.temp + " °F");
            $("#temp4").append(response.list[3].main.temp + " °F");
            $("#temp5").append(response.list[4].main.temp + " °F");
            
            $("#humid1").append(response.list[0].main.humidity + " %");
            $("#humid2").append(response.list[1].main.humidity + " %");
            $("#humid3").append(response.list[2].main.humidity + " %");
            $("#humid4").append(response.list[3].main.humidity + " %");
            $("#humid5").append(response.list[4].main.humidity + " %");
        });


        $("#date1").append(futureDay1);
        $("#date2").append(futureDay2);
        $("#date3").append(futureDay3);
        $("#date4").append(futureDay4);
        $("#date5").append(futureDay5);

});
};

$("#search-button").on("click", function(event){
    event.preventDefault();
    var cityInput = $("input").val();
    var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput},us&APPID=${apiKey}&units=imperial`

    $.ajax({
        url: currentUrl,
        method: "GET"
    }).done(function(response){
        console.log(response);
        console.log(response.weather[0].icon);

        var currentCity = response.name; 

        var currentCityJSON = JSON.stringify(currentCity);
        localStorage.setItem("currentCity", currentCityJSON);

        var currentTemp = response.main.temp;
        var currentHumidity = response.main.humidity;
        var currentWind = response.wind.speed;
        var currentLat = response.coord.lat;
        var currentLon = response.coord.lon;
        var currentIcon = response.weather[0].icon;
        var currentIconUrl = `http://openweathermap.org/img/w/${currentIcon}.png`;
        var setIcon = $("#current-icon").attr('src', currentIconUrl);

        $("#current-city").empty();
        $("#current-city").empty();
        $("#current-city").empty();
        $("#current-temp").empty();
        $("#current-humidity").empty();
        $("#current-wind").empty();
        
        
        $("#current-city").append(currentCity + "(");
        $("#current-city").append(" " + currentDate + ")");
        $("#current-city").append(setIcon);
        $("#current-temp").append("Temperature: " + currentTemp + " °F");
        $("#current-humidity").append("Humidity: " + currentHumidity + " %");
        $("#current-wind").append("Wind Speed: " + currentWind + " MPH");
        
        var currentUvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${currentLat}&lon=${currentLon}&APPID=${apiKey}`;

        $.ajax({
            url: currentUvUrl,
            method: "GET"
        }).done(function(response){
            console.log(response);
            console.log(response.value);
            var currentUv = response.value;
            $("#uv-index").empty();
            $("#uv-index").append("UV Index: " + currentUv);
        });

        var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity},us&APPID=${apiKey}&units=imperial`;

        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).done(function(response){
            console.log(response);
            console.log(response.list[0].main.temp);
            console.log(response.list[0].weather[0].icon);
    
            var icon1 = response.list[0].weather[0].icon;
            var icon2 = response.list[1].weather[0].icon;
            var icon3 = response.list[2].weather[0].icon;
            var icon4 = response.list[3].weather[0].icon;
            var icon5 = response.list[4].weather[0].icon;

            var icon1Url = `http://openweathermap.org/img/w/${icon1}.png`;
            var icon2Url = `http://openweathermap.org/img/w/${icon2}.png`;
            var icon3Url = `http://openweathermap.org/img/w/${icon3}.png`;
            var icon4Url = `http://openweathermap.org/img/w/${icon4}.png`;
            var icon5Url = `http://openweathermap.org/img/w/${icon5}.png`;

            $("#icon1").attr({
                src: icon1Url,
                width: 50, 
                height: 50
            });
            $("#icon2").attr({
                src: icon2Url,
                width: 50, 
                height: 50
            });
            $("#icon3").attr({
                src: icon3Url,
                width: 50, 
                height: 50
            });
            $("#icon4").attr({
                src: icon4Url,
                width: 50, 
                height: 50
            });
            $("#icon5").attr({
                src: icon5Url,
                width: 50, 
                height: 50
            });

            $("#temp1").empty();
            $("#temp2").empty();
            $("#temp3").empty();
            $("#temp4").empty();
            $("#temp5").empty();
            
            $("#humid1").empty();
            $("#humid2").empty();
            $("#humid3").empty();
            $("#humid4").empty();
            $("#humid5").empty();


            $("#temp1").append("Temp: " + response.list[0].main.temp + " °F");
            $("#temp2").append("Temp: " + response.list[1].main.temp + " °F");
            $("#temp3").append("Temp: " + response.list[2].main.temp + " °F");
            $("#temp4").append("Temp: " + response.list[3].main.temp + " °F");
            $("#temp5").append("Temp: " + response.list[4].main.temp + " °F");
            
            $("#humid1").append("Humidity: " + response.list[0].main.humidity + " %");
            $("#humid2").append("Humidity: " + response.list[1].main.humidity + " %");
            $("#humid3").append("Humidity: " + response.list[2].main.humidity + " %");
            $("#humid4").append("Humidity: " + response.list[3].main.humidity + " %");
            $("#humid5").append("Humidity: " + response.list[4].main.humidity + " %");
        });


        $("#date1").append(futureDay1);
        $("#date2").append(futureDay2);
        $("#date3").append(futureDay3);
        $("#date4").append(futureDay4);
        $("#date5").append(futureDay5);

    });   

});

});
