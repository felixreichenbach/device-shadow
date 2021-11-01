const models = require("./models");
const Realm = require("realm");
var mqtt = require("mqtt");

var client = mqtt.connect("mqtt://localhost:1883");

// Realm Object or Collection Change Listener
function listener(vehicle, changes) {
  console.log(
    `${changes.changedProperties.length} properties have been changed:`
  );
  changes.changedProperties.forEach((prop) => {
    console.log("- " + `${prop}: ${vehicle[prop]}`);
  });
  client.publish("shadows", JSON.stringify(changes));
}

// Open a local realm file with default path & predefined Car schema
try {
  const realm = Realm.open({
    schema: [models.Vehicle, models.Engine, models.Person],
  })
    .then((realm) => {
      realm.write(() => {
        vehicle = realm.create("Vehicle", {
          vin: "5UXKR2C50E0H32137",
          model: "X5",
          engine: models.Engine,
          miles: 0,
        });
        person = realm.create("Person", {
          name: "John Doe",
          vehicles: [vehicle],
        });
      });
      return vehicle;
    })
    .then((vehicle) => {
      vehicle.engine.addListener(listener);
    });
} catch (err) {
  console.error("Failed to open the realm", err.message);
}

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");

  try {
    const realm = Realm.open({
      schema: [models.Vehicle, models.Engine, models.Person],
    }).then((realm) => {
      realm.write(() => {
        // Delete all objects from the realm.
        realm.deleteAll();
      });
      process.exit();
    });
  } catch (err) {
    console.error("Failed to open the realm", err.message);
  }
});
