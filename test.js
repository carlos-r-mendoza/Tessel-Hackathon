var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var servolib = require('servo-pca9685');
// var camera = require('camera-vc0706').use(tessel.port['A']);
var servo = servolib.use(tessel.port['D']);
var servo1 = 1; // We have a servo plugged in at position 1
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['C']);
var request = require('request');
 
server.on('request', function (req, res) {
  var position = 0;
  var remain = 0;
  
  if (req.url === '/high') {
      console.log('got high req')
    position += 1;
    if (position >= 1){
      remain = 2 - position;
      position = 1;
      servo.move(servo1, position);
      setTimeout(servo.move(servo1, remain), 500);
      position = remain;
      remain = 0;
    }
 
  }
  else if (req.url === '/med') {
    position += 0.6;
      console.log('got medium req')
    if (position >= 1){
      remain = 2 - position;
      position = 1;
      servo.move(servo1, position);
      setTimeout(servo.move(servo1, remain), 500);
      position = remain;
      remain = 0;
    }
    else {
      servo.move(servo1, position);
    }
 
  }
  else if (req.url === '/low') {
    position += 0.3;
    console.log('got low req')
    if (position >= 1){
      remain = 2 - position;
      position = 1;
      servo.move(servo1, position);
      setTimeout(servo.move(servo1, remain), 500);
      position = remain;
      remain = 0;
    }
    else {
      servo.move(servo1, position);
    }
  }
});
 
servo.on('ready', function () {
  servo.configure(servo1, 0.05, 0.12, function () {
    server.listen(1337, function () {
      console.log('Server listening!');
    });
  });
});
 
servo.on('error', function(err){
  console.log(err);
})
// ambient.on('ready', function () {
//   ambient.setLightTrigger(0.5);
 
//   // Set a light level trigger
//   // The trigger is a float between 0 and 1
//   ambient.on('light-trigger', function (data) {
//     console.log("Our light trigger was hit:", data);
//     request('localhost:1337/low', function(error, res, body){
//       console.log('hopefully light-triggered motor');
//     })
//     // Clear the trigger so it stops firing
//     ambient.clearLightTrigger();
//     //After 1.5 seconds reset light trigger
//     setTimeout(function () {
 
//       ambient.setLightTrigger(0.2);
 
//     }, 1000);
//   });
// });
 
// ambient.on('error', function (err) {
//   console.log(err)
// });