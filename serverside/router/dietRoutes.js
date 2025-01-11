const express = require("express");
const DietRecommendation = require("../DietRecommendation");
const router = express.Router();

// Route to get diet recommendations based on condition
router.get("/:condition", async (req, res) => {
  try {
    const { condition } = req.params;
    
    // Fetch the recommendation based on the condition
    const recommendation = await DietRecommendation.findOne({ condition });
    
    if (!recommendation) {
      return res.status(404).json({ message: "No recommendation found for this condition" });
    }

    res.status(200).json({
      condition: recommendation.condition,
      recommendation: recommendation.recommendation,
      tooltip: recommendation.tooltip,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recommendation data", error: err });
  }
});

module.exports = router;
