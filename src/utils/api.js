// 환경 변수로 API 주소 설정
// 개발 환경: 로컬 프록시 사용 (/api/todos)
// 프로덕션: 배포된 백엔드 주소 사용
// 배포된 백엔드 주소: https://park-vibe-todo-backend-d778ddef75f9.herokuapp.com
const getApiBaseUrl = () => {
  // 환경 변수가 설정되어 있으면 사용
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // 배포된 서버 사용 (기본값)
  return 'https://park-vibe-todo-backend-d778ddef75f9.herokuapp.com/api/todos';
};

const API_BASE_URL = getApiBaseUrl();

// 할일 목록 조회
export const fetchTodos = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || '할일 목록을 불러오는데 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
};

// 할일 생성
export const createTodo = async (todoData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || '할일 생성에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
};

// 할일 수정
export const updateTodo = async (id, todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || '할일 수정에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
};

// 할일 완료 상태 토글
export const toggleTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || '할일 상태 변경에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
};

// 할일 삭제
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || '할일 삭제에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
};
