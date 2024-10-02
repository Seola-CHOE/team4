import useTodoList from '../../hooks/useTodoList';
import { ITodo } from '../../types/todo';

function TodoListComponent() {
  const { pageResponse, moveToRead } = useTodoList();

  // Set을 사용하여 중복된 mno를 가진 항목을 제거
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
          <table className="w-full table-auto">
            <thead>
            <tr className="bg-gray-200"> {/* 헤더 배경색 회색 */}
              <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">제목</th>
              <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">작가</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">날짜</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">작업</th>
            </tr>
            </thead>
            <tbody>
            {uniqueTodos.map((todo: ITodo) => {
              const { mno, title, writer, dueDate } = todo;

              return (
                <tr key={mno} onClick={() => moveToRead(mno)} className="hover:bg-gray-100"> {/* 클릭 시 색상 변경 */}
                  <td className="py-4 px-4">{title}</td>
                  <td className="py-4 px-4">{writer}</td>
                  <td className="py-4 px-4">{dueDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">👁️</button>
                      <button className="text-red-500 hover:text-red-700">🗑️</button>
                      <button className="text-gray-500 hover:text-gray-700">⬇️</button>
                    </div>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TodoListComponent;
