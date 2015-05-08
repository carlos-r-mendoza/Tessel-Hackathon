var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var servolib = require('servo-pca9685');
var camera = require('camera-vc0706').use(tessel.port['A']);
var servo = servolib.use(tessel.port['D']);
var servo1 = 1; // We have a servo plugged in at position 1
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['C']);
var request = require('request');


require('tesselate')({
  modules: {
    A: ['camera-vc0706', 'camera'],
    C: ['ambient-attx4', 'ambient'],
    D: ['servo-pca9685', 'servo']
  },
  development: true,
}, function(tessel, m){
    var notificationLED = tessel.led[3];

  notificationLED.high();
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
 
server.on('request', function (req, res) {
  // servo.move(servo1, 0);
 var count = 10;
 var turn = function(){
   if (count == 0) {
     count = 10;
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
 } else if (req.url === "/picture") {
    console.log("taking picture");

    camera.takePicture(function(err, image) {
      if (err) {
        console.log('error taking image', err);
      } else {
        notificationLED.low();
        // Name the image
        var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
        // Save the image
        console.log('Picture saving as', name, '...');
        process.sendfile(name, image);
        console.log('done.');
        // Turn the camera off to end the script
        camera.disable();
      }
    });
  }
});

  

 
servo.on('error', function(err){
  console.log(err);
})
})
