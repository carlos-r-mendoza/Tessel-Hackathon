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

 // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, ldata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sdata) {
        if (err) throw err;
        console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
    });
  })}, 500); // The readings will happen every .5 seconds unless the trigger is hit

  ambient.setLightTrigger(0.5);

  // Set a light level trigger
  // The trigger is a float between 0 and 1
  ambient.on('light-trigger', function(data) {
    console.log("Our light trigger was hit:", data);

    // Clear the trigger so it stops firing
    ambient.clearLightTrigger();
    //After 1.5 seconds reset light trigger
    setTimeout(function () {

        ambient.setLightTrigger(0.5);

    },1500);
  });

  // Set a sound level trigger
  // The trigger is a float between 0 and 1
  ambient.setSoundTrigger(0.1);

  ambient.on('sound-trigger', function(data) {
    console.log("Something happened with sound: ", data);

    // Clear it
    ambient.clearSoundTrigger();

    //After 1.5 seconds reset sound trigger
    setTimeout(function () {

        ambient.setSoundTrigger(0.1);

    },1500);

  });
});

ambient.on('error', function (err) {
  console.log(err)
});
///////////////////////////////////////////////////////////
    /* 
  var lightData=[];

  var getLight = setInterval(function(){

    ambient.getLightLevel(function(err, ldata){
      if (err) throw err;
      lightData.push(ldata.toFixed(4));
    })

  }, 250)

  setTimeout(clearInterval(getLight), 1500)
  console.log('our light data:')
  console.log(lightData)*/

    function doStuff (){
    var getLight = setInterval(function(){
    var lightData=[];
    var counter = 0;

      ambient.getLightLevel(function(err, ldata){
        if (err) throw err;
        if (counter ===  10) 
        console.log(ldata.toFixed(4));
        lightData.push(ldata.toFixed(4));
      })

    }, 0);
  }

  doStuff();

  // setTimeout(clearInterval(getLight), 1500);
  // setTimeout(function(){
  //  console.log('our light data:');
  //  console.log(lightData);
  // }, 2000)

//////////////////////////////
/*var tessel = require('tessel');
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
}*/