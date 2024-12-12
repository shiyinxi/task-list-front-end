
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  const buttonClass = props.tasks.isComplete ? 'tasks__item__toggle--completed' : '';

  const completeToggleClick = ()=> {
    props.onCompleteToggle(props.tasks.id);};


  const deleteTaskClick = () => {
    props.onDeleteTask(props.tasks.id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={completeToggleClick}
      >
        {props.tasks.title}
      </button>
      <button className="tasks__item__remove button" onClick={deleteTaskClick}>x</button>
    </li>

  );
};

Task.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onCompleteToggle: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
