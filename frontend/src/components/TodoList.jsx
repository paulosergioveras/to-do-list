import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, onUpdate, onDelete, onEdit, filter }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 Nenhuma tarefa encontrada</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {filteredTasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
