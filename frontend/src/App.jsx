import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique se o backend está rodando.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      setTasks(prev => [response.data, ...prev]);
      setError('');
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
      throw err;
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === id ? response.data : task
      ));
      setEditingTask(null);
      setError('');
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro:', err);
      throw err;
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }

    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      setError('');
    } catch (err) {
      setError('Erro ao excluir tarefa');
      console.error('Erro:', err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      active: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length,
    };
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Carregando tarefas...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 To-Do List</h1>
        <p>Organize suas tarefas de forma simples e eficiente</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}

        <TodoForm
          onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
          initialData={editingTask}
          onCancel={editingTask ? handleCancelEdit : null}
        />

        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={getTaskCounts()}
        />

        <TodoList
          tasks={tasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          filter={filter}
        />
      </main>

      <footer className="app-footer">
        <p>Desenvolvido com ❤️ usando React + Django</p>
      </footer>
    </div>
  );
}

export default App;
