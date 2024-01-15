const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');
const authenticateUser = require('./middleware/authenticateUser');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/api', authenticateUser, todoRouter);

app.listen('3000', () => {
  console.log('app running at 3000');
});
