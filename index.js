const Realm = require("realm");

const Axles = {
  name: "Axles",
  embedded: true,
  properties: {
    wheel: "string?",
    pressure: "int?"
  },
};


// Realm Schema Definition
const Vehicle = {
  name: "Vehicle",
  properties: {
    vehicleIdentification: "{}",
    //axles: {type: "list", objectType: Axles},
    ambientAirTemperature: { type: "int", default: 0 },
    mileage: { type: "int", default: 0 }
  },
};


// Realm Object or Collection Change Listener
function listener(vehicle, changes) {
  console.log(
    `${changes.changedProperties.length} properties have been changed.`
  );
  changes.changedProperties.forEach((prop) => {
    console.log("Modified Attributes: {" + `${prop}: ${vehicle[prop]}}`);
  });
}

// Open a local realm file with default path & predefined Car schema
try {
  const realm = Realm.open({
    schema: [Vehicle],
  })
    .then((realm) => {
      realm.write(() => {
        vehicle = realm.create("Vehicle", {
          miles: 0,
          vehicleIdentification: {
            vin: "XKDNF23SDF23666MND?",
            model: "X5",
            brand: "BMW"
          }
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



