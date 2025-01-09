
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');


// Create the Express app
const app = express();

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Create a schema for lab results
const labResultSchema = new mongoose.Schema({
  hemoglobin: Number,
  serumCreatinine: Number,
  egfr: String,
  potassium: Number,
  phosphorus: Number,
  ipth: Number,
  vitaminD: Number,
  reportFile: String // Store the file path for the uploaded report
});

// Create a model for lab results
const LabResult = mongoose.model('LabResult', labResultSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a unique name
  }
});

const upload = multer({ storage: storage });

// POST endpoint for uploading reports
app.post('/api/upload-report', upload.single('report-upload'), async (req, res) => {
  try {
    const newLabResult = new LabResult({
      reportFile: req.file.path // Store the uploaded file's path in the DB
    });

    await newLabResult.save();
    res.status(200).json({ message: 'Report uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading report' });
  }
});

// POST endpoint for manual submission of lab results
app.post('/dietupload', async (req, res) => {
  const { hemoglobin, serumCreatinine, egfr, potassium, phosphorus, ipth, vitaminD } = req.body;

  try {
    const newLabResult = new LabResult({
      hemoglobin,
      serumCreatinine,
      egfr,
      potassium,
      phosphorus,
      ipth,
      vitaminD
    });

    await newLabResult.save();
    res.status(200).json({ message: 'Lab results submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting lab results' });
  }
});


