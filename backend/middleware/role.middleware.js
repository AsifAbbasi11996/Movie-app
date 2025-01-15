const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Continue to next middleware or route handler
  } else {
    return res.status(403).json({ message: 'Admin privileges required' });
  }
};

export { isAdmin };
