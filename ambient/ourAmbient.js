// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This ambient module example console.logs
ambient light and sound levels and whenever a
specified light or sound level trigger is met.
*********************************************/

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {
	console.log('light sensor is ready!');
	
	setInterval( function () {
	    ambient.getLightLevel( function(err, ldata) {
	      if (err) throw err;
	        console.log("Light level:", ldata.toFixed(8));
	    });
	  })}, 500);

	setTimeout(clearInterval(lightStuff), 1500);
});

ambient.on('error', function (err) {
  console.log(err)
});