import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onUpdateStatus, onDeleteTask, onUpdateTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44aa44';
      default: return '#888888';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'В ожидании';
      case 'in-progress': return 'В процессе';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const getCategoryName = (category) => {
    const names = {
      personal: 'Личное',
      work: 'Работа',
      study: 'Учёба',
      health: 'Здоровье',
      shopping: 'Покупки',
      finance: 'Финансы',
      hobby: 'Хобби'
    };
    return names[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      personal: '#4CAF50',
      work: '#2196F3',
      study: '#9C27B0',
      health: '#FF5722',
      shopping: '#FF9800',
      finance: '#795548',
      hobby: '#607D8B'
    };
    return colors[category] || '#888888';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'completed';
  const completedSubtasks = task.subtasks?.filter(subtask => subtask.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  const toggleSubtask = (subtaskId) => {
    const updatedSubtasks = task.subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
    onUpdateTask(task.id, { subtasks: updatedSubtasks });
  };

  return (
    <li className={`task-item ${task.status === 'completed' ? 'task-item--completed' : ''} ${isOverdue ? 'task-item--overdue' : ''}`}>
      <div className="task-item__content">
        <div className="task-item__header">
          <div 
            className="task-item__priority-indicator"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          ></div>
          
          <div className="task-item__main">
            <h4 className="task-item__title">{task.name}</h4>
            {task.description && (
              <p className="task-item__description">{task.description}</p>
            )}
          </div>

          <div className="task-item__badges">
            <span 
              className="task-item__category"
              style={{ backgroundColor: getCategoryColor(task.category) }}
            >
              {getCategoryName(task.category)}
            </span>
            
            {task.isRecurring && (
              <span className="task-item__recurring">🔄</span>
            )}
            
            {isOverdue && (
              <span className="task-item__overdue">⚠️ Просрочено</span>
            )}
          </div>
        </div>

        <div className="task-item__meta">
          <div className="task-item__dates">
            <span className="task-item__date">
              📅 Создано: {formatDate(task.createdAt)}
            </span>
            {task.completedAt && (
              <span className="task-item__date task-item__date--completed">
                ✅ Завершено: {formatDate(task.completedAt)}
              </span>
            )}
            {task.deadline && (
              <span className={`task-item__date ${isOverdue ? 'task-item__date--overdue' : ''}`}>
                ⏰ Дедлайн: {formatDate(task.deadline)}
              </span>
            )}
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="task-item__tags">
              {task.tags.map((tag, index) => (
                <span key={index} className="task-item__tag">#{tag}</span>
              ))}
            </div>
          )}

          {totalSubtasks > 0 && (
            <div className="task-item__subtasks-summary">
              <span>📋 Подзадачи: {completedSubtasks}/{totalSubtasks}</span>
              <button
                className="task-item__expand-btn"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? '▼' : '▶'}
              </button>
            </div>
          )}
        </div>

        {isExpanded && task.subtasks && task.subtasks.length > 0 && (
          <div className="task-item__subtasks">
            <ul className="task-item__subtasks-list">
              {task.subtasks.map((subtask) => (
                <li key={subtask.id} className="task-item__subtask">
                  <label className="task-item__subtask-label">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(subtask.id)}
                      className="task-item__subtask-checkbox"
                    />
                    <span className={subtask.completed ? 'task-item__subtask--completed' : ''}>
                      {subtask.name}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="task-item__actions">
        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value)}
          className="task-item__status-select"
        >
          <option value="pending">В ожидании</option>
          <option value="in-progress">В процессе</option>
          <option value="completed">Завершено</option>
        </select>

        <button
          onClick={() => onDeleteTask(task.id)}
          className="task-item__delete-btn"
          title="Удалить задачу"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TaskItem; 