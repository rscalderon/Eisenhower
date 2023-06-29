import React, { useState, useEffect } from 'react';
import Quadrant from '../components/Quadrant.jsx';
import { redirect } from 'react-router-dom';

// MainContainer holds our four Quadrants and all of their individual tasks, and sends a GET request to our backend
const MainContainer = () => {
  // init allQuadrants as state, updateQuadrants as setter function, with initial state of empty arr
  const [allQuadrants, updateQuadrants] = useState([]);
  // init taskList, an array of arrays that contain the tasks of each quadrant
  const taskList = [];
  // init messageArr, an array that contains the headers of our four Quadrants
  const messageArr = [
    'Important, Urgent',
    'Important, not Urgent',
    'Urgent, not Important',
    'Not Urgent, not Important',
  ];
  // init const taskFetch, an async function that fetches all tasks from our database and pushes the arrays of tasks into the taskList array
  const taskFetch = async (quadrantNum) => {
    try {
      const response = await fetch(`/tasks?priority=${quadrantNum}`);
      const theTasks = await response.json();
      redirect('/');
      // console.log('successfully fetched all tasks:', theTasks);
      taskList.push(theTasks);
      return theTasks;
    } catch (err) {
      console.log('Error at taskCreator in App.jsx:', err);
    }
  };
  // init const quadrantsArr, the array that will hold our quadrant components, as an empty arr
  const quadrantsArr = [];
  // use useEffect to update state fetch on mount
  // within useEffect, iterate through 1-4 to fetch
  // useEffect runs the callback function the moment the components mount on the virtual DOM
  useEffect(() => {
    // init async func fetchTasks, a function that invokes taskFetch (that fetches tasks using GET request to backend) and passes result onto each quadrant component
    const fetchTasks = async () => {
      for (let i = 0; i < messageArr.length; i++) {
        // init const tasks as the result of taskFetch on the index of each message in messageArr
        const tasks = await taskFetch(i + 1);
        // push each new Quadrant component into the quadrantsArr
        quadrantsArr.push(
          <Quadrant
            id={i + 1}
            key={`Q${i + 1}`}
            className='quadrant'
            message={messageArr[i]}
            tasks={tasks}
            setter={updateQuadrants}
          ></Quadrant>
        );
        // invoke setter function on copy of quadrantsArr to trigger a re-render
        updateQuadrants([...quadrantsArr]);
      }
    };
    // invoke fetchTasks
    fetchTasks();
  }, []);
  return <main id='AppContainer'>{allQuadrants}</main>;
};

export default MainContainer;
