const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const Realm = require("realm");
const schema = require("./schema.js");
const isDev = require("electron-is-dev");

let win;

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS;

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // to prevent the Sync Connection from ending prematurely, start reading from stdin so we don't exit
  process.stdin.resume();

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`));
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


////////////////////////
// Realm Sync Part
////////////////////////

const vehicleSchemas = [
  schema.vehicleSchema,
  schema.vehicle_attributesSchema,
  schema.vehicle_signalsSchema,
  schema.vehicle_signals_gps_coordsSchema,
];

// create a new instance of the Realm.App
const realmApp = new Realm.App({ id: "simple-vehicle-iqsqk" });
async function run() {
  // login with credentials
  await realmApp.logIn(Realm.Credentials.emailPassword("customer", "customer"));
  const realm = await Realm.open({
    schema: vehicleSchemas,
    path: "./realm/vehicleShadow.realm",
    sync: {
      user: realmApp.currentUser,
      partitionValue: realmApp.currentUser.profile.email,
    },
  });
}

run().catch((err) => {
  console.error("Failed to open realm:", err);
});

////////////////////////
// Inter Process Communication IPCRenderer Part
////////////////////////

ipcMain.on("toMain", (event, args) => {
  // Print received data from renderer
  console.log("Received " + args + "from renderer!");
  // Send data to renderer process
  win.webContents.send("fromMain", "Hello World");
});
