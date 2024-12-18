import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [tasksData, setTasksData] = useState([]);

  const API_URL = 'http://localhost:5000/tasks';

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setTasksData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  },[]);

  const toggleComplete = (taskId, isComplete) => {
    const url = `${API_URL}/${taskId}/${isComplete ? 'mark_incomplete' : 'mark_complete'}`;

    axios.patch(url)
      .then(() => {
        setTasksData((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, isComplete: !isComplete } : task
          )
        );
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  };

  const deleteTask = (taskId) => {
    axios.delete(`${API_URL}/${taskId}`)
      .then(() => {
        setTasksData((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
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
