let express = require('express');
let app = express();
require('dotenv').config();
let userLoginRoute = require('./routes/auth/user-login.route');
let spRoutes = require('./routes/service-provider/sp.routes');
let ownerRoutes = require('./routes/owner/owner.routes');
let adminRoutes = require('./routes/admins/admin.routes');
let hrRoutes = require('./routes/hrs/hr.routes');
let employeeRoutes = require('./routes/employees/employee.routes');
let compRequestRoute = require('./routes/companies/requests/c-request.route');
let compInviteRoute = require('./routes/companies/invites/c-invite.route');
let compRegisterRoute = require('./routes/companies/registered/c-register.route');
let connectDB = require('./config/db');
let cors = require('cors');

app.use(express.json());
//Yeh aap ke server ko web forms ka data asani se handle karne deta hai.
app.use(express.urlencoded({ extended: true }));  
// ✅ Specify allowed origins
const corsOptions = {
  origin: 'http://localhost:5173', // frontend ka origin
  credentials: true, // cookies waghera allow karne ke liye (agar zarurat ho)
};

app.use(cors(corsOptions));

// to connect mongo db
connectDB();

app.use('/',userLoginRoute);
app.use('/',spRoutes);
app.use('/',ownerRoutes);
app.use('/',adminRoutes);
app.use('/',hrRoutes);
app.use('/',employeeRoutes);
app.use('/',compRequestRoute);
app.use('/',compInviteRoute);
app.use('/',compRegisterRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log('server is running on port',PORT));




