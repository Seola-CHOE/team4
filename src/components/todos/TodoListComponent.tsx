import React, { useEffect, useState } from "react";
import useTodoList from "../../hooks/useTodoList";
import { ITodo } from "../../types/todo";
import PageComponent from "../../common/PageComponent";
import ModifyComponent from "../todos/TodoModifyComponent";
import { updateTodo } from "../../api/todoAPI"; // 서버와 통신하는 업데이트 함수 가져오기

function TodoListComponent() {
  const { pageResponse, moveToRead, loading, refreshTodoList } = useTodoList(); // useTodoList 훅 사용
  const [todos, setTodos] = useState<ITodo[]>([]); // 할 일 목록 상태
  const [isModalOpen, setModalOpen] = useState<boolean>(false); // 모달 열기 상태
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null); // 선택된 할 일

  // pageResponse가 변경될 때마다 todos 상태를 업데이트
  useEffect(() => {
    if (pageResponse && Array.isArray(pageResponse.dtoList)) {
      setTodos(pageResponse.dtoList); // pageResponse의 dtoList를 todos 상태로 설정
    }
  }, [pageResponse]);

  // 모달을 열기 위한 함수
  const openModal = (todo: ITodo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setModalOpen(false);
    setSelectedTodo(null);
  };

  // 할 일 업데이트 핸들러 (서버에 업데이트 요청)
  const handleUpdateTodo = async (updatedTodo: ITodo) => {
    try {
      await updateTodo(updatedTodo.tno as number, updatedTodo); // 서버에 업데이트 요청
      setTodos((prevTodos) => {
        const newTodos = prevTodos.map((todo) =>
          todo.tno === updatedTodo.tno ? updatedTodo : todo // 수정된 데이터를 목록에 반영
        );
        return newTodos;
      });
      refreshTodoList(); // 목록을 다시 불러와 업데이트 반영
      closeModal(); // 수정 후 모달 닫기
    } catch (error) {
      console.error("Failed to update todo:", error); // 오류 발생 시 로그 출력
    }
  };

  // 할 일 목록을 렌더링
  const listLI = todos.map((todo: ITodo) => {
    const { tno, title, writer, dueDate } = todo;

    return (
      <tr
        key={tno}
        onClick={() => moveToRead(tno)}
        className="cursor-pointer hover:bg-gray-100"
      >
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
          {/* Edit 버튼 클릭 시 모달 열기 */}
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
        {/* 페이지 컴포넌트 추가 */}
        {!loading && (
          <PageComponent
            pageResponse={pageResponse}
            changePage={(page) => console.log("Page changed to:", page)}
          />
        )}
      </div>

      {/* 수정 모달 컴포넌트 */}
      {isModalOpen && selectedTodo && (
        <ModifyComponent
          todo={selectedTodo}
          onUpdate={handleUpdateTodo} // 수정 완료 시 호출할 함수
          onClose={closeModal} // 모달 닫기 함수
        />
      )}
    </div>
  );
}

export default TodoListComponent;
