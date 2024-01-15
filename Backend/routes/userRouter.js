const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const zod = require('zod');
const authenticateUser = require('../middleware/authenticateUser');

const userNameSchema = zod.string();
const userPasswordSchema = zod.string();

router.post('/signup', (req, res) => {
  const {username, password} = req.body;

  const userCheck = userNameSchema.safeParse(username);
  const passwordCheck = userPasswordSchema.safeParse(password);

  if (userCheck.success && passwordCheck.success) {
    const token = jwt.sign({username}, 'testing123');
    res.send(token);
  } else {
    res.status(400).json({msg: 'invalid formats'});
  }
});

router.post('/signin', authenticateUser, (req, res) => {
  res.send('user logged in');
});

module.exports = router;
