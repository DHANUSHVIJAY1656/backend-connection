const mongoose = require('mongoose');

// Mongoose Schema
const FormData = new mongoose.Schema({
  name: { type: String  },
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'others'] },
  weight: { type: Number },
  heightCm: { type: Number, required: function () { return this.heightUnit === 'cm'; } },
  heightFt: { type: Number, required: function () { return this.heightUnit === 'ftin'; } },
  heightIn: { type: Number, required: function () { return this.heightUnit === 'ftin'; } },
  heightUnit: { type: String,  enum: ['cm', 'ftin'] },
  dietType: { type: String, enum: ['vegetarian', 'non-vegetarian'] },
  dietSubType: { type: String },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'mildly-active', 'moderately-active', 'very-active'],
  },
  hasKidneyDisease: { type: Boolean, required: true },
  kidneyCondition: { type: String ,required:false},
  hasDiabetes: { type: Boolean, required: true },
  hasHypertension: { type: Boolean, required: true },
  hasGout: { type: Boolean, required: true },
  hasCardiovascularDisease: { type: Boolean, required: true },
  hasOtherComorbidity: { type: Boolean, required: true },
  otherComorbidityDetails: { type: String ,},
});


// Mongoose Model
 const DietForm = mongoose.model('DietForm', FormData);
 module.exports = DietForm;

















// const mongoose = require('mongoose');

// // Mongoose Schema
// const FormData = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, required: true, enum: ['male', 'female', 'others'] },
//   weight: { type: Number, required: true },
//   heightUnit: { type: String, required: true, enum: ['cm', 'ftin'] },
//   height: {
//     type: Object,
//     required: true,
//     validate: {
//       validator: function (value) {
//         if (this.heightUnit === 'cm') return value.cm;
//         if (this.heightUnit === 'ftin') return value.ft && value.in;
//         return false;
//       },
//       message: 'Height must be provided according to the heightUnit.',
//     },
//   },
//   dietType: { type: String, required: true, enum: ['vegetarian', 'non-vegetarian'] },
//   dietSubType: { type: String },
//   activityLevel: {
//     type: String,
//     required: true,
//     enum: ['sedentary', 'mildly-active', 'moderately-active', 'very-active'],
//   },
//   hasKidneyDisease: { type: Boolean, required: true },
//   kidneyCondition: { type: String },
//   hasDiabetes: { type: Boolean, required: true },
//   hasHypertension: { type: Boolean, required: true },
//   hasGout: { type: Boolean, required: true },
//   hasCardiovascularDisease: { type: Boolean, required: true },
//   hasOtherComorbidity: { type: Boolean, required: true },
//   otherComorbidityDetails: { type: String },
// });

// // Mongoose Model
// const DietForm = mongoose.model('DietForm', FormData);
// module.exports = DietForm;
