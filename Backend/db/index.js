const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://Sachin:oiIYTc6Xva29zWqT@mongodb.7d1cjqv.mongodb.net/TodoApp'
  )
  .then(console.log('connected to DB'));

const userSchema = mongoose.Schema({
  username: String,
  hashPassword: String,
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
