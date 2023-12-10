import React, { useState, useEffect } from 'react';
import Quadrant from '../components/Quadrant.jsx';
import { redirect } from 'react-router-dom';

// Builds four Quadrant components with their corresponding tasks
const MainContainer = () => {
  // init allQuadrants as state and updateQuadrants as setter function
  const [allQuadrants, updateQuadrants] = useState([]);
  // init messageArr, an array that contains the headers of our four Quadrants
  const messageArr = [
    'Important, Urgent',
    'Important, not Urgent',
    'Urgent, not Important',
    'Not Urgent, not Important',
  ];
  // init const quadrantsArr, the array that will hold our quadrant components, as an empty arr
  const quadrantsArr = [];
  // fetch tasks and update state to array with 4 quadrant components
  useEffect(() => {
    // taskList is an array of arrays that contain the tasks of each quadrant
    const taskList = [];
    // Fetch tasks from database and build array with 4 quadrant components
    const fetchTasks = async () => {
      for (let i = 0; i < messageArr.length; i++) {
        // init const tasks as the result of taskFetch on the index of each message in messageArr
        try {
          const response = await fetch(`/tasks?priority=${quadrantNum}`);
          const tasks = await response.json();
          redirect('/');
          taskList.push(tasks);
          return tasks;
        } catch (err) {
          console.error('Error at taskCreator in App.jsx:', err);
        }
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
        // re-render MainContainer component
        updateQuadrants(quadrantsArr);
      }
    };
    // invoke fetchTasks
    fetchTasks();
  }, []);
  return (
    <main id='AppContainer'>{allQuadrants ? allQuadrants : 'Loading...'}</main>
  );
};

export default MainContainer;
