// specify that router uses Express framework
const express = require('express');

const taskController = require('./taskController');

const router = express.Router();

router.get('/', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.tasks);
});

router.post('/', taskController.postTasks, (req, res) => {
  console.log('sending postTasks response');
  return res.status(200).json(res.locals.newTask);
});

router.patch('/', taskController.patchTasks, (req, res) => {
  console.log('sending patchTasks response');
  return res.status(201).json(res.locals.updatedTask);
});

router.put('/', taskController.resetTasks, (req, res) => {
  console.log('sending resetTasks response');
  return res.status(200).send('');
});

router.delete('/', taskController.deleteTasks, (req, res) => {
  console.log('sending deleteTasks response');
  return res.status(200);
});

module.exports = router;
