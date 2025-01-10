const labrepo = require('../Controllers/upload');

const LabrepoController = async (req, res) => {
    try {
      console.log('Incoming Request Body:', req.body);
  
      const repor = new labrepo(req.body);
      const savedData = await repor.save();
  
      res.status(200).json({
        message: 'Form submitted successfully',
        data: savedData,
      });
    } catch (error) {
      console.error('Error saving report:', error);
      res.status(400).json({
        message: 'Validation Error',
        error: error.message,
      });
    }
  };

const getrepo = async (req, res) => {
  try {
    const savedData = await labrepo.find();
    res.status(200).json({
      message: 'lab report fetched successfully',
      data: savedData,
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      message: 'Error fetching report',
      error: error.message,
    });
  }
};

module.exports = { LabrepoController, getrepo };
