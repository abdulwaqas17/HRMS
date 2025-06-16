import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner',
    required: true,
    unique: true // 1 service provider ka 1 owner hi hoga
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  logo: {
    type: String, // Cloudinary URL ya base64
    require : true,
  },
  companies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companies'
    }
  ],
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'requests'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto update `updatedAt` field
serviceProviderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('serviceprovider', serviceProviderSchema);
