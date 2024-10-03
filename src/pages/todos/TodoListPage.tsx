import TodoListComponent from '../../components/todos/TodoListComponent.tsx';
import TodoModifyComponent from '../../components/todos/TodoModifyComponent.tsx';


function TodoListPage() {
  return (
    <>
      <div>
        <div>Todo List Page</div>
      </div>


      <TodoListComponent/>
      <TodoModifyComponent/>
    </>
  );
}

export default TodoListPage;