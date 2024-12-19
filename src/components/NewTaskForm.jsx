import {useState} from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({handleSubmit}) => {
  const kDefaultFormState = {
    title: '',
    description: '',
  };

  const [task, setTask] = useState(kDefaultFormState);

  const handleTaskChange = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newTaskData = {...task, [fieldName]: fieldValue};
    setTask(newTaskData);
    console.log(task);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    handleSubmit(task);
    console.log(task);
    setTask(kDefaultFormState);
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div>
        <label htmlFor="title">Task: </label>
        <input type="text" id="title" name="title" value={task.title} onChange={handleTaskChange}/>
      </div>

      <div>
        <label htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" value={task.description} onChange={handleTaskChange}/>
      </div>
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
