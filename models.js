
exports.Axles = {
    name: "Axles",
    embedded: true,
    properties: {
      wheel: "string?",
      pressure: { type: "int?", default: 0 },
    },
  };


  
  // Realm Schema Definition
exports.Vehicle = {
    name: "Vehicle",
    properties: {
      axles: "Axles",
      ambientAirTemperature: { type: "int", default: 0 },
      mileage: { type: "int", default: 0 },
    },
  };

