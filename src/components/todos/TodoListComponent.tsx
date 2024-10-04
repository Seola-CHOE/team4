// TodoListComponent.tsx

import useTodoList from "../../hooks/useTodoList.tsx";
import PageComponent from '../../common/PageComponent.tsx';

function TodoListComponent() {
  const { pageResponse, moveToRead, loading, page, setPage } = useTodoList();

  // 데이터 로딩 중일 때 표시할 내용
  if (loading) {
    return <div>Loading...</div>;
  }

  // pageResponse와 dtoList가 정의되어 있는지 확인
  if (!pageResponse || !Array.isArray(pageResponse.dtoList)) {
    return <div>No data available</div>;
  }

  // 데이터가 없을 때 "No data available" 메시지 표시
  if (pageResponse.dtoList.length === 0) {
    return <div>No data available</div>;
  }

  // 데이터 확인을 위한 console.log 출력
  console.log("Page Response:", pageResponse);
  console.log("DTO List:", pageResponse?.dtoList);

  // Todo 리스트를 렌더링
  const listItems = pageResponse.dtoList.map((todo, idx) => {
    const { tno, title, writer, dueDate } = todo;

    // key 값으로 tno가 유효한지 확인하고, 유효하지 않으면 idx를 사용하여 고유한 값 설정
    const key = tno !== undefined && !isNaN(tno) ? `todo-${tno}` : `todo-${idx}`;

    return (
      <tr
        key={key} // 고유한 key 값 설정
        onClick={() => {
          // tno가 유효할 때만 함수 호출
          if (tno !== undefined) moveToRead(tno);
        }}
        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
          <h5 className="font-medium text-black dark:text-white">{tno !== undefined ? tno : 'N/A'}</h5>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="text-black dark:text-white">{title}</p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="text-black dark:text-white">{writer}</p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="text-black dark:text-white">
            {dueDate ? new Date(dueDate).toLocaleDateString() : 'No due date'}
          </p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <button className="text-blue-500 hover:text-blue-700">Modi/Del</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 justify-center text-black dark:text-white xl:pl-11">
              No.
            </th>
            <th className="min-w-[220px] py-4 px-4 justify-center text-black dark:text-white xl:pl-11">
              Title
            </th>
            <th className="min-w-[150px] py-4 px-4 justify-center text-black dark:text-white">
              Writer
            </th>
            <th className="py-4 px-4 justify-center text-black dark:text-white">
              Due Date
            </th>
            <th className="py-4 px-4 justify-center text-black dark:text-white">
              Modi/Del
            </th>
          </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
      {/* PageComponent에 필요한 prop 전달 */}
      <PageComponent pageResponse={pageResponse} changePage={setPage} currentPage={page} />
    </div>
  );
}

export default TodoListComponent;
