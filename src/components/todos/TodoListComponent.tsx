import useTodoList from "../../hooks/useTodoList.tsx";
import { ITodo } from "../../types/todo.ts";
import PageComponent from '../../common/PageComponent.tsx';
import { useEffect, useState } from "react";
import ModifyComponent from '../todos/TodoModifyComponent.tsx'; // ModifyComponent 임포트

function TodoListComponent() {
  const { pageResponse, moveToRead } = useTodoList();
  const [todos, setTodos] = useState<ITodo[]>(pageResponse.dtoList || []);
  const [isModalOpen, setModalOpen] = useState(false);
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

  const handleUpdateTodo = (updatedTodo: ITodo) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.tno === updatedTodo.tno ? updatedTodo : todo))
    );
    closeModal();
  };

  const handleDeleteTodo = (tno: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.tno !== tno));
    closeModal();
  };

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
          <button onClick={(e) => { e.stopPropagation(); openModal(todo); }} className="text-blue-500 hover:text-blue-700">Edit/Delete</button>
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
        <PageComponent pageResponse={pageResponse} />
      </div>

      {isModalOpen && selectedTodo && (
        <ModifyComponent
          todo={selectedTodo}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default TodoListComponent;
