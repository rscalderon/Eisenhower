const Task = require('./db/TaskModel.js');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  // Extract priority from request body
  const { priority } = req.query;
  // pull all tasks that match priority
  Task.find({ priority })
    .then((t) => {
      res.locals.output = t;
      return next();
    })
    // if there is an error, invoke global error handler in server.js
    .catch((err) => {
      console.log('Error in taskController.getTasks', err);
      return next(err);
    });
  // newTask.save().then();
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
