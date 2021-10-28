const Realm = require("realm");


const Car = {
  name: "Car",
  properties: {
    make: "string",
    model: "string",
    miles: "int",
  },
};


// Open a local realm file with a particular path & predefined Car schema
try {
  const realm = Realm.open({
    schema: [Car],
  }).then(realm => {
    realm.write(() => {
      car = realm.create("Car", {_id: 1, make: "BMW", model: "X5", miles: 0});
    });
  });
} catch (err) {
  console.error("Failed to open the realm", err.message);
}