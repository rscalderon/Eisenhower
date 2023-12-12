// import path and express functionality
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// import router
const taskRouter = require('./taskRouter');
const PORT = 3000;

mongoose
  .connect(
    'mongodb+srv://samourcalderon:<password>@cluster0.pmha4cj.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Error connecting to MongoDB database:', err));

// parse incoming JSON
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/home', (req, res) =>
  res.status(200).send(path.resolve('../client/landingpage.html'))
);

app.use('/tasks', taskRouter);

// catch-all route handler
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
