import React, { useEffect, useState } from 'react';
import useTodoList from '../../hooks/useTodoList';
import { ITodo } from '../../types/todo';
import PageComponent from '../../common/PageComponent';
import ModifyComponent from '../todos/TodoModifyComponent';
import { updateTodo } from '../../api/todoAPI';

function TodoListComponent() {
  const { pageResponse, moveToRead, loading, refreshTodoList } = useTodoList();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    if (pageResponse && Array.isArray(pageResponse.dtoList)) {
      setTodos(pageResponse.dtoList);
    }
  }, [pageResponse]);

  const openModal = (todo: ITodo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTodo(null);
  };

  // 할 일 업데이트 핸들러
  const handleUpdateTodo = async (updatedTodo: ITodo) => {
    try {
      console.log('Before Update:', updatedTodo);
      await updateTodo(updatedTodo.tno as number, updatedTodo); // 서버에 업데이트 요청

      // todos 상태를 업데이트하여 수정된 writer를 반영
      setTodos((prevTodos) => {
        return prevTodos.map((todo) =>
          todo.tno === updatedTodo.tno ? { ...todo, writer: updatedTodo.writer, title: updatedTodo.title } : todo
        );
      });

      closeModal(); // 수정 후 모달 닫기
    } catch (error) {
      console.error('Failed to update todo:', error);
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
              e.stopPropagation(); // 이벤트 버블링 방지
              openModal(todo); // 모달 열기
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
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
              <th className="min-w-[220px] py-4 px-4">Title</th>
              <th className="min-w-[150px] py-4 px-4">Writer</th>
              <th className="py-4 px-4">Due Date</th>
              <th className="py-4 px-4">Modi/Del</th>
            </tr>
            </thead>
            <tbody>{listLI}</tbody>
          </table>
        </div>
        {!loading && <PageComponent pageResponse={pageResponse} changePage={(page) => console.log('Page changed to:', page)} />}
      </div>

      {/* 수정 모달 컴포넌트 */}
      {isModalOpen && selectedTodo && (
        <ModifyComponent todo={selectedTodo} onUpdate={handleUpdateTodo} onClose={closeModal} />
      )}
    </div>
  );
}

export default TodoListComponent;
