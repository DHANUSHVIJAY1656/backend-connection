const personalinfo = require('../Controllers/personalform');

const InfoController = async(req, res)=> {
    try {
    console.log('Incoming Request Body:', req.body);

    const personalFormSchema = new personalinfo(req.body);
    const savedData = await personalFormSchema.save();

    res.status(200).json({
      message: 'personalinfo Form submitted successfully',
      data: savedData,
    });
  } catch (error) {
    console.error('Error saving personalinfo form data:', error);
    res.status(400).json({
      message: 'Validation Error',
      error: error.message,
    });
  }
};

const getinfo = async (req, res) => {
try {
  const savedData = await personalinfo.find();
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

module.exports = { InfoController, getinfo };
