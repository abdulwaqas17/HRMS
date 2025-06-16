const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({storage});
module.exports = upload;
// This code sets up a middleware for handling file uploads using multer.
