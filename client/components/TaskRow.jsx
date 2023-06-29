import React, { Component, useState, useEffect } from 'react';

const TaskRow = (props) => {
  const task = props.id.task;
  const [state, setter] = useState([...task]);
  // console.log(props.id._id);
  // The taskCreator function sends a request to the server to add a new task to the database
  const taskDelete = (e) => {
    fetch('/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: props.id._id }),
    })
      .then((response) => response.json())
      .then((data) => console.log('successfully posted new Task:', data))
      .catch((err) => console.log('Error at taskCreator in App.jsx:', err));
    return; // parses JSON response into native JavaScript objects
  };
  const updateConfirm = (e) => {
    const updatedTask = prompt(
      'What would you like to update this task to?',
      task
    );
    if (task !== updatedTask) {
      taskUpdate(updatedTask);
    }
  };
  const taskUpdate = (updatedTask) => {
    console.log('the new task is:', updatedTask);
    fetch('/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: updatedTask,
        id: props.id._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('successfully posted new Task:', data);
        setter[data];
      })
      .catch((err) => console.log('Error at taskCreator in App.jsx:', err));
    return;
  };
  return (
    <div>
      <li>
        {task} <button onClick={taskDelete}>x</button>
        <button onClick={updateConfirm}>update</button>
      </li>
    </div>
  );
};

export default TaskRow;
