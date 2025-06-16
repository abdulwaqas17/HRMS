// controllers/serviceProvider/createServiceProvider.js
const ServiceProvider = require('../../models/service-provider/service-provider.model');
const User = require('../../models/roles/user.model');

const createServiceProvider = async (req, res) => {
  try {
    const { email, name, phone, logo } = req.body;

    // ✅ Find owner
    const owner = await User.findOne({ role: "owner" });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found. Please add an owner first."
      });
    }

    // ✅ Check if service provider already exists
    const alreadyExists = await ServiceProvider.findOne({});
    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: 'Service Provider already exists'
      });
    }

    // ✅ Create new service provider
    const newServiceProvider = new ServiceProvider({
      owner: owner._id,
      name,
      email,
      phone,
      logo
    });

    await newServiceProvider.save();
    console.log('Service Provider created:', newServiceProvider);

    // ✅ Update owner's reference
    owner.serviceProvider = newServiceProvider._id;
    await owner.save();

    console.log('Owner updated with Service Provider:', owner);

    return res.status(201).json({
      success: true,
      message: 'Service Provider created and linked to Owner successfully',
      data: newServiceProvider
    });
  } catch (error) {
    console.error('Error creating Service Provider:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

module.exports = createServiceProvider;
