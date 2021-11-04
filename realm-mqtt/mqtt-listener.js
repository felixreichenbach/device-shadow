var mqtt = require("mqtt");

var client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", function () {
  client.subscribe("shadows", function (err) {});
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  client.end();
  process.exit();
});
