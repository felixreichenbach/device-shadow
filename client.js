// var mqtt = require('mqtt')
// var client  = mqtt.connect('mqtt://localhost:1883')

// client.on('connect', function () {
//     console.log("connect")
//     client.subscribe('presence', function (err) {
//         if (!err) {
//         client.publish('presence', 'Hello mqtt')
//         }
//     })
// })

// client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log(message.toString())
//     client.end()
// })

const Realm = require("realm");

const Axles = {
  name: "Axles",
  embedded: true,
  properties: {
    wheel: "string?",
    pressure: { type: "int?", default: 0 },
  },
};

// Realm Schema Definition
const Vehicle = {
  name: "Vehicle",
  properties: {
    axles: "Axles",
    ambientAirTemperature: { type: "int", default: 0 },
    mileage: { type: "int", default: 0 },
  },
};

// Open a local realm file with default path & predefined Car schema
try {
  const realm = Realm.open({
    schema: [Vehicle, Axles],
  }).then((realm) => {
    const vehicles = realm.objects("Vehicle");
    console.log(vehicles[0].ambientAirTemperature);
    console.log(JSON.stringify(vehicles));
    //console.log(`${vehicles.map((vehicle) => vehicle.mileage)}`);
    realm.write(() => {
      vehicles[0].ambientAirTemperature = 132;
      vehicles[0].mileage = 232;
    });
  });
} catch (err) {
  console.error("Failed to open the realm", err.message);
}
