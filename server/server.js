// import path and express functionality
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// import router
const taskRouter = require('./taskRouter');
const PORT = 3000;

mongoose.connect(
  'mongodb+srv://samourcalderon:Lhc7kzLqKHuJ7cv2@cluster0.pmha4cj.mongodb.net/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

/**
 * handle parsing request body
 */
app.use(express.json());

// app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/tasks', taskRouter);

// *        *       *
// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
