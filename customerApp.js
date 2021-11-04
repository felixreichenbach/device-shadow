const models = require("./models");
const Realm = require("realm");
const BSON = require("bson");
const demoConfig = require("./demoConfig");


// Realm Object Change Listener
function listener(vehicle, changes) {
  console.log(
    `${changes.changedProperties.length} properties have changed:`
  );
  changes.changedProperties.forEach((prop) => {
    console.log("- " + `${prop}: ${vehicle[prop]}`);
  });
}

const app = new Realm.App({ id: demoConfig.RealmAppID });

async function run() {
  await app.logIn(new Realm.Credentials.emailPassword( demoConfig.CProfile.username, demoConfig.CProfile.password ));
  // When you open a synced realm, the SDK automatically automatically
  // creates the realm on the device (if it didn't exist already) and
  // syncs pending remote changes as well as any unsynced changes made
  // to the realm on the device.
  const realm = await Realm.open({
    schema: [models.Vehicle, models.Engine],
    sync: {
      user: app.currentUser,
      partitionValue: app.currentUser.customData.vin,
    }
  })
  .then((realm) => {
    const vehicle = realm.objects("Vehicle").filtered(`vin = "${app.currentUser.customData.vin}"`);
    vehicle[0].addListener(listener);
  });
};

run().catch(err => {
  console.error("Failed to open realm:", err);
  console.log("--> Make sure vehicleInstance.js is up and running")
});




// Demo cleanup code

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  try {
    const realm = Realm.open({
      schema: [models.Vehicle, models.Engine],
      sync: {
        user: app.currentUser,
        partitionValue: app.currentUser.id,
      }
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