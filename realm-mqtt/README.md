## Run The MQTT Demo (TO BE UPDATED)

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
