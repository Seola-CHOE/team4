import { ITodo } from "../../types/todo.ts";
import { ChangeEvent, useCallback, useState } from "react";
import { postTodo } from "../../api/todoAPI.ts";
import { useNavigate } from "react-router-dom";

const initState: ITodo = {
  tno: undefined,
  title: '',
  writer: '',
  dueDate: '',
};

function TodoAddComponent() {
  const [todo, setTodo] = useState<ITodo>({ ...initState });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleClick = () => {
    setLoading(true);
    postTodo(todo)
      .then((newTodo: ITodo) => {
        console.log(newTodo); // 새로 추가된 todo를 콘솔에 로그
        setTodo({ ...initState }); // 입력 필드 초기화
        navigate('/todo/list'); // 리스트 페이지로 이동
      })
      .catch((error) => {
        console.error("Failed to add todo:", error);
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 해제
      });
  };

  return (
    <div className='flex flex-col space-y-4 w-96 mx-auto'>
      <label className="text-sm font-semibold text-gray-700">Title</label>
      <input
        type="text"
        name="title"
        className="border border-gray-300 rounded-lg p-3"
        placeholder="Enter Title"
        value={todo.title}
        onChange={handleChange}
      />
      <label className="text-sm font-semibold text-gray-700">Writer</label>
      <input
        type="text"
        name="writer"
        className="border border-gray-300 rounded-lg p-3"
        placeholder="Enter Writer"
        value={todo.writer}
        onChange={handleChange}
      />
      <label className="text-sm font-semibold text-gray-700">Due Date</label>
      <input
        type="date"
        name="dueDate"
        className="border border-gray-300 rounded-lg p-3"
        value={todo.dueDate}
        onChange={handleChange}
      />
      <button
        type="button"
        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
}

export default TodoAddComponent;
