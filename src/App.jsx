import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasksData, setTasksData] = useState(TASKS);

  const toggleComplete = (taskId) => {
    // const tasks = tasksData.map(task => {
    //   if (task.id === taskId) {
    //     return {...task, isComplete: !task.isComplete};
    //   } else {
    //     return task;
    //   }
    // });
    setTasksData((tasksData) => tasksData.map(task => {
      if (task.id === taskId) {
        return {...task, isComplete: !task.isComplete};
      } else {
        return task;
      }
    }));
  };

  const deleteTask = (taskId) => {
    // const tasks = tasksData.filter(task => task.id !== taskId);
    setTasksData((tasksData) => tasksData.filter(task => task.id !== taskId));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasksData} onCompleteToggle={toggleComplete} onDeleteTask={deleteTask} />}</div>
      </main>
    </div>
  );
};

export default App;
