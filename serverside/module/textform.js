// const personalinfo = require('../Controllers/personalform');
// const {CalculateTotalCalories , calculateProtein} = require('../external/utill')
// const InfoController = async(req, res)=> {
//     try {
//       const { abw, activityLevel, kidneyCondition, dietType } = req.body;
      
//       const totalCalories = CalculateTotalCalories(abw, activityLevel);
//       const protein = calculateProtein(kidneyCondition, abw);
      
//       // Calculate Fat and Carbs based on total calories
//       const fat = totalCalories * 0.3 / 9; // Fat = 30% of calories, 1g of fat = 9 calories
//       const carbs = (totalCalories - (protein * 4 + fat * 9)) / 4; // Carbs = remaining calories, 1g of carbs = 4 calories
    
//       // Define diet guidelines and potassium/phosphorus values (can be customized further)
//       const guidelines = kidneyCondition === 'CKD' 
//         ? "Moderate protein intake, control potassium and phosphorus"
//         : kidneyCondition === 'dialysis'
//           ? "Increased protein intake, monitor potassium and phosphorus"
//           : "Normal diet post-transplant, keep track of potassium and phosphorus";
    
//       const potassium = kidneyCondition === 'CKD' ? 2000 : 2500; // Example potassium values, could be more dynamic
//       const phosphorus = kidneyCondition === 'CKD' ? 1200 : 1400; // Example phosphorus values
      
//       // Save the diet chart data to MongoDB
//       const personalFormSchema = new DietChart({
//         calories: totalCalories,
//         protein: protein,
//         fat: fat,
//         carbs: carbs,
//         dietType,
//         potassium,
//         phosphorus,
//         guidelines,
//       });
    
//       dietChart.save()
//         .then(savedDietChart => res.json(savedDietChart))
//         .catch(err => res.status(400).json({ error: err.message }));
//   } catch (error) {
//     console.error('Error saving personalinfo form data:', error);
//     res.status(400).json({
//       message: 'Validation Error',
//       error: error.message,
//     });
//   }
// };

// const getinfo = async (req, res) => {
// try {
//   const savedData = await personalinfo.find();
//   res.status(200).json({
//     message: 'personaldiet fetched successfully',
//     data: savedData,
//   });
// } catch (error) {
//   console.error('Error fetching personal diet:', error);
//   res.status(500).json({
//     message: 'Error fetching personal diet ',
//     error: error.message,
//   });
// }
// };

// module.exports = { InfoController, getinfo };
