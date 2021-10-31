const models = require('./models');
const Realm = require("realm");
var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://localhost:1883');

// Realm Object or Collection Change Listener
function listener(vehicle, changes) {
  console.log(
    `${changes.changedProperties.length} properties have been changed:`
  );
  changes.changedProperties.forEach((prop) => {
    console.log("- " + `${prop}: ${vehicle[prop]}`);
  });
  client.publish('shadows', JSON.stringify(changes));
}

// Open a local realm file with default path & predefined Car schema
try {
  const realm = Realm.open({
    schema: [models.Vehicle, models.Axles],
  })
    .then((realm) => {
      realm.write(() => {
        vehicle = realm.create("Vehicle", {
          miles: 0,
          vehicleIdentification: {
            vin: "XKDNF23SDF23666MND?",
            model: "X5",
            brand: "BMW",
          },
        });
      });
      return vehicle;
    })
    .then((vehicle) => {
      vehicle.addListener(listener);
    });
} catch (err) {
  console.error("Failed to open the realm", err.message);
}

process.on('SIGINT', function() {
  console.log("Caught interrupt signal");

  try {
    const realm = Realm.open({
      schema: [models.Vehicle, models.Axles],
    })
    .then((realm) => {
      realm.write(() => {
        // Delete all objects from the realm.
        realm.deleteAll();
      });
      process.exit();
    })
  } catch (err) {
    console.error("Failed to open the realm", err.message);
  }
});