import { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium',
    due_data: initialData?.due_data ? initialData.due_data.slice(0, 16) : '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('O título é obrigatório');
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        due_data: formData.due_data || null,
      };
      
      await onSubmit(dataToSend);
      
      if (!initialData) {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          due_data: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.due_data?.[0] || 'Erro ao salvar tarefa');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{initialData ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
      
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Título *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Digite o título da tarefa"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Digite a descrição (opcional)"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Prioridade</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="due_data">Data de Vencimento</label>
          <input
            type="datetime-local"
            id="due_data"
            name="due_data"
            value={formData.due_data}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Atualizar' : 'Criar'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
