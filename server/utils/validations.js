// utils/validatePhone.js
let { parsePhoneNumberFromString } = require('libphonenumber-js');

const isValidPhone = (phone) => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber && phoneNumber.isValid();
};




const isValidEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|pk|edu|gov|io)$/.test(email);
};

module.exports = {isValidPhone, isValidEmail};