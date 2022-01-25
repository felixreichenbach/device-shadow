const models = require("./models");
const Realm = require("realm");
const BSON = require("bson");
const demoConfig = require("./demoConfig");

const vehicleSchemas = [models.vehicleSchema, models.vehicle_attributesSchema, models.vehicle_signalsSchema, models.vehicle_signals_gps_coordsSchema];
const app = new Realm.App({ id: demoConfig.RealmAppID });

// Realm Object Change Listener
function listener(vehicle, changes) {
  console.log(
    `${changes.changedProperties.length} properties have changed:`
  );
  changes.changedProperties.forEach((prop) => {
    console.log("- " + `${prop}: ${JSON.stringify(vehicle[prop])}`);
  });
}

// Main function
async function run() {
  // Authenticate the customer
  try {
    const user = await app.logIn(new Realm.Credentials.emailPassword(demoConfig.CProfile.username, demoConfig.CProfile.password));
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
        partitionValue: app.currentUser.customData.vin
      }
    });

    // Query vehicle and add object change listener
    const vehicle = realm.objects("vehicle");
    if (vehicle.length > 0) {
      vehicle[0].addListener(listener);
    } else {
      console.log("Vehicle needs to be registered first!");
      process.exit();
    }
  } catch (error) {
    console.error("Open Realm failed: " + error.message)
  };
}

run().catch(err => {
  console.error("Failed to open realm:", err);
});

// Demo shutdown and cleanup code
process.on("SIGINT", function () {
  console.log("Shutdown initiated!");
  process.exit();
});