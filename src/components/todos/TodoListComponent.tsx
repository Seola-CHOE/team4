import useTodoList from "../../hooks/useTodoList.ts";
import { ITodo } from "../../types/todo.ts";
import PageComponent from '../../common/PageComponent.tsx';

function TodoListComponent() {
  const { pageResponse, moveToRead } = useTodoList();

  // pageResponse와 content가 정의되어 있는지 확인
  if (!pageResponse || !Array.isArray(pageResponse.dtoList)) {
    return <div>Loading...</div>; // 로딩 중 메시지 또는 스피너 표시
  }

  const listLI = pageResponse.dtoList.map((todo: ITodo) => {
    const { tno, title, writer, dueDate } = todo;

    return (
      <tr
        key={tno}
        onClick={() => moveToRead(tno)}
        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
          <h5 className="font-medium text-black dark:text-white">{tno}</h5>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="text-black dark:text-white">{title}</p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="text-black dark:text-white">{writer}</p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <p className="text-black dark:text-white">
            {new Date(dueDate).toLocaleDateString()}
          </p>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <button className="text-blue-500 hover:text-blue-700">Edit/Delete</button>
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
          <tbody>{listLI}</tbody>
        </table>
      </div>
      <PageComponent pageResponse={pageResponse} />
    </div>
  );
}

export default TodoListComponent;
