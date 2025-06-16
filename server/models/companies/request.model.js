import mongoose from 'mongoose';

const companyRequestSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required']
  },
  companyEmail: {
    type: String,
    required: [true, 'Company email is required'],
    lowercase: true
  },
  companyPhone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  name : {
    type : String,
    required : true
  },

  industry: {
    type: String,
    enum: {
      values: ['IT', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Retail', 'Construction'],
      message: 'Industry must be a valid category'
    },
    required: [true, 'Industry is required']
  },
  employeeCount: {
    type: Number,
    min: [1, 'Employee count must be at least 1'],
    required: [true, 'Employee count is required']
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected','invited'],
    default: 'pending'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('companyrequests', companyRequestSchema);
