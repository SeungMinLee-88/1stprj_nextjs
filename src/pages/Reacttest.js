import { useReducer } from 'react';
import { useEffect, useState } from "react";
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';


function tasksReducer(tasks, action) {
  console.log("action.type : " + action.type);
  console.log("tasks : " + JSON.stringify(tasks));
  switch (action.type) {
    
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


export default function Reacttest() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
{/*       <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      /> */}
       <Avatar initialUser={"111"} key={"222"} />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];


// Avatar.jsx
function Avatar({ initialUser }) {
// I suppose you need this component to manage it's own state 
// otherwise you can get rid of this useState altogether.
 const [usertest, setusertest] = useState(initialUser);
 console.log("usertest : " + JSON.stringify(usertest));
 return usertest.avatar ? (
   <img src={usertest.avatar} />
 ) : (
   <p>Loading...</p>
 );
}
