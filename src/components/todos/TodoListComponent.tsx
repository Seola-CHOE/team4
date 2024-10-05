import React, { useEffect, useState } from "react";
import useTodoList from "../../hooks/useTodoList";
import { ITodo } from "../../types/todo";
import PageComponent from "../../common/PageComponent";
import ModifyComponent from "../todos/TodoModifyComponent";

function TodoListComponent() {
  const { pageResponse, moveToRead, loading } = useTodoList(); // useTodoList 훅 사용
  const [todos, setTodos] = useState<ITodo[]>([]); // 할 일 목록 상태

  // pageResponse가 변경될 때마다 todos 상태를 업데이트
  useEffect(() => {
    console.log("pageResponse:", pageResponse); // pageResponse 데이터 확인
    if (pageResponse && Array.isArray(pageResponse.dtoList)) {
      setTodos(pageResponse.dtoList); // pageResponse의 dtoList를 todos 상태로 설정
    }
  }, [pageResponse]);

  const openModal = (todo: ITodo) => {
    // 모달 열기 로직 (생략)
  };

  const closeModal = () => {
    // 모달 닫기 로직 (생략)
  };

  const handleUpdateTodo = (updatedTodo: ITodo) => {
    // 할 일 업데이트 로직 (생략)
  };

  const handleDeleteTodo = (tno: number) => {
    // 할 일 삭제 로직 (생략)
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
          <button onClick={(e) => e.stopPropagation()} className="text-blue-500 hover:text-blue-700">
            Edit/Delete
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
        {!loading && <PageComponent pageResponse={pageResponse} changePage={(page) => console.log("Page changed to:", page)} />}
      </div>
    </div>
  );
}

export default TodoListComponent;
