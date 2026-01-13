import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { fetchTodos, createTodo, updateTodo, toggleTodo, deleteTodo } from './utils/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 할일 목록 불러오기
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error('할일 목록 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // 할일 추가
  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      alert(err.message);
      console.error('할일 추가 실패:', err);
    }
  };

  // 할일 수정
  const handleEditTodo = async (id, todoData) => {
    try {
      const updatedTodo = await updateTodo(id, todoData);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      alert(err.message);
      console.error('할일 수정 실패:', err);
    }
  };

  // 할일 완료 상태 토글
  const handleToggleTodo = async (id) => {
    try {
      const updatedTodo = await toggleTodo(id);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      alert(err.message);
      console.error('할일 상태 변경 실패:', err);
    }
  };

  // 할일 삭제
  const handleDeleteTodo = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      alert(err.message);
      console.error('할일 삭제 실패:', err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>할일 관리 앱</h1>
          <p>할일을 추가, 수정, 삭제하고 완료 상태를 관리하세요</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={loadTodos} className="btn-retry">
              다시 시도
            </button>
          </div>
        )}

        <TodoForm onSubmit={handleAddTodo} />

        {loading ? (
          <div className="loading">할일 목록을 불러오는 중...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
