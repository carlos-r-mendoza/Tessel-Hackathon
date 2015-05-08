var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var servolib = require('servo-pca9685');
//var camera = require('camera-vc0706').use(tessel.port['A']);
var servo = servolib.use(tessel.port['D']);
var servo1 = 1; // We have a servo plugged in at position 1
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['C']);
var request = require('request');

// var notificationLED = tessel.led[3];

// camera.on('ready', function() {
//   notificationLED.high();
  server.on('request', function (req, res) {
  // servo.move(servo1, 0);

 var count = 6;
 var turn = function(){
   if (count == 0) {
     count = 6;
     return 0;
   } else if (count % 2 == 0){
     count -= 1;
     servo.move(servo1, 1);
     return setTimeout(turn, 1500);
   } else if (count % 2 == 1){
     count -= 1;
     servo.move(servo1, 0);
     return setTimeout(turn, 1500)
   }
 };

 if (req.url === '/high') {
  console.log('high');
   turn();
 }
 else if (req.url === '/med') {
   console.log('got med req')
   servo.move(servo1, 0.7);
    setTimeout(function() { servo.move(servo1, 0) }, 2000);
 }
 else if (req.url === '/low') {
   console.log('got low req')
   servo.move(servo1, 0.4);
     setTimeout(function() { servo.move(servo1, 0) }, 2000);
 } 
  });





servo.on('ready', function () {
  servo.configure(servo1, 0.05, 0.50, function () {
    server.listen(1337, function () {
      console.log('Server listening!');
      // setTimeout(function() {

      //   app.post('/', function (req, res)) {
      //     res.json('payload={"channel": "#cereal", "username": "webhookbot", "text": "This is posted to #cereal and comes from a bot named webhookbot.", "icon_emoji": ":ghost:"}');
      //   }

      // }, 3000);
    });
  });
});  
// });

 

 
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