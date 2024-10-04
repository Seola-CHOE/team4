import TodoListComponent from '../../components/todos/TodoListComponent.tsx';
import { Link } from 'react-router-dom';


function TodoListPage() {
  return (
    <>
      <div className='flex items-center gap-3 justify-center border-2 rounded-2xl h-1/4 bg-blue-500'>
        <Link to='/todo/list' className='font-extrabold m-2 p-2 text-graydark text-2xl'>List</Link>
        <Link to='/todo/add' className='font-extrabold m-2 p-2 text-graydark text-2xl'>Add</Link>
      </div>
      <div>
        <div>Todo List Page</div>
      </div>


      <TodoListComponent />

    </>
  );
}

export default TodoListPage;