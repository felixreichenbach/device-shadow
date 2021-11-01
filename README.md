# Device-Shadow MongoDB Realm Example

With MongoDB Realm's change notifications, device updates can easily be tracked and automatic notifications including only the attributes changed can be created and as an example be sent to the backend via MQTT or completely out of the box synchronized bidirectionally with Realm Sync!

## Prerequisits:
* [Install npm / Realm SDK](https://docs.mongodb.com/realm/sdk/node/)
* [Install Realm Studio](https://docs.mongodb.com/realm/studio/)


## Run The Demo (PICTURES TO BE UPDATED)

```docker-compose up```

```node vehicle-shadow.js```

```node shadow-update.js```


![Source Code](/media/0_VisualStudio_SourceCode.png)
![Source Code](/media/1_RealmStudio_Empty.png)
![Source Code](/media/2_Shell_StartApp.png)
![Source Code](/media/3_RealmStudio_CarCreated.png)
![Source Code](/media/4_RealmStudio_CarModified.png)
![Source Code](/media/5_Shell_ChangeModifications.png)
