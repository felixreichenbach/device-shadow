const Models = require('./models');
const Realm = require("realm");

// Open a local realm file with default path & predefined Car schema
try {
  const realm = Realm.open({
    schema: [Models.Vehicle, Models.Axles],
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
