import { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
    };
    
    if (formData.dueDate) {
      submitData.dueDate = formData.dueDate;
    }

    onSubmit(submitData);
    setFormData({ title: '', description: '', dueDate: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>새 할일 추가</h2>
      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="할일 제목을 입력하세요"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="할일 설명을 입력하세요 (선택사항)"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">마감일</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn-submit">
        추가하기
      </button>
    </form>
  );
};

export default TodoForm;
