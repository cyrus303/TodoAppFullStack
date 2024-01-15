const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const {authorization} = req.headers;
    const decoded = jwt.verify(authorization, 'testing123');
    console.log(decoded);
    next();
  } catch (error) {
    res.send('invalid credentials');
  }
};

module.exports = authenticateUser;