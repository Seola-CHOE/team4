import { Navigate} from 'react-router-dom';
import TodoListPage from './TodoListPage.tsx';


function TodoIndexPage() {
  return (
    <div>
      {/*보기에 안예뻐서 주석 처리함*/}
      {/*<div>Todo Index Page</div>*/}

      <div><TodoListPage/></div>



      <Navigate to={'/todo'}></Navigate>

    </div>


  );
}

export default TodoIndexPage;