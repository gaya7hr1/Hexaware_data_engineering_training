use("smart_energy");

db.sensor_logs.drop();

db.sensor_logs.insertMany([
  {
    log_id: 1,
    device_id: "D001",
    device_name: "Air Conditioner",
    room_id: "R003",
    room_name: "Bedroom",
    energy_kwh: 1.82,
    timestamp: new Date("2025-04-01T00:00:00"),
    status: "active",
    raw_data: {
      voltage: 220,
      current: 8.3,
      power_factor: 0.95,
      temperature_c: 24.5
    }
  },
  {
    log_id: 2,
    device_id: "D002",
    device_name: "Refrigerator",
    room_id: "R002",
    room_name: "Kitchen",
    energy_kwh: 0.45,
    timestamp: new Date("2025-04-01T01:00:00"),
    status: "active",
    raw_data: {
      voltage: 220,
      current: 2.1,
      power_factor: 0.98,
      temperature_c: 4.0
    }
  },
  {
    log_id: 3,
    device_id: "D003",
    device_name: "Washing Machine",
    room_id: "R005",
    room_name: "Garage",
    energy_kwh: 0.91,
    timestamp: new Date("2025-04-01T02:00:00"),
    status: "idle",
    raw_data: {
      voltage: 220,
      current: 4.2,
      power_factor: 0.90,
      cycle: "rinse"
    }
  },
  {
    log_id: 4,
    device_id: "D004",
    device_name: "Television",
    room_id: "R001",
    room_name: "Living Room",
    energy_kwh: 0.12,
    timestamp: new Date("2025-04-01T03:00:00"),
    status: "active",
    raw_data: {
      voltage: 220,
      current: 0.6,
      power_factor: 0.97,
      brightness: 70
    }
  },
  {
    log_id: 5,
    device_id: "D005",
    device_name: "Microwave",
    room_id: "R002",
    room_name: "Kitchen",
    energy_kwh: 0.08,
    timestamp: new Date("2025-04-01T04:00:00"),
    status: "idle",
    raw_data: {
      voltage: 220,
      current: 0.4,
      power_factor: 0.85,
      power_level: 50
    }
  }
]);

print("Inserted 5 sensor log documents.\n");

db.sensor_logs.createIndex({ device_id: 1 }, { name: "idx_device_id" });
db.sensor_logs.createIndex({ timestamp: -1 }, { name: "idx_timestamp" });
db.sensor_logs.createIndex({ device_id: 1, timestamp: -1 }, { name: "idx_device_timestamp" });
db.sensor_logs.createIndex({ room_id: 1 }, { name: "idx_room_id" });
db.sensor_logs.createIndex({ status: 1 }, { name: "idx_status" });

print("Created 5 indexes on sensor_logs collection.\n");

print("Indexes on sensor_logs:");
printjson(db.sensor_logs.getIndexes());
