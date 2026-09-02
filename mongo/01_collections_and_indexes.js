// MongoDB setup for StaySpot
// Run with: mongosh stayspot mongo/01_collections_and_indexes.js

// 1. Create collections (implicit, but we specify validators/options)

db.createCollection("PropertyAmenities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["property_id", "amenities", "created_at"],
      properties: {
        property_id: { bsonType: "int" },
        amenities: { bsonType: "array", items: { bsonType: "string" } },
        created_at: { bsonType: "date" }
      }
    }
  }
});