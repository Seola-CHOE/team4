import { useEffect, useState } from 'react';
import useTodoList from '../../hooks/useTodoList';
import { ITodo } from '../../types/todo';
import PageComponent from '../../common/PageComponent';
import ModifyComponent from '../todos/TodoModifyComponent';
import { updateTodo, deleteTodo } from '../../api/todoAPI';

function TodoListComponent() {
  const { pageResponse, moveToRead, loading } = useTodoList();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isModifyModalOpen, setModifyModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

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

  // 할 일 업데이트 핸들러
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

  // 할 일 삭제 핸들러
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

  const listLI = todos.map((todo: ITodo) => {
    const { tno, title, writer, dueDate } = todo;

    return (
      <tr key={tno} onClick={() => moveToRead(tno)} className="cursor-pointer hover:bg-gray-100">
        <td className="border-b border-[#eee] py-5 px-4 pl-9">
          <h5 className="font-medium text-black">{tno}</h5>
        </td>
        <td className="border-b border-[#eee] py-5 px-4">
          <p className="text-black">{title}</p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4">
          <p className="text-black">{writer}</p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4">
          <p className="text-black">{new Date(dueDate).toLocaleDateString()}</p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModifyModal(todo);
            }}
            className="text-blue-500 hover:text-blue-700 mr-3"
          >
            수정
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal(todo);
            }}
            className="text-red-500 hover:text-red-700"
          >
            삭제
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
            <tr className="bg-gray-2 text-left">
              <th className="min-w-[220px] py-4 px-4">No.</th>
              <th className="min-w-[220px] py-4 px-4">제목</th>
              <th className="min-w-[150px] py-4 px-4">작성자</th>
              <th className="py-4 px-4">기한</th>
              <th className="py-4 px-4">수정/삭제</th>
            </tr>
            </thead>
            <tbody>{listLI}</tbody>
          </table>
        </div>
        {!loading && <PageComponent pageResponse={pageResponse} changePage={(page) => console.log('페이지 변경:', page)} />}
      </div>

      {/* 수정 모달 컴포넌트 */}
      {isModifyModalOpen && selectedTodo && (
        <ModifyComponent todo={selectedTodo} onUpdate={handleUpdateTodo} onClose={closeModifyModal} />
      )}

      {/* 삭제 확인 모달 컴포넌트 */}
      {isDeleteModalOpen && selectedTodo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">정말로 삭제하시겠습니까?</h2>
            <div className="flex justify-end">
              <button
                onClick={closeDeleteModal}
                className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
              >
                삭제
              </button>
              <button
                onClick={handleDeleteTodo}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-black rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoListComponent;