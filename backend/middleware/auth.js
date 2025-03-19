import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token); // Add logging
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Authentication invalid' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Add logging
    
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Authentication invalid' });
  }
};

export default auth;