import React from 'react';
import TaskRow from '../components/TaskRow.jsx';
// Quadrant is the component that holds the individual task rows
const Quadrant = (props) => {
  // init constants tasksArr as arr of tasks from get request in MainContainer
  const tasksArr = props.tasks;
  // init taskComponents as empty arr, this will store taskRow components before rendering
  const taskComponents = [];
  // if tasksArr is not undefined/null, iterate through tasksArr and push a new TaskRow component with id and key properties
  if (tasksArr) {
    tasksArr.forEach((task) => {
      taskComponents.push(<TaskRow id={task} key={task._id} />);
    });
  }
  return (
    <div className={props.className}>
      <h3>{props.message}</h3>
      <ol>{taskComponents}</ol>
    </div>
  );
};

export default Quadrant;
