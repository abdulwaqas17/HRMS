const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = authorizeRoles;

// Usage:
// router.get("/admin/data", verifyToken, authorizeRoles("admin", "owner"), getData);