const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path'); // For handling paths

const generateDietChartPDF = ({ calories, protein, dietType }) => {
  // Ensure the dietCharts directory exists
  const dirPath = path.join(__dirname, 'dietCharts');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Create directory if it doesn't exist
  }

  const doc = new PDFDocument();
  const fileName = `diet-chart-${Date.now()}.pdf`;
  const filePath = path.join(dirPath, fileName); // Use absolute path for the file

  // Pipe the document to the file
  doc.pipe(fs.createWriteStream(filePath));

  // Add Title and dietary information
  doc.fontSize(16).text('Your Personalized Diet Chart', { align: 'center' });
  doc.fontSize(12).text(`Diet Type: ${dietType}`, { align: 'left' });
  doc.text(`Recommended Daily Intake: ${calories} kcal`, { align: 'left' });
  doc.text(`Protein: ${protein}g`, { align: 'left' });

  // Finalize the document
  doc.end();

  return filePath;
};

module.exports = generateDietChartPDF;



