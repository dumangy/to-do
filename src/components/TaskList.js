import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onUpdateStatus, onDeleteTask, onUpdateTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list task-list--empty">
        <div className="task-list__empty-message">
          <h3>📝 Нет задач</h3>
          <p>Добавьте новую задачу, чтобы начать работу!</p>
        </div>
      </div>
    );
  }

  return (
    <section className="task-list">
      <h3 className="task-list__title">📋 Список задач ({tasks.length})</h3>
      <ul className="task-list__items">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateStatus={onUpdateStatus}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </ul>
    </section>
  );
};

export default TaskList; 