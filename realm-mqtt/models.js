// Engine nested in vehicle
exports.Engine = {
  name: "Engine",
  embedded: true,
  properties: {
    cylinders: { type: "int?", default: 4 },
    cc: { type: "int?", default: 0 },
    rpm: { type: "int?", default: 0 },
    running: { type: "bool", default: false },
  },
};

// Vehicle embeds engine
exports.Vehicle = {
  name: "Vehicle",
  properties: {
    _id: 'objectId',
    vin: { type: "string" },
    owner_id: "string?",
    engine: { type: "Engine" },
    model: { type: "string" },
    miles: { type: "int", default: 0 },
  },
  primaryKey: '_id',
};

// Person related to n Vehicles
exports.Person = {
  name: "Person",
  properties: {
    _id: 'objectId',
    name: "string",
    birthdate: "date?",
    vehicles: "Vehicle[]",
  },
  primaryKey: '_id',
};
