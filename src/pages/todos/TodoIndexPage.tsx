import { Navigate} from 'react-router-dom';


function TodoIndexPage() {



  return (
    <Navigate to={'/todo/list'}></Navigate>
  );

}

export default TodoIndexPage;