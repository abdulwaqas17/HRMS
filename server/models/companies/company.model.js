import mongoose from 'mongoose';

const registeredCompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  companyEmail: {
    type: String,
    required: [true, 'Company email is required'],
    lowercase: true,
    unique: true
  },
  companyPhone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  companyAddress: {
    type: String,
    required: [true, 'Address is required']
  },
  companyCity: {
    type: String,
    required: [true, 'City is required']
  },
  companyCountry: {
    type: String,
    required: [true, 'Country is required']
  },
  industry: {
    type: String,
    enum: {
      values: ['IT', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Retail', 'Construction'],
      message: 'Industry must be valid'
    },
    required: [true, 'Industry is required']
  },
  employeeCount: {
    type: Number,
    min: [1, 'At least 1 employee is required'],
    required: [true, 'Employee count is required']
  },
  logo: {
    type: String, // Cloudinary URL
    required: [true, 'Company logo is required']
  },
  
  // company register krty waqt hi admin ka sara data len gy
 admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    
  },
  hr: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
     ref: 'users'
    }
  ],
 // Plan Info
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: [true, 'Subscription is required']
  },
//   planStartDate: {
//     type: Date,
//     required: [true, 'Plan start date is required']
//   },
//   planEndDate: {
//     type: Date,
//     required: [true, 'Plan end date is required']
//   },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('registeredcompanies', registeredCompanySchema);
