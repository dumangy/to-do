import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    deadline: '',
    tags: '',
    isRecurring: false,
    recurringType: 'daily'
  });
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');

  const suggestedTasks = [
    'Купить продукты',
    'Сделать домашнее задание',
    'Позвонить другу',
    'Запланировать встречу',
    'Прочитать книгу',
    'Сделать зарядку',
    'Проверить почту',
    'Записаться к врачу',
    'Оплатить счета',
    'Убраться в доме'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Пожалуйста, введите название задачи');
      return;
    }

    const taskData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      subtasks: subtasks.map(subtask => ({
        id: Date.now() + Math.random(),
        name: subtask,
        completed: false
      }))
    };

    onAddTask(taskData);

    // Сброс формы
    setFormData({
      name: '',
      description: '',
      priority: 'medium',
      category: 'personal',
      deadline: '',
      tags: '',
      isRecurring: false,
      recurringType: 'daily'
    });
    setSubtasks([]);
    setNewSubtask('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, newSubtask.trim()]);
      setNewSubtask('');
    }
  };

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const selectSuggestion = (suggestion) => {
    setFormData(prev => ({ ...prev, name: suggestion }));
  };

  return (
    <section className="task-form">
      <h2 className="task-form__title">Добавить новую задачу</h2>
      
      <form onSubmit={handleSubmit} className="task-form__container">
        <div className="task-form__main">
          <div className="task-form__row">
            <div className="task-form__field">
              <label className="task-form__label">Название задачи *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Введите название задачи"
                className="task-form__input"
                required
              />
            </div>
            
            <div className="task-form__field">
              <label className="task-form__label">Быстрый выбор</label>
              <select
                onChange={(e) => selectSuggestion(e.target.value)}
                className="task-form__select"
              >
                <option value="">Выберите задачу</option>
                {suggestedTasks.map((suggestion, index) => (
                  <option key={index} value={suggestion}>
                    {suggestion}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="task-form__field">
            <label className="task-form__label">Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Дополнительное описание задачи"
              className="task-form__textarea"
              rows="3"
            />
          </div>

          <div className="task-form__row">
            <div className="task-form__field">
              <label className="task-form__label">Приоритет</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="task-form__select"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>

            <div className="task-form__field">
              <label className="task-form__label">Категория</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="task-form__select"
              >
                <option value="personal">Личное</option>
                <option value="work">Работа</option>
                <option value="study">Учёба</option>
                <option value="health">Здоровье</option>
                <option value="shopping">Покупки</option>
                <option value="finance">Финансы</option>
                <option value="hobby">Хобби</option>
              </select>
            </div>

            <div className="task-form__field">
              <label className="task-form__label">Дедлайн</label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="task-form__input"
              />
            </div>
          </div>

          <div className="task-form__field">
            <label className="task-form__label">Теги (через запятую)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="важно, срочно, проект"
              className="task-form__input"
            />
          </div>

          <div className="task-form__row">
            <div className="task-form__field">
              <label className="task-form__checkbox-label">
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleInputChange}
                  className="task-form__checkbox"
                />
                Повторяющаяся задача
              </label>
            </div>

            {formData.isRecurring && (
              <div className="task-form__field">
                <select
                  name="recurringType"
                  value={formData.recurringType}
                  onChange={handleInputChange}
                  className="task-form__select"
                >
                  <option value="daily">Ежедневно</option>
                  <option value="weekly">Еженедельно</option>
                  <option value="monthly">Ежемесячно</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="task-form__subtasks">
          <h3 className="task-form__subtitle">Подзадачи</h3>
          <div className="task-form__subtask-input">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Добавить подзадачу"
              className="task-form__input"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
            />
            <button
              type="button"
              onClick={addSubtask}
              className="btn btn--small"
            >
              Добавить
            </button>
          </div>
          
          {subtasks.length > 0 && (
            <ul className="task-form__subtask-list">
              {subtasks.map((subtask, index) => (
                <li key={index} className="task-form__subtask-item">
                  <span>{subtask}</span>
                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    className="btn btn--danger btn--small"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="task-form__button">
          Добавить задачу
        </button>
      </form>
    </section>
  );
};

export default TaskForm; 