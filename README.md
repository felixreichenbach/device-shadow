# Vehicle-Shadow MongoDB Realm Example

With MongoDB Realm's change notifications, device updates can easily be tracked and automatic notifications including only the attributes changed can be created and as an example be sent to the backend via MQTT or completely out of the box synchronized bidirectionally with Realm Sync!


VSS Specification: https://github.com/COVESA/vehicle_signal_specification/releases/

## Prerequisits:

**_NOTE:_**  I ran into issues with the latest node package and moved to 15.

* [Install npm / Realm SDK](https://docs.mongodb.com/realm/sdk/node/)
* [Install Realm Studio](https://docs.mongodb.com/realm/studio/)

## Demo Setup

Create brand specific vin: [https://vingenerator.org/brand](https://vingenerator.org/brand)

### Setup Realm Application
[Get Started](https://docs.mongodb.com/realm/sync/get-started/)

### Configure Vehicle and Customer

- Create vehicle and customer profile
- Open demoConfig.js and fill in the appID and usernames/passwords.

### Run The Demo

**_NOTE:_**  I ran into issues with the latest node package and moved to 15.

Start the vehicle instance which will create the shadow instance in MongoDB Atlas.
```node vehicleInstance.js```

Start the customer app which will sync the vehicle shadow and set up a change listener.

```node customerApp.js```

Connect with a MongoDB Shell

Run this command to trigger chances on the shadow instance:

```db.Vehicle.updateOne({},{$set:{"miles": 200, "engine.cc":2}})```


## Run The MQTT Demo (TO BE UPDATED)

```docker-compose up```

```node vehicle-shadow.js```

```node shadow-update.js```


![Source Code](/media/0_VisualStudio_SourceCode.png)
![Source Code](/media/1_RealmStudio_Empty.png)
![Source Code](/media/2_Shell_StartApp.png)
![Source Code](/media/3_RealmStudio_CarCreated.png)
![Source Code](/media/4_RealmStudio_CarModified.png)
![Source Code](/media/5_Shell_ChangeModifications.png)
