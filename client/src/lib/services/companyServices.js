// companyServices.js
import axios from 'axios';

export const fetchCompanyBySlug = async (companySlug) => {
  // const tokenName = `${role}Token`;
  // const token = localStorage.getItem(tokenName);
  // console.log(tokenName, token);
  

  // if (!token) {
  //   return { redirectToLogin: true };
  // }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-register-company/${companySlug}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error fetching company:", error.response?.data || error.message);
    throw error;
  }
};
