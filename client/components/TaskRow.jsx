import React, { Component, useState, useEffect } from 'react';

const TaskRow = (props) => {
  const task = props.id.task;
  const [taskState, taskSetter] = useState(task);

  // The taskCreator function sends a request to the server to add a new task to the database
  const taskDelete = () => {
    fetch('/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: props.id._id }),
    })
      .then((response) => response.json())
      .then((data) => console.log('successfully posted new Task:', data))
      .catch((err) => console.log('Error at taskCreator in App.jsx:', err));
    return;
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
        return taskSetter(data);
      })
      .catch((err) => console.log('Error at taskCreator in App.jsx:', err));
    return;
  };
  return (
    <div>
      <li>
        {taskState} <button onClick={taskDelete}>x</button>
        <button onClick={updateConfirm}>update</button>
      </li>
    </div>
  );
};

export default TaskRow;
