import React, { Component } from 'react';
import TaskRow from '../components/TaskRow.jsx';

const Quadrant = (props) => {
  // console.log('the code in the Quadrant file is running');
  // console.log('my props are:', props);
  const tasksArr = props.tasks;
  // console.log(tasksArr);
  const taskComponents = [];
  // console.log(taskComponents);
  tasksArr.forEach((task) => {
    taskComponents.push(<TaskRow id={task} key={task._id}></TaskRow>);
  });
  return (
    <div className={props.className}>
      <h3>{props.message}</h3>
      <ol>{taskComponents}</ol>
    </div>
  );
};

export default Quadrant;
