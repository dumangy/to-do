import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import TaskStats from './components/TaskStats';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Добавление задачи
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      name: taskData.name,
      description: taskData.description || '',
      status: 'pending',
      priority: taskData.priority || 'medium',
      category: taskData.category || 'personal',
      createdAt: new Date().toISOString(),
      completedAt: null,
      deadline: taskData.deadline || null,
      subtasks: taskData.subtasks || [],
      tags: taskData.tags || []
    };

    setTasks([...tasks, newTask]);
  };

  // Обновление статуса
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : null
        };
      }
      return task;
    }));
  };

  // Удаление задачи
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Обновление задачи
  const updateTask = (taskId, updatedData) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedData } : task
    ));
  };

  // Фильтрация и поиск
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Сортировка
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'deadline':
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      case 'date':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="App">
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">To-Do List</h1>
          <p className="header__subtitle">Продвинутое управление задачами</p>
        </div>
      </header>

      <main className="main">
        <TaskForm onAddTask={addTask} />
        
        <div className="controls">
          <TaskFilter
            filter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <TaskStats tasks={tasks} />
        
        <TaskList
          tasks={sortedTasks}
          onUpdateStatus={updateTaskStatus}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
      </main>

      <footer className="footer">
        <p>&copy; 2025 To-Do App by dumangy - React Edition</p>
      </footer>
    </div>
  );
}

export default App; 