import {useState} from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';



const NewTaskForm = ({handleSubmit}) => {
  const [task, setTask] = useState('');

  const handleTaskChange = event => {
    setTask(event.target.value);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title: task,
      description : '',
    };
    handleSubmit(newTask);
    setTask('');
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <label htmlFor="name">Task: </label>
      <input type="text" id="name" name="name" value={task} onChange={handleTaskChange}/>
      <div>
        <input type="submit" value="Add a Task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
