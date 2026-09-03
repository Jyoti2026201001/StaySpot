// Workflow 3: Geospatial search hotspot clustering
// Identify trending search hotspots within 5km of a specific coordinate (e.g., downtown)

const pipeline = [
  {
    $geoNear: {
      near: { type: "Point", coordinates: [-73.9857, 40.7484] }, // New York City (longitude, latitude)
      distanceField: "distance",
      maxDistance: 5000, // 5 km
      spherical: true,
      query: { created_at: { $gte: new Date(Date.now() - 3600 * 1000) } } // last hour only
    }
  },
  // Round coordinates to 2 decimal places (~1 km grid) to cluster nearby searches
  {
    $group: {
      _id: {
        lat: { $round: [{ $arrayElemAt: ["$location.coordinates", 1] }, 2] },
        lon: { $round: [{ $arrayElemAt: ["$location.coordinates", 0] }, 2] }
      },
      count: { $sum: 1 },
      avgDistance: { $avg: "$distance" }
    }
  },
  { $sort: { count: -1 } },
  { $limit: 10 } // top 10 hotspots
];

// Execute and output
const results = db.SearchSessions.aggregate(pipeline).toArray();
printjson(results);