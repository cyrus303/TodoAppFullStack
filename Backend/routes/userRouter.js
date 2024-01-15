const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const zod = require('zod');
const bcrypt = require('bcrypt');

const {userModel} = require('../db');

const userNameSchema = zod.string();
const userPasswordSchema = zod.string();

const jwtSecret = 'testing123';

router.post('/signup', async (req, res) => {
  try {
    const {username, password} = req.body;
    const userCheck = userNameSchema.safeParse(username);
    const passwordCheck = userPasswordSchema.safeParse(password);

    // Check for empty input
    if (
      username.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return res.status(400).json({msg: 'Input cannot be empty'});
    }

    if (userCheck.success && passwordCheck.success) {
      const existingUserCheck = await userModel.find({username});

      if (existingUserCheck.length > 0) {
        return res
          .status(400)
          .json({msg: 'Username not available, choose another'});
      } else {
        try {
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(password, salt);

          const userDetail = await userModel.create({
            username,
            hashPassword,
          });

          return res.status(201).json({msg: 'Signup successful'});
        } catch (hashError) {
          console.error('Error during password hashing:', hashError);
          return res
            .status(500)
            .json({msg: 'User signup unsuccessful'});
        }
      }
    } else {
      return res.status(400).json({msg: 'Invalid input formats'});
    }
  } catch (error) {
    console.error('Error during user signup:', error);
    return res.status(500).json({msg: 'User signup unsuccessful'});
  }
});

router.post('/signin', async (req, res) => {
  try {
    const {username, password} = req.body;
    const userCheck = userNameSchema.safeParse(username);
    const passwordCheck = userPasswordSchema.safeParse(password);

    if (!(userCheck.success && passwordCheck.success)) {
      res.status(400).json({msg: 'Invalid input formats'});
      return;
    }

    const userDetails = await userModel.findOne({username});

    if (
      userDetails &&
      (await bcrypt.compare(password, userDetails.hashPassword))
    ) {
      const token = jwt.sign({username}, jwtSecret);
      res.status(200).json({token, msg: 'User logged in'});
    } else {
      res
        .status(401)
        .json({msg: 'Username or password is incorrect'});
    }
  } catch (error) {
    console.error('Error during user signin:', error);
    res.status(500).json({msg: 'User signin unsuccessful'});
  }
});

module.exports = router;
