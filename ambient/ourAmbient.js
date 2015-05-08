// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This ambient module example console.logs
ambient light and sound levels and whenever a
specified light or sound level trigger is met.
*********************************************/

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['C']);

ambient.on('ready', function () {
	console.log('light sensor is ready!');
	var lightData=[];

	var setInterval(function(){

		ambient.getLightLevel(function(err, ldata){
			if (err) throw err;
			console.log(ldata.toFixed(4));
			lightData.push(ldata.toFixed(4));
		})

	}, 250);

	getLight();

	setTimeout(clearInterval(getLight), 1500);
	setTimeout(function(){
		console.log('our light data:');
		console.log(lightData);
	}, 2000)
});

ambient.on('error', function (err) {
  console.log(err)
});