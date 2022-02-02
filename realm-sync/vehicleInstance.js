const models = require("./models");
const demoConfig = require("./demoConfig");
const Realm = require("realm");
const BSON = require("bson");

const vehicleSchemas = [models.vehicleSchema, models.vehicle_attributesSchema, models.vehicle_signalsSchema, models.vehicle_signals_gps_coordsSchema];
const app = new Realm.App({ id: demoConfig.RealmAppID });

// Init state of the vehicle used to create the shadow document on startup
const init_state = {
  _id: BSON.ObjectID(),
  vin: app.currentUser.profile.email,
  signals: {
    speed: 120,
    gps_coords: {
      type: "Point",
      coordinates: [
        -73.856077,
        40.848447]
    },
    fuel_level: 75
  },
  attributes: {
    model: "Race Car",
    weight: 1500,
    engine_ccm: 350
  }
}

// Realm object change listener which logs changes to console
function listener(vehicle, changes) {
  //console.log(JSON.stringify(changes));
  console.log(
    `${changes.changedProperties.length} properties have changed:`
  );
  changes.changedProperties.forEach((prop) => {
    console.log("- " + `${prop}: ${JSON.stringify(vehicle[prop])}`);
  });
}

// Main function
async function run() {

  // Authenticate the vehicle
  try {
    const user = await app.logIn(new Realm.Credentials.emailPassword(demoConfig.VProfile.username, demoConfig.VProfile.password));
    console.log("Successfully logged in: " + user.profile.email);
  } catch (error) {
    console.error("Failed to log in: ", error.message);
  }
  // Open Realm
  try {
    const realm = await Realm.open({
      schema: vehicleSchemas,
      sync: {
        user: app.currentUser,
        partitionValue: app.currentUser.profile.email
      }
    });
    // Create initial state document
    realm.write(() => {
      vehicle = realm.create("vehicle", init_state);
    });
    // Add vehicle object change listener
    vehicle.addListener(listener);
  } catch (error) {
    console.error("Open Realm failed: " + error.message)
  };
}

run().catch(err => {
  console.error("Failed: ", err)
});


// Demo shutdown and cleanup code
process.on("SIGINT", function () {
  console.log("Shutdown and cleanup initiated!");
  try {
    const realm = Realm.open({
      schema: vehicleSchemas,
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
    console.error("Failed: ", err.message);
  }
});
