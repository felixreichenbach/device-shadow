const Realm = require("realm");


// Realm Schema Definition
const Car = {
  name: "Car",
  properties: {
    make: "string",
    model: "string",
    miles: "int",
  },
};


// Realm Object Cahange Listener
function listener(vehicle, changes) {
  console.log(`${changes.changedProperties.length} properties have been changed:`);
  changes.changedProperties.forEach(prop => {
      console.log("Modified Attributes: " + `${prop}: ${vehicle[prop]}`);
    });
}


// Open a local realm file with default path & predefined Car schema
try {
  const realm = Realm.open({
    schema: [Car],
  }).then(realm => {
    realm.write(() => {
      car = realm.create("Car", {_id: 1, make: "BMW", model: "X5", miles: 0});
    });
    return car;
  }).then((car) => {
    car.addListener(listener);
  });
} catch (err) {
  console.error("Failed to open the realm", err.message);
}