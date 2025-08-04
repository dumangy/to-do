import React from 'react';
import './TaskStats.css';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length;

  const categoryStats = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

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

  const overdueTasks = tasks.filter(task => 
    task.deadline && 
    new Date(task.deadline) < new Date() && 
    task.status !== 'completed'
  ).length;

  return (
    <div className="task-stats">
      <h3 className="task-stats__title">📊 Статистика</h3>
      
      <div className="task-stats__grid">
        <div className="task-stats__card">
          <div className="task-stats__number">{totalTasks}</div>
          <div className="task-stats__label">Всего задач</div>
        </div>
        
        <div className="task-stats__card task-stats__card--completed">
          <div className="task-stats__number">{completedTasks}</div>
          <div className="task-stats__label">Завершено</div>
        </div>
        
        <div className="task-stats__card task-stats__card--pending">
          <div className="task-stats__number">{pendingTasks}</div>
          <div className="task-stats__label">В ожидании</div>
        </div>
        
        <div className="task-stats__card task-stats__card--progress">
          <div className="task-stats__number">{inProgressTasks}</div>
          <div className="task-stats__label">В процессе</div>
        </div>

        {overdueTasks > 0 && (
          <div className="task-stats__card task-stats__card--overdue">
            <div className="task-stats__number">{overdueTasks}</div>
            <div className="task-stats__label">Просрочено</div>
          </div>
        )}
      </div>

      <div className="task-stats__progress">
        <div className="task-stats__progress-label">
          Прогресс выполнения: {completionRate}%
        </div>
        <div className="task-stats__progress-bar">
          <div 
            className="task-stats__progress-fill"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {totalTasks > 0 && (
        <div className="task-stats__details">
          <div className="task-stats__section">
            <h4>🎯 По приоритету:</h4>
            <div className="task-stats__tags">
              <span className="task-stats__tag task-stats__tag--high">
                Высокий: {highPriorityTasks}
              </span>
              <span className="task-stats__tag task-stats__tag--medium">
                Средний: {mediumPriorityTasks}
              </span>
              <span className="task-stats__tag task-stats__tag--low">
                Низкий: {lowPriorityTasks}
              </span>
            </div>
          </div>

          <div className="task-stats__section">
            <h4>📂 По категориям:</h4>
            <div className="task-stats__tags">
              {Object.entries(categoryStats).map(([category, count]) => (
                <span key={category} className="task-stats__tag">
                  {getCategoryName(category)}: {count}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStats; 