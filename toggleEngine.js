const Models = require("./models");
const Realm = require("realm");

// Open a local realm file with default path & predefined Car schema
try {
  const realm = Realm.open({
    schema: [Models.Vehicle, Models.Engine, Models.Person],
  }).then((realm) => {
    const vehicles = realm.objects("Vehicle");
    realm.write(() => {
      vehicles[0].engine.running = !vehicles[0].engine.running;
    });
    console.log("Engine Running: " + vehicles[0].engine.running);
    realm.close();
  });
} catch (err) {
  console.error("Failed to open the realm", err.message);
}
