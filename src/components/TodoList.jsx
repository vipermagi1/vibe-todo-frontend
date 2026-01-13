import { useState } from 'react';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', dueDate: '' });

  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditForm({
      title: todo.title,
      description: todo.description || '',
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
    });
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    const updateData = {
      title: editForm.title,
      description: editForm.description,
    };
    if (editForm.dueDate) {
      updateData.dueDate = editForm.dueDate;
    }
    onEdit(id, updateData);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '', dueDate: '' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="empty-state">할일이 없습니다. 새로운 할일을 추가해보세요!</div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            {editingId === todo._id ? (
              <form className="edit-form" onSubmit={(e) => handleEditSubmit(e, todo._id)}>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="제목"
                  required
                  className="edit-input"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="설명"
                  className="edit-textarea"
                />
                <input
                  type="date"
                  value={editForm.dueDate}
                  onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                  className="edit-input"
                />
                <div className="edit-buttons">
                  <button type="submit" className="btn-save">저장</button>
                  <button type="button" onClick={handleCancelEdit} className="btn-cancel">
                    취소
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="todo-content">
                  <div className="todo-header">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => onToggle(todo._id)}
                      className="todo-checkbox"
                    />
                    <h3 className={`todo-title ${todo.done ? 'strikethrough' : ''}`}>
                      {todo.title}
                    </h3>
                  </div>
                  {todo.description && (
                    <p className="todo-description">{todo.description}</p>
                  )}
                  {todo.dueDate && (
                    <p className="todo-due-date">
                      마감일: {formatDate(todo.dueDate)}
                    </p>
                  )}
                </div>
                <div className="todo-actions">
                  <button onClick={() => handleEditClick(todo)} className="btn-edit">
                    수정
                  </button>
                  <button onClick={() => onDelete(todo._id)} className="btn-delete">
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
