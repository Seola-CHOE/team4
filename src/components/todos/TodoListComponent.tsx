import { useState, useEffect } from 'react';
import useTodoList from '../../hooks/useTodoList';
import { ITodo } from '../../types/todo';
import ModifyComponent from '../todos/TodoModifyComponent';
import PageComponent from '../../common/PageComponent.tsx'; // 모달 컴포넌트 가져오기
import TableThree from "../TableThree.tsx";

function TodoListComponent() {
  const { pageResponse, moveToRead } = useTodoList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (pageResponse) {
      setLoading(false); // pageResponse가 로드된 후 로딩 상태 해제
    }
  }, [pageResponse]);

  // 수정된 todo를 처리하는 함수
  const handleModify = (modifiedTodo: ITodo) => {
    console.log('수정된 todo:', modifiedTodo);

    // todo 목록 업데이트 로직
    const updatedTodos = pageResponse.content.map(todo =>
      todo.mno === modifiedTodo.mno ? modifiedTodo : todo
    );

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

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  // 중복된 mno를 가진 항목을 제거
  const uniqueMnoSet = new Set<number>();
  const uniqueTodos = pageResponse?.content ? pageResponse.content.filter((todo: ITodo) => {
    if (!uniqueMnoSet.has(todo.mno)) {
      uniqueMnoSet.add(todo.mno);
      return true;
    }
    return false;
  }) : []; // pageResponse.content가 존재할 때만 filter 호출

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[10%] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-center">NO.</th>
            <th className="min-w-[30%] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-center">TITLE</th>
            <th className="min-w-[30%] py-4 px-4 font-medium text-black dark:text-white text-center">WRITER</th>
            <th className="min-w-[30%] py-4 px-4 font-medium text-black dark:text-white text-center">DUEDATE</th>
            <th className="min-w-[30%] py-4 px-4 font-medium text-black dark:text-white text-center">MODI/DEL</th>
          </tr>
          </thead>
          <tbody>
          {uniqueTodos.map((todo: ITodo, index) => {
            const { mno, title, writer, dueDate } = todo;

            // key 값이 NaN 또는 undefined일 경우 index를 key로 사용
            const key = mno && !isNaN(mno) ? mno : `todo-${index}`;

            return (
              <tr key={key} onClick={() => mno !== undefined && moveToRead(mno)} className="bg-gray-200 hover:bg-gray-100 border-b border-gray-300">
                <td className="py-4 px-4 text-center">{mno}</td>
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

      {/* Modify Modal */}
      {isModalOpen && selectedTodo && (
        <ModifyComponent
          todo={selectedTodo}
          onClose={closeModal}
          onModify={handleModify} // handleModify 전달
        />
      )}
      {/* changePage prop 추가하여 오류 해결 */}
      <PageComponent pageResponse={pageResponse} changePage={(page) => console.log("페이지 변경:", page)} />
    </div>
  );
}

export default TodoListComponent;
