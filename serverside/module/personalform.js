const personalform = require('../Controllers/personaldeitform');

const PersonalController = async (req, res) => {
    try {
      console.log('Incoming Request Body:', req.body);
  
      const dietFormSchema = new personalform(req.body);
      const savedData = await dietFormSchema.save();
  
      res.status(200).json({
        message: 'personal Form submitted successfully',
        data: savedData,
      });
    } catch (error) {
      console.error('Error saving personal form data:', error);
      res.status(400).json({
        message: 'Validation Error',
        error: error.message,
      });
    }
  };

const getPersonal = async (req, res) => {
  try {
    const savedData = await personalform.find();
    res.status(200).json({
      message: 'personaldiet fetched successfully',
      data: savedData,
    });
  } catch (error) {
    console.error('Error fetching personal diet:', error);
    res.status(500).json({
      message: 'Error fetching personal diet ',
      error: error.message,
    });
  }
};

module.exports = { PersonalController, getPersonal };
