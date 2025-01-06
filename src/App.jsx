import TaskList from './components/TaskList.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const kbaseURL = 'http://localhost:5000';

const getAllTasksApi = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

const convertFromApi = (task) => {
  const newTask ={
    ...task,
    isComplete: task.is_complete,
  };
  delete newTask.is_complete;
  return newTask;
};

const toggleCompleteApi = (taskId) => {
  return axios.patch(`${kbaseURL}/tasks/${taskId}/mark_complete`)
    .catch(error => console.log(error));
};

const toggleIncompleteApi = (taskId) => {
  return axios.patch(`${kbaseURL}/tasks/${taskId}/mark_incomplete`)
    .catch(error => console.log(error));
};

const deleteTaskApi = (taskId) => {
  return axios.delete(`${kbaseURL}/tasks/${taskId}`)
    .catch(error => console.log(error));
};

const App = () => {
  const [tasksData, setTasksData] = useState([]);

  const getAllTasks =()=> {
    getAllTasksApi()
      .then(tasks => {
        const newTasks = tasks.map(convertFromApi);
        setTasksData(newTasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, [tasksData]);

  const toggleComplete = (taskId) => {
    const task = tasksData.find(task => task.id === taskId);
    
    const apiCall = task.isComplete ? toggleIncompleteApi : toggleCompleteApi;

    apiCall(taskId)
      .then(() => {
        setTasksData((tasksData) => tasksData.map(task => {
          if (task.id === taskId) {
            return {...task, isComplete: !task.isComplete};
          } else {
            return task;
          }
        }));
      });
  };

  const deleteTask = (taskId) => {
    // const tasks = tasksData.filter(task => task.id !== taskId);
    deleteTaskApi(taskId)
      .then(() => {
        setTasksData((tasksData) => tasksData.filter(task => task.id !== taskId));
        return tasksData;
      });
  };

  const handleSubmit = (data) => {
    axios.post(`${kbaseURL}/tasks`, data)
      .then((result) => {
        console.log('response from backend:', tasksData);
        setTasksData((prevTasks) => [convertFromApi(result.data), ...prevTasks]);
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasksData} onCompleteToggle={toggleComplete} onDeleteTask={deleteTask}/>}</div>
        <NewTaskForm handleSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default App;
