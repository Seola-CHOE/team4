import { Navigate} from 'react-router-dom';
import TodoListPage from './TodoListPage.tsx';


function TodoIndexPage() {
  return (
    <div>
      <div>Todo Index Page</div>

      <div><TodoListPage/></div>



      <Navigate to={'/todo'}></Navigate>

    </div>


  );
}

export default TodoIndexPage;