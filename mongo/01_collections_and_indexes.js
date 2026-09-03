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

db.createCollection("PropertyReviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["property_id", "guest_id", "rating", "tags", "created_at"],
      properties: {
        property_id: { bsonType: "int" },
        guest_id: { bsonType: "int" },
        rating: { bsonType: "int", minimum: 1, maximum: 5 },
        tags: { bsonType: "array", items: { bsonType: "string" } },
        review_text: { bsonType: "string" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("SearchSessions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["session_id", "location", "created_at"],
      properties: {
        session_id: { bsonType: "string" },
        user_id: { bsonType: "int" },
        location: {
          bsonType: "object",
          required: ["type", "coordinates"],
          properties: {
            type: { bsonType: "string", enum: ["Point"] },
            coordinates: {
              bsonType: "array",
              items: { bsonType: "double" },
              minItems: 2,
              maxItems: 2
            }
          }
        },
        filters: { bsonType: "object" },
        created_at: { bsonType: "date" }
      }
    }
  }
});
