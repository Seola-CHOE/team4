import {  Outlet } from 'react-router-dom';
import TodoListPage from './TodoListPage.tsx';


function TodoIndexPage() {
  return (
    <div>
      <div>Todo Index Page</div>

      <div><Outlet>
        <TodoListPage/>

      </Outlet></div>

    </div>
  );
}

export default TodoIndexPage;