// Workflow 4: Multi‑faceted review analytics using $facet

const pipeline = [
  { $match: { property_id: 123 } }, // focus on one property (example)
  {
    $facet: {
      // Rating distribution
      ratingDistribution: [
        {
          $bucket: {
            groupBy: "$rating",
            boundaries: [0, 1, 2, 3, 4, 5],
            default: "Other",
            output: { count: { $sum: 1 } }
          }
        }
      ],
      // Most frequent review tags
      topTags: [
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ],
      // Overall average rating
      averageRating: [
        { $group: { _id: null, avgRating: { $avg: "$rating" } } }
      ]
    }
  }
];

const result = db.PropertyReviews.aggregate(pipeline).toArray();
printjson(result);