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
  const [TasksData, setTasksData] = useState(TASKS);

  const toggleComplete = (taskId) => {
    const tasks = TasksData.map(task => {
      if (task.id === taskId) {
        return {...task, isComplete: !task.isComplete};
      } else {
        return task;
      }
    });
    setTasksData(tasks);
  };

  const deleteTask = (taskId) => {
    const tasks = TasksData.filter(task => task.id !== taskId);
    setTasksData(tasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={TasksData} onCompleteToggle={toggleComplete} onDeleteTask={deleteTask} />}</div>
      </main>
    </div>
  );
};

export default App;
