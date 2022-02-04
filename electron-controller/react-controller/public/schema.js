exports.vehicleSchema = {
  name: "vehicle",
  properties: {
    _id: "objectId",
    attributes: "vehicle_attributes",
    signals: "vehicle_signals",
  },
  primaryKey: "_id",
};

exports.vehicle_attributesSchema = {
  name: "vehicle_attributes",
  embedded: true,
  properties: {
    engine_ccm: "int?",
    model: "string?",
    weight: "double?",
  },
};

exports.vehicle_signalsSchema = {
  name: "vehicle_signals",
  embedded: true,
  properties: {
    fuel_level: "int?",
    gps_coords: "vehicle_signals_gps_coords",
    speed: "double?",
  },
};

exports.vehicle_signals_gps_coordsSchema = {
  name: "vehicle_signals_gps_coords",
  embedded: true,
  properties: {
    coordinates: "double[]",
    type: "string?",
  },
};
