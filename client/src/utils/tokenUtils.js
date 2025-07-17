
export const isTokenValid = (token) => {
  console.log('token utils line 3 token', token);
  
  const tokenValue = localStorage.getItem(token);
  console.log('token utils line 6 tokenValue',tokenValue);
  
  if (!tokenValue) return false;

  try {
    const payload = JSON.parse(atob(tokenValue.split(".")[1]));
    console.log('token utils line 8 payload', payload);
    console.log('token utils line 8 payload.exp', payload.exp * 1000);
    
    const isValid = payload.exp * 1000 > Date.now(); // convert to ms
    console.log('token utils line 11 Date.now()',Date.now());
    console.log('token utils line 12 isValid',isValid);
    
    // isValid = true ==> success (token is valid)
    return isValid;
  } catch (error) {
    return false; // token tampered or malformed
  }
};


// atob() ka matlab hai "ASCII to Binary" — lekin actually yeh base64 decode karta hai.
// JWT ka payload Base64URL encoded hota hai, aur atob() usko decode karke ek normal string banata hai.