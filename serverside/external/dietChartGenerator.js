const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateDietChartPDF = ({ calories, protein, dietType }) => {
  const doc = new PDFDocument();
  const fileName = `diet-chart-${Date.now()}.pdf`;
  const filePath = `./dietCharts/${fileName}`;

  doc.pipe(fs.createWriteStream(filePath));

  // Add Title
  doc.fontSize(16).text('Your Personalized Diet Chart', { align: 'center' });

  // Add Dietary Information
  doc.fontSize(12).text(`Diet Type: ${dietType}`, { align: 'left' });
  doc.text(`Recommended Daily Intake: ${calories} kcal`, { align: 'left' });
  doc.text(`Protein: ${protein}g`, { align: 'left' });

  doc.end();

  return filePath;
};

module.exports = generateDietChartPDF;
