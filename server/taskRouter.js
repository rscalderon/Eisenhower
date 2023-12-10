// specify that router uses Express framework
const express = require('express');

const taskController = require('./taskController');

const router = express.Router();

router.get('/', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.output);
});

router.post('/', taskController.postTasks, (req, res) => {
  console.log('sending postTasks response');
  return res.status(200).json(res.locals.output);
});

router.patch('/', taskController.patchTasks, (req, res) => {
  console.log('sending patchTasks response');
  return res.status(200).json(res.locals.output);
});

router.put('/', taskController.resetTasks, (req, res) => {
  console.log('sending deleteTasks response');
  return res.status(200).json(res.locals.output);
});

router.delete('/', taskController.deleteTasks, (req, res) => {
  console.log('sending deleteTasks response');
  return res.status(200).json(res.locals.output);
});

// router.patch('/', taskController.addCharacter, (req, res) =>
//   res.status(200).json({})
// );

module.exports = router;
