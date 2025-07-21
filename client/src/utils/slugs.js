export const generatePlainSlug = (name) => { // "Green@# Star!!!" → "green-star"
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, ""); // remove all non-alphanumeric characters including spaces
};


export const generateDashSlug = (name) => { // "Green@# Star!!!" → "greenstar"
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // replace spaces with dash
    .replace(/[^\w\-]+/g, "");  // remove special characters
};