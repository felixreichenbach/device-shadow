// Engine nested in Vehicle
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
    engine: { type: "Engine" },
    vin: { type: "string?" },
    model: { type: "string" },
    miles: { type: "int", default: 0 },
  },
};

// Person related to n Vehicles
exports.Person = {
  name: "Person",
  properties: {
    name: "string",
    birthdate: "date?",
    vehicles: "Vehicle[]",
  },
};
