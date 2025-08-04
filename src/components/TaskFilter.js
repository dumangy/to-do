import React from 'react';
import './TaskFilter.css';

const TaskFilter = ({
  filter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="task-filter">
      <div className="task-filter__search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Поиск по названию, описанию или тегам..."
          className="task-filter__input"
        />
      </div>

      <div className="task-filter__controls">
        <div className="task-filter__group">
          <label className="task-filter__label">Статус:</label>
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="task-filter__select"
          >
            <option value="all">Все задачи</option>
            <option value="pending">В ожидании</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <div className="task-filter__group">
          <label className="task-filter__label">Сортировка:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="task-filter__select"
          >
            <option value="date">По дате создания</option>
            <option value="name">По названию</option>
            <option value="priority">По приоритету</option>
            <option value="deadline">По дедлайну</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter; 