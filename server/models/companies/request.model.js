let mongoose = require('mongoose');


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

  adminName : {
    type : String,
    required : [true, 'Fisrt name is required']
  },


  industry: {
    type: String,
    enum: {
      values: ['IT', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Retail', 'Construction'],
      message: 'Industry must be a valid category'
    },
    required: [true, 'Industry is required']
  },
  employeeRange: {
    type: Number,
    min: [1, 'Employee count must be at least 1'],
    required: [true, 'Employee count is required']
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'registered', 'rejected','invited'],
    default: 'pending'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});

let companyrequests = mongoose.model('companyrequests', companyRequestSchema);
module.exports = companyrequests;
