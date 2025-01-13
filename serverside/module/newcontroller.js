// const DietForm = require("../Controllers/Newcontroller"); 

// const DietFormController = async (req, res) => {
//   try {
//     console.log("Incoming Request Body:", req.body);
    
//     const formData = new DietForm(req.body);
//     const savedData = await formData.save();

//     res.status(200).json({
//       message: "Form submitted successfully",
//       data: savedData,
//     });
//   } catch (error) {
//     console.error("Error saving form data:", error); 
//     res.status(422).json({  
//       message: "Validation Error",
//       error: error.message,
//     });
//   }
// };

// const getAllDiets = async (req, res) => {
//   try {
//     const savedData = await DietForm.find();
//     res.status(200).json({
//       message: "Diet List fetched successfully",
//       data: savedData,
//     });
//   } catch (error) {
//     console.error("Error fetching diet list:", error);
//     res.status(500).json({
//       message: "Error fetching diet list",
//       error: error.message,
//     });
//   }
// };

// module.exports = { DietFormController, getAllDiets };
