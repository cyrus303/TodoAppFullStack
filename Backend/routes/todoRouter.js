const {Router} = require('express');
const {todoModel} = require('../db');
const zod = require('zod');
const router = Router();

const todoTextSchema = zod.string();

router.get('/allTodos', async (req, res) => {
  try {
    const {username} = req;
    const todos = await todoModel.find({username});
    if (todos.length > 0) {
      res.send(todos);
    } else {
      res.status(404).json({msg: 'no todos avaliable'});
    }
  } catch (error) {
    res.status(500).json({msg: 'unavailable to fetch todos'});
  }
});

router.post('/todo', async (req, res) => {
  try {
    const {username} = req;
    const {todoText} = req.body;

    const todoCheck = todoTextSchema.safeParse(todoText);

    if (todoCheck.success) {
      const todoItem = await todoModel.create({
        completed: false,
        todoText,
        username,
      });
      res.json(todoItem);
    } else {
      res.json({msg: 'invalid text format'});
    }
  } catch (error) {
    console.error('Error during posting todo:', error);
    res.status(500).json({msg: 'User todo post unsuccessful'});
  }
});

router.delete('/todo/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const result = await todoModel.deleteOne({_id: id});

    if (result.deletedCount > 0) {
      res.status(200).json({msg: 'Todo deleted successfully'});
    } else {
      res.status(404).json({msg: 'Todo not found to delete'});
    }
  } catch (error) {
    console.error('Error during todo deletion:', error);
    res.status(500).json({msg: 'Todo deletion unsuccessful'});
  }
});

router.delete('/allTodos', async (req, res) => {
  try {
    const {username} = req;
    const todos = await todoModel.deleteMany({username});
    if (todos.deletedCount > 0) {
      res.status(200).json({msg: 'todos deleted successfully'});
    } else {
      res.status(404).json({msg: 'Todos not found to delete'});
    }
  } catch (error) {
    console.error('Error during todo deletion:', error);
    res.status(500).json({msg: 'Todo deletion unsuccessful'});
  }
});

router.put('/updateTodoStatus/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const todoStatus = await todoModel.findOne({_id: id});
    const todoItem = await todoModel.findOneAndUpdate(
      {_id: id},
      {completed: !todoStatus.completed},
      {
        new: true,
      }
    );
    res.status(200).send(todoItem);
  } catch (error) {
    res.status(500).json({msg: 'status could not be updated'});
  }
});

module.exports = router;
