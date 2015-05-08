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
});

ambient.on('error', function (err) {
  console.log(err)
});


function getData (){
	var data = [];

	for (var i = 0; i < 10; i++){
		ambient.getLightLevel(function(err, ldata){
			data.push(ldata);
		})
	}

	console.log(data)
	var avg = average(data);
	console.log('average:', avg)

	// return avg < 0.03
}

function average(arr){
	var avg;
	for (var i = 0; i < arr.length; i++){
		avg += arr[i];
	}
	return avg/(arr.length);
}