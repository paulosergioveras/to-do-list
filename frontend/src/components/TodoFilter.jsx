import './TodoFilter.css';

const TodoFilter = ({ currentFilter, onFilterChange, taskCounts }) => {
  return (
    <div className="todo-filter">
      <button
        className={currentFilter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        Todas ({taskCounts.all})
      </button>
      <button
        className={currentFilter === 'active' ? 'active' : ''}
        onClick={() => onFilterChange('active')}
      >
        Ativas ({taskCounts.active})
      </button>
      <button
        className={currentFilter === 'completed' ? 'active' : ''}
        onClick={() => onFilterChange('completed')}
      >
        Concluídas ({taskCounts.completed})
      </button>
    </div>
  );
};

export default TodoFilter;
