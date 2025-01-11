const express = require('express');
const generateDietChartPDF = require('../external/dietChartGenerator');
const path = require('path');
const router = express.Router();

// Route to download the generated diet chart
router.get('/download', (req, res) => {
  const { calories, protein, dietType } = req.query;

  if (!calories || !protein || !dietType) {
    return res.status(400).json({ message: 'Missing parameters: calories, protein, or dietType' });
  }

  // Generate the PDF file
  const filePath = generateDietChartPDF({ calories, protein, dietType });

  // Serve the file for download
  res.download(filePath, (err) => {
    if (err) {
      res.status(500).json({ message: 'Error downloading the diet chart.', error: err });
    } else {
      console.log('Diet chart downloaded');
    }
  });
});

module.exports = router;
