const Task = require('./db/TaskModel.js');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  // // Extract priority from request body
  const { priority } = req.query;
  // pull all tasks that match priority
  Task.find({ priority: priority })
    .then((t) => {
      res.locals.output = t;
      // console.log('database response to Task.find is:', t);
      return next();
    })
    .catch((err) => {
      console.log('Error in taskController.getTasks', err);
      return next(err);
    });
  // newTask.save().then();
  // if there is an error, invoke global error handler in server.js
};

taskController.postTasks = (req, res, next) => {
  // Extract task and priority props from request body
  const { task, priority } = req.body;
  // init new task instance
  const newTask = new Task({ task, priority });
  newTask
    .save()
    .then((t) => {
      res.locals.output = t;
      return next();
    })
    .catch((err) => {
      console.log('Error in taskController.postTasks', err);
      return next(err);
    });
};

taskController.patchTasks = (req, res, next) => {
  console.log('req.body is: ', req.body);
  // insert controller logic here
  Task.findOneAndUpdate({ _id: req.body.id }, { task: req.body.task })
    .then((t) => {
      console.log(t);
      res.locals.output;
      return next();
    })
    .catch((err) => {
      console.log('Error in taskController.patchTasks:', err);
      return next(err);
    });
};

taskController.resetTasks = (req, res, next) => {
  // Task.deleteMany removes all documents in the Task collection
  Task.deleteMany({})
    .then((output) => {
      res.locals.output = 'Deleted database';
      return next();
    })
    .catch((err) => {
      next(err);
    });
  // Task.dropDatabase()
};

taskController.deleteTasks = (req, res, next) => {
  Task.findOneAndDelete({ _id: req.body.id })
    .then((t) => {
      console.log(t);
      res.locals.output;
      return next();
    })
    .catch((err) => {
      console.log('Error in taskController.patchTasks:', err);
      return next(err);
    });
};

module.exports = taskController;

// const db = require('./db/tasks');
// const writeLocation = `${__dirname}/db/tasks'`;

// const { Long } = require('mongodb');
// const mongoose = require('mongoose');
// const fs = require('fs');
