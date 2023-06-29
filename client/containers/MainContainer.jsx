import React, { Component, useState, useEffect } from 'react';
import Quadrant from '../components/Quadrant.jsx';
import { redirect } from 'react-router-dom';

const MainContainer = (props) => {
  // init allTheTasks as state, updateTasks as setter function, with initial state of empty arr
  const [allQuadrants, updateQuadrants] = useState([]);
  // init allTasks, an array of objects that contain the properties of each quadrant
  const taskList = [];
  const messageArr = [
    'Important and Urgent',
    'Important, not Urgent',
    'Urgent, not Important',
    'Not Urgent, not Important',
  ];
  const taskFetch = async (quadrantNum) => {
    try {
      const response = await fetch(`/tasks?priority=${quadrantNum}`);
      const theTasks = await response.json();
      await redirect('/');
      // console.log('successfully fetched all tasks:', theTasks);
      taskList.push(theTasks);
      return theTasks;
    } catch (err) {
      console.log('Error at taskCreator in App.jsx:', err);
    }
  };
  // use useEffect to update state fetch on mount
  // within useEffect, iterate through 1-4 to fetch
  const quadrantsArr = [];
  // useEffect runs the callback function the moment the components mount on the virtual DOM
  useEffect(() => {
    const fetchTasks = async () => {
      for (let i = 0; i < messageArr.length; i++) {
        const tasks = await taskFetch(i + 1);
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
      }
      updateQuadrants([...quadrantsArr]);
    };
    fetchTasks();
  }, []);
  return <main id='AppContainer'>{allQuadrants}</main>;
};

export default MainContainer;
