
export const isTokenValid = (token) => {
  const tokenValue = localStorage.getItem(token);
  if (!tokenValue) return false;

  try {
    const payload = JSON.parse(atob(tokenValue.split(".")[1]));
    const isValid = payload.exp * 1000 < Date.now(); // convert to ms
    // isValid = true ==> success (token is valid)
    return isValid;
  } catch (error) {
    return false; // token tampered or malformed
  }
};
