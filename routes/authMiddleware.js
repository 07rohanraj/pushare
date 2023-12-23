// authMiddleware.js
const isAuthenticated = (req, res, next) => {
    // Passport provides isAuthenticated method on req object
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    // User is not authenticated, redirect or send an error response
    res.status(401).json({ error: 'Unauthorized' });
  };
  
  module.exports = isAuthenticated;
  