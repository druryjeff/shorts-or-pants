// add your API key inside the quotes on line 3
function weatherBalloon() {
  var key = 'e35ca5623af73c61e78b08a4d03a4462';
  var lat = '41.740681';
  var lon = '-71.308609';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
  	 $('header p').html('<a href="#">What&apos;s it Gonna Be?</a>');
	 $('header a').click(function(){
	 	$('header').addClass('anim');
	 })
    drawWeather(data);
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

// display weather information
function drawWeather( d ) {

	let oneHigh = Math.round(convertTemp(d.daily[0].temp.max));
	let twoHigh = Math.round(convertTemp(d.daily[1].temp.max));
	let threeHigh = Math.round(convertTemp(d.daily[2].temp.max));
	let fourHigh = Math.round(convertTemp(d.daily[3].temp.max));
	let fiveHigh = Math.round(convertTemp(d.daily[4].temp.max));
	let sixHigh = Math.round(convertTemp(d.daily[5].temp.max));
	let sevenHigh = Math.round(convertTemp(d.daily[6].temp.max));
	
	checkTemp(oneHigh, $('.one'));
	checkTemp(twoHigh, $('.two'));
	checkTemp(threeHigh, $('.three'));
	checkTemp(fourHigh, $('.four'));
	checkTemp(fiveHigh, $('.five'));
	checkTemp(sixHigh, $('.six'));
	checkTemp(sevenHigh, $('.seven'));

	$('.one').append('<h4>'+displayDay(0)+'</h4><p>'+oneHigh+'</p>');
	$('.two').append('<h4>'+displayDay(1)+'</h4><p>'+twoHigh+'</p>');
	$('.three').append('<h4>'+displayDay(2)+'</h4><p>'+threeHigh+'</p>');
	$('.four').append('<h4>'+displayDay(3)+'</h4><p>'+fourHigh+'</p>');
	$('.five').append('<h4>'+displayDay(4)+'</h4><p>'+fiveHigh+'</p>');
	$('.six').append('<h4>'+displayDay(5)+'</h4><p>'+sixHigh+'</p>');
	$('.seven').append('<h4>'+displayDay(6)+'</h4><p>'+sevenHigh+'</p>');

}


/* -----------------------------------------------
   Function for assigning thumbs up/down
   ----------------------------------------------- */

function checkTemp(n,e){
	if(n > 32){
		e.append('<img src="img/th-up.svg" alt="Thumb icon created by Piero Borgo from the Noun Project">');
	} else {
		e.append('<img src="img/th-down.svg" alt="Thumb icon created by Piero Borgo from the Noun Project">');		
	}
}


/* -----------------------------------------------
   Function for converting temp to fahrenheit
   ----------------------------------------------- */

function convertTemp(t){

  return Math.round(((parseFloat(t)-273.15)*1.8)+32);

}


/* -----------------------------------------------
   Function for creating day of the week
   ----------------------------------------------- */

// based on a system where 0 = today, 1 = tomorrow, etc.
// note: the number system below does not immediately correlate
// for example, 0 for today does not line up with 0 for Sunday below
// how this works – in the return statement, d.getDay() gets today's date
// as a number (if today is Thursday, d.getDay() will be 4)
// adding "n" to this number gives you how many days from today.
// n is passed as an argument to the displayDay() function
// in the main body of the code above.
// if today is Thursday, the 4th day of the week,
// and the number 2 is passed as an argument, 
// the function will return the number 6. 6 maps to Saturday in the 
// weekday array below.

function displayDay(n){

  var d = new Date();
  var weekday = new Array();

  weekday[0] = "Su";
  weekday[1] = "Mo";
  weekday[2] = "Tu";
  weekday[3] = "We";
  weekday[4] = "Th";
  weekday[5] = "Fr";
  weekday[6] = "Sa";

  var dispDay = d.getDay() + n;

  // adjust number system for numbers over 6
  // subtract 7 from totals higher than 6
  // to keep the day numbers in the array range above
  if(dispDay > 6){
    dispDay = dispDay - 7;
  }

  return weekday[ dispDay ];

}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function() {
  weatherBalloon();
}
