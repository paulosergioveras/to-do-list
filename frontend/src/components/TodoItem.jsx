import { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ task, onUpdate, onDelete, onEdit }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const getPriorityLabel = (priority) => {
    const labels = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta'
    };
    return labels[priority] || priority;
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      await onUpdate(task.id, { ...task, completed: !task.completed });
    } finally {
      setIsCompleting(false);
    }
  };

  const isOverdue = () => {
    if (!task.due_data || task.completed) return false;
    return new Date(task.due_data) < new Date();
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          disabled={isCompleting}
        />
      </div>

      <div className="todo-content">
        <h3 className="todo-title">{task.title}</h3>
        {task.description && (
          <p className="todo-description">{task.description}</p>
        )}
        
        <div className="todo-meta">
          <span className={`priority priority-${task.priority}`}>
            {getPriorityLabel(task.priority)}
          </span>
          
          {task.due_data && (
            <span className="due-date">
              📅 {formatDate(task.due_data)}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          onClick={() => onEdit(task)}
          className="btn-edit"
          title="Editar"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-delete"
          title="Excluir"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
