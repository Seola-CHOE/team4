import React, { useState } from 'react';
import useTodoList from '../../hooks/useTodoList';
import { ITodo } from '../../types/todo';
import ModifyComponent from '../todos/TodoModifyComponent'; // 모달 컴포넌트 가져오기

function TodoListComponent() {
  const { pageResponse, moveToRead } = useTodoList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  // 수정된 todo를 처리하는 함수
  const handleModify = (modifiedTodo: ITodo) => {
    console.log('수정된 todo:', modifiedTodo);

    // todo 목록 업데이트 로직
    const updatedTodos = pageResponse.content.map(todo =>
      todo.mno === modifiedTodo.mno ? modifiedTodo : todo
    );

    // 여기서 상태를 업데이트하는 방법에 따라 적절히 업데이트하세요
    // 예: setTodos(updatedTodos); // useState로 관리하는 경우

    setIsModalOpen(false); // 모달 닫기
    setSelectedTodo(null); // 선택된 todo 초기화
  };

  const openModifyModal = (todo: ITodo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  // 중복된 mno를 가진 항목을 제거
  const uniqueMnoSet = new Set<number>();
  const uniqueTodos = pageResponse.content.filter((todo: ITodo) => {
    if (!uniqueMnoSet.has(todo.mno)) {
      uniqueMnoSet.add(todo.mno);
      return true;
    }
    return false;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
            <tr className="bg-gray-300">
              <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 border-b border-gray-300 text-center">제목</th>
              <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 border-b border-gray-300 text-center">작가</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white border-b border-gray-300 text-center">날짜</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white border-b border-gray-300 text-center">작업</th>
            </tr>
            </thead>
            <tbody>
            {uniqueTodos.map((todo: ITodo) => {
              const { mno, title, writer, dueDate } = todo;

              return (
                <tr key={mno} onClick={() => moveToRead(mno)} className="bg-gray-200 hover:bg-gray-100 border-b border-gray-300">
                  <td className="py-4 px-4 text-center">{title}</td>
                  <td className="py-4 px-4 text-center">{writer}</td>
                  <td className="py-4 px-4 text-center">{dueDate}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 차단
                          openModifyModal(todo); // 수정 모달 열기
                        }}
                      >
                        Modify
                      </button>
                      <div>/</div>
                      <button className="text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modify Modal */}
      {isModalOpen && selectedTodo && (
        <ModifyComponent
          todo={selectedTodo}
          onClose={closeModal}
          onModify={handleModify} // handleModify 전달
        />
      )}
    </div>
  );
}

export default TodoListComponent;
