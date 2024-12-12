
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({id, title, isComplete, onCompleteToggle, onDeleteTask}) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const completeToggleClick = ()=> {
    onCompleteToggle(id);
  };


  const deleteTaskClick = () => {
    onDeleteTask(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={completeToggleClick}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={deleteTaskClick}>x</button>
    </li>

  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onCompleteToggle: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
