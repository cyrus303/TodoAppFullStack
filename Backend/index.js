const express = require('express');
const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/api', todoRouter);

app.listen('3000', () => {
  console.log('app running at 3000');
});
