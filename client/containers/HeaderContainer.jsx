import React from 'react';

// HeaderContainer is the component that holds our main title, new task entry and submission, and the clear all button
const HeaderContainer = () => {
  // init vars task and priority in taskCreator closure. These will be updated as the user enters data into the newTask and Priority fields
  let task;
  let priority;
  // The taskCreator function sends a POST request to the server to add a new task to the database
  const taskCreator = (e) => {
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // the POST request passes in the task and priority level from user input for our backend to create the corresponding database entry
      body: JSON.stringify({ task: task, priority: priority }),
    })
      .then((response) => response.json())
      .then((data) => console.log('successfully posted new Task:', data))
      .catch((err) => console.log('Error at taskCreator in App.jsx:', err));
    return;
  };
  // clearConfirm alerts the user that they are about to reset the database and requests confirmation
  const clearConfirm = () => {
    alert('Warning! Doing this will clear all of your tasks.');
    if (confirm('Are you sure you want to proceed?')) {
      // if the user confirms, invoke clearDB
      clearDB();
    }
  };
  // init function clearDB, a function that resets the entire database through a PUT request to our backend
  const clearDB = () => {
    fetch('/tasks', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => console.log('successfully reset DB:', data))
      .catch((err) => console.log('Error at taskCreator in App.jsx:', err));
  };
  return (
    <header id='mainHeader'>
      <h1>
        <a href='https://asana.com/resources/eisenhower-matrix' target='_blank'>
          Eisenhower
        </a>
        : Giving you the{' '}
        <a href='https://youtu.be/W_pbnMIhunE?t=38' target='_blank'>
          power{' '}
        </a>
        to{' '}
        <a href='https://youtu.be/dQw4w9WgXcQ' target='_blank'>
          get more done.
        </a>
      </h1>
      <form id='topForm'>
        <div id='newTaskInput'>
          <label>New Task: </label>
          <input
            type='text'
            id='taskInput'
            name='task'
            onChange={(e) => (task = e.target.value)}
          />
        </div>
        <div id='newTaskInput'>
          <label>Priority: </label>
          <input
            type='text'
            id='priorityInput'
            name='priority'
            onChange={(e) => (priority = e.target.value)}
          />
        </div>
        {/* This is code meant to replace the priority text input field for a dropdown, but I am unsure how to carry through the selection of the dropdown into the rest of the functions */}
        {/* <div id='newTaskTestInput'>
          <label>Priority Test: </label>
          <select
            list='priority-level'
            id='priorityInput'
            name='priority'
            onSubmit={(e) => {
              console.log(e.target);
              priority = e.target.value;
            }}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
        </div> */}
        <button type='submit' value='Submit' onClick={taskCreator}>
          Submit
        </button>
        <button onClick={clearConfirm}>Clear all</button>
      </form>
    </header>
  );
};

export default HeaderContainer;
