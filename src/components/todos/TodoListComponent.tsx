import { useEffect, useState } from 'react';
import useTodoList from '../../hooks/useTodoList';
import { ITodo } from '../../types/todo';
import PageComponent from '../../common/PageComponent';
import ModifyComponent from '../todos/TodoModifyComponent';
import { updateTodo, deleteTodo } from '../../api/todoAPI';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoListComponent() {
  const { pageResponse, moveToRead, loading } = useTodoList();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isModifyModalOpen, setModifyModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  useEffect(() => {
    const savedSelectedTodos = localStorage.getItem('selectedTodos');
    if (savedSelectedTodos) {
      const parsedSelectedTodos = JSON.parse(savedSelectedTodos) as number[];
      setSelectedTodos(new Set(parsedSelectedTodos));
    }
  }, []);

  useEffect(() => {
    if (pageResponse && Array.isArray(pageResponse.dtoList)) {
      setTodos(pageResponse.dtoList);
    }
  }, [pageResponse]);

  const openModifyModal = (todo: ITodo) => {
    setSelectedTodo(todo);
    setModifyModalOpen(true);
  };

  const closeModifyModal = () => {
    setModifyModalOpen(false);
    setSelectedTodo(null);
  };

  const openDeleteModal = (todo: ITodo) => {
    setSelectedTodo(todo);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTodo(null);
  };

  const handleUpdateTodo = async (updatedTodo: ITodo) => {
    try {
      await updateTodo(updatedTodo.tno as number, updatedTodo);

      setTodos((prevTodos) => {
        return prevTodos.map((todo) =>
            todo.tno === updatedTodo.tno ? { ...todo, writer: updatedTodo.writer, title: updatedTodo.title } : todo
        );
      });

      closeModifyModal();
    } catch (error) {
      console.error('할 일 업데이트 실패:', error);
    }
  };

  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;
    try {
      await deleteTodo(selectedTodo.tno as number);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.tno !== selectedTodo.tno));
      closeDeleteModal();
    } catch (error) {
      console.error('할 일 삭제 실패:', error);
    }
  };

  const handleCheckboxChange = (tno: number) => {
    setSelectedTodos((prevSelectedTodos) => {
      const updatedSelectedTodos = new Set(prevSelectedTodos);
      if (updatedSelectedTodos.has(tno)) {
        updatedSelectedTodos.delete(tno);
      } else {
        updatedSelectedTodos.add(tno);
      }
      localStorage.setItem('selectedTodos', JSON.stringify(Array.from(updatedSelectedTodos)));
      return updatedSelectedTodos;
    });
  };

  const handleRowClick = (tno: number) => {
    moveToRead(tno);
  };

  const listLI = todos.map((todo: ITodo) => {
    const { tno, title, writer, dueDate } = todo;
    const isChecked = selectedTodos.has(tno);

    return (
        <tr
            key={tno}
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => handleRowClick(tno)} // tr 클릭 시 moveToRead 함수 호출
        >
          <td className="border-b border-[#eee] py-5 px-4 text-center">
            <input
                type="checkbox"
                checked={isChecked}
                onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 중지
                onChange={(e) => {
                  e.stopPropagation(); // 이벤트 전파 중지
                  handleCheckboxChange(tno);
                }}
                className="custom-checkbox h-5 w-5"
            />
          </td>
          <td className="border-b border-[#eee] py-5 px-4 text-center">
            <h5 className={`font-medium text-black ${isChecked ? 'line-through' : ''}`}>{tno}</h5>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 text-left">
            <p className={`text-black ${isChecked ? 'line-through' : ''}`}>{title}</p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 text-left">
            <p className={`text-black ${isChecked ? 'line-through' : ''}`}>{writer}</p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 text-left">
            <p className={`text-black ${isChecked ? 'line-through' : ''}`}>{new Date(dueDate).toLocaleDateString()}</p>
          </td>
          <td className="border-b border-[#eee] py-5 px-6 text-left">
            <button
                onClick={(e) => {
                  e.stopPropagation(); // 수정 버튼 클릭 시 이벤트 전파 중지
                  openModifyModal(todo);
                }}
                className="text-blue-500 hover:text-blue-700 mr-3"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
                onClick={(e) => {
                  e.stopPropagation(); // 삭제 버튼 클릭 시 이벤트 전파 중지
                  openDeleteModal(todo);
                }}
                className="text-red-500 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
    );
  });

  return (
    <div>
      {/* 체크박스 스타일을 컴포넌트 내 style 태그에 추가 */}
      <style>
        {`
          /* 체크박스 스타일 */
          .custom-checkbox {
            appearance: none; /* 기본 체크박스 스타일 제거 */
            background-color: white; /* 체크박스 기본 배경색 */
            border: 2px solid #9ca3af; /* 체크박스 테두리 회색 */
            border-radius: 4px; /* 모서리 둥글게 */
            width: 20px; /* 체크박스 너비 */
            height: 20px; /* 체크박스 높이 */
            cursor: pointer; /* 커서 포인터로 변경 */
            position: relative;
          }

          /* 체크박스가 선택되었을 때 */
          .custom-checkbox:checked {
            background-color: #9ca3af; /* 선택되었을 때 배경색 회색 */
            border-color: #4b5563; /* 선택되었을 때 테두리 색상 */
          }

          /* 체크박스 체크 표시 스타일 */
          .custom-checkbox:checked::after {
            content: '✔'; /* 체크 모양 표시 */
            font-size: 16px; /* 체크 표시 크기 */
            color: white; /* 체크 표시 색상 */
            position: absolute;
            top: -2px; /* 체크 표시 위치 조정 */
            left: 2px; /* 체크 표시 위치 조정 */
          }
        `}
      </style>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
            <tr className="bg-gray-2 text-left">
              <th className="min-w-[50px] py-4 px-4 text-center"> {/* 체크박스 열 */}</th>
              <th className="min-w-[80px] py-4 px-4 text-center">No.</th>
              <th className="min-w-[220px] py-4 px-4 text-left">Title</th>
              <th className="min-w-[150px] py-4 px-4 text-left">Writer</th>
              <th className="py-4 px-4 text-left">Deadline</th>
              <th className="py-4 px-4 text-left">Edit/Del</th>
            </tr>
            </thead>
            <tbody>{listLI}</tbody>
          </table>
        </div>
        {!loading && (
          <PageComponent pageResponse={pageResponse} changePage={(page) => console.log('페이지 변경:', page)} />
        )}
      </div>

      {isModifyModalOpen && selectedTodo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="flex justify-end">
              <ModifyComponent todo={selectedTodo} onUpdate={handleUpdateTodo} onClose={closeModifyModal} />
            </div>
          </div>
        </div>
  )
}

{
  isDeleteModalOpen && selectedTodo && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">정말로 삭제하시겠습니까?</h2>
        <div className="flex justify-end">
          <button onClick={handleDeleteTodo} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-black rounded">
            Delete
          </button>
          <button onClick={closeDeleteModal}
                  className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded">
            Cancel
          </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default TodoListComponent;
