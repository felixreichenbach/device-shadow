# Realm -> MQTT Integration

This is a small example on how to use Realm change notifications to generate delta notifications, being sent via MQTT. This is an easy way to share data within the car between ECUs. Instead of mqtt a SOME/IP client library might be used the same way.

## Prerequisits:

**_NOTE:_**  I ran into issues with the latest node package and switched to 15.

* [Install npm / Realm SDK](https://docs.mongodb.com/realm/sdk/node/)
* [Install Realm Studio](https://docs.mongodb.com/realm/studio/)

## Run The MQTT Demo (SCREENSHOTS TO BE UPDATED)

Start the MQTT container:

```docker-compose up```

Run the realm app with mqtt integration:

```node vehicle-shadow-mqtt.js```


Toggle the engine status:

```node toggleEngine.js```

Add miles to the vehicle:


```node addMiles-mqtt.js```


![Source Code](/media/0_VisualStudio_SourceCode.png)
![Source Code](/media/1_RealmStudio_Empty.png)
![Source Code](/media/2_Shell_StartApp.png)
![Source Code](/media/3_RealmStudio_CarCreated.png)
![Source Code](/media/4_RealmStudio_CarModified.png)
![Source Code](/media/5_Shell_ChangeModifications.png)
