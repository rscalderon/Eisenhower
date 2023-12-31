import React, { useState, useEffect } from 'react';
import Quadrant from '../components/Quadrant.jsx';

// Fetch tasks from database and build four Quadrant components
const MainContainer = ({ resetCount }) => {
  // define array of quadrants as state
  const [allQuadrants, updateQuadrants] = useState([]);
  // fetch tasks and update state to array with 4 quadrant components
  useEffect(() => {
    const quadrantHeaders = [
      'Important, Urgent',
      'Important, not Urgent',
      'Urgent, not Important',
      'Not Urgent, not Important',
    ];
    // Nested array that stores tasks of each quadrant
    const allTasks = [];
    // Fetch tasks from database and build array with 4 quadrant components
    const fetchTasks = async () => {
      // Temporarily store quadrant components before updating state
      const quadrantsArr = [];
      for (let i = 0; i < quadrantHeaders.length; i++) {
        try {
          // store each quadrant's tasks retrieved from database and push to allTasks array
          await fetch(`/tasks?priority=${i}`)
            .then((data) => data.json())
            .then((tasks) => allTasks.push(tasks));
        } catch (err) {
          console.error('Error at taskCreator in App.jsx:', err);
        }
        // populate quadrantsArr with Quadrant components
        quadrantsArr.push(
          <Quadrant
            id={i + 1}
            key={`Q${i + 1}`}
            className='quadrant'
            message={quadrantHeaders[i]}
            tasks={allTasks[i]}
            setter={updateQuadrants}
          ></Quadrant>
        );
      }
      // re-render MainContainer component with all quadrants
      updateQuadrants(quadrantsArr);
    };
    fetchTasks();
  }, [resetCount]);
  return (
    <main id='AppContainer'>{allQuadrants ? allQuadrants : 'Loading...'}</main>
  );
};

export default MainContainer;
