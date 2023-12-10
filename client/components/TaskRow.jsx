import React, { useState, useEffect } from 'react';

// TaskRow is the component that contains the individual task as well as its corresponding submit and update buttons
const TaskRow = (props) => {
  // init constant variables task as passed-in task prop from MainContainer get request to database, taskState as state (task) and taskSetter as setter
  const { task } = props.id;
  const [taskState, taskSetter] = useState(task);
  // Delete current task from DB
  const taskDelete = () => {
    // invoke Fetch API method with DELETE request
    fetch('/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: props.id._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // once confirmation of task deletion is received from the database, update task state to null
        console.log(
          'successfully deleted task from database in TaskRow component:',
          data
        );
        return taskSetter(null);
      })
      // if error is caught, log the error
      .catch((err) =>
        console.log('Error at taskDelete in TaskRow component:', err)
      );
  };
  // the updateConfirm function prompts the user to input the new value of the task and routs the input to taskUpdate
  const updateConfirm = () => {
    const updatedTask = prompt(
      'What would you like to update this task to?',
      task
    );
    if (task !== updatedTask) {
      return taskUpdate(updatedTask);
    }
  };
  // the taskUpdate function accepts updatedTask as a parameter and sends a patch request to our server and database and returns and updates state to the new value of task
  const taskUpdate = (updatedTask) => {
    // console.log('the new task is:', updatedTask);
    fetch('/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: updatedTask,
        id: props.id._id,
      }),
    })
      .then((response) => response.json())
      .then((t) => {
        // Once we receive database confirmation that the task has been updated, update state to new task value using the setter function
        console.log('successfully posted new Task:', t);
        return taskSetter(t);
      })
      // if error is caught, log the error
      .catch((err) =>
        console.log('Error at taskUpdate in taskRow component:', err)
      );
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
