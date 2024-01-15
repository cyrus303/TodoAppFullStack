const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/authenticateUser');

console.log('hello from user router');

router.post('/signup', (req, res, next) => {
  const {username, password} = req.body;
  const token = jwt.sign({username}, 'testing123');
});

router.post('/signin', authenticateUser, (req, res) => {
  res.send('user logged in');
});

module.exports = router;
