const models = require("./models");
const demoConfig = require("./demoConfig");
const Realm = require("realm");
const BSON = require("bson");


// Realm Object or Collection Change Listener
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
  // The car is identified via VIN
  await app.logIn(new Realm.Credentials.emailPassword( demoConfig.VProfile.username, demoConfig.VProfile.password ));
  console.log("currentuser vin: " + JSON.stringify(app.currentUser.profile.email));
  // When you open a synced realm, the SDK automatically automatically
  // creates the realm on the device (if it didn't exist already) and
  // syncs pending remote changes as well as any unsynced changes made
  // to the realm on the device.
  const realm = await Realm.open({
    schema: [models.Vehicle, models.Engine],
    sync: {
      user: app.currentUser,
      partitionValue: app.currentUser.profile.email, // Using VIN as partition value for car data segregation
    }
  })
  .then((realm) => {
    // The car registers itself and creates it's shadow which is synced to MongoDB Atlas
    realm.write(() => {
      vehicle = realm.create("Vehicle", {
        _id: new BSON.ObjectID(),
        vin: app.currentUser.profile.email,
        model: "X5",
        engine: models.Engine,
        miles: 0,
      });
    }); 
    vehicle.addListener(listener);
  });
};

run().catch(err => {
  console.error("Failed to open realm:", err)
});


// Demo cleanup code on shutdown

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  try {
    const realm = Realm.open({
      schema: [models.Vehicle, models.Engine],
      sync: {
        user: app.currentUser,
        partitionValue: app.currentUser.profile.email,
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

