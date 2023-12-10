const Task = require('./db/TaskModel.js');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  // Extract priority from request body
  const { priority } = req.query;
  // pull all tasks that match priority
  Task.find({ priority })
    .then((tasks) => {
      res.locals.tasks = tasks;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error at taskController.getTasks: ${err}`,
        status: 500,
        message: 'Error while fetching tasks',
      });
    });
};

taskController.postTasks = (req, res, next) => {
  // create new Task with data from frontend request
  const { task, priority } = req.body;
  const newTask = new Task({ task, priority });
  newTask
    .save()
    .then((newTask) => {
      res.locals.newTask = newTask;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in taskController.postTasks, ${err}`,
        status: 500,
        message: 'Error while creating task',
      });
    });
};

taskController.patchTasks = (req, res, next) => {
  Task.findOneAndUpdate(
    { _id: req.body.id },
    { task: req.body.task },
    { new: true }
  )
    .then((newTask) => {
      res.locals.newTask = newTask.task;
      return next();
    })
    .catch((err) => {
      console.error('Error in taskController.patchTasks:', err);
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
      console.log('Error in taskController.resetTasks', err);
      return next(err);
    });
};

taskController.deleteTask = (req, res, next) => {
  Task.findOneAndDelete({ _id: req.body.id })
    .then((deletedTask) => {
      res.locals.output = deletedTask.task;
      return next();
    })
    .catch((err) => {
      console.log('Error in taskController.patchTasks:', err);
      return next(err);
    });
};

module.exports = taskController;
