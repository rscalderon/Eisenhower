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
    // if there is an error, invoke global error handler in server.js
    .catch((err) => {
      return next({
        log: `Error at taskController.getTasks: ${err}`,
        status: 500,
        message: 'Error while fetching tasks',
      });
    });
};

taskController.postTasks = (req, res, next) => {
  // Extract task and priority
  const { task, priority } = req.body;
  // init new task instance
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
  // insert controller logic here
  Task.findOneAndUpdate(
    { _id: req.body.id },
    { task: req.body.task },
    { new: true }
  )
    .then((t) => {
      console.log(t);
      res.locals.output = t.task;
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
      console.log('Error in taskController.resetTasks', err);
      return next(err);
    });
};

taskController.deleteTasks = (req, res, next) => {
  Task.findOneAndDelete({ _id: req.body.id })
    .then((t) => {
      console.log(t);
      res.locals.output = t.task;
      return next();
    })
    .catch((err) => {
      console.log('Error in taskController.patchTasks:', err);
      return next(err);
    });
};

module.exports = taskController;
