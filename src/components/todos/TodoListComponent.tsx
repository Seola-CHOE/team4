import { ITodo } from '../../types/todo.ts';
import useTodoList from '../../hooks/useTodoList.ts';
import TableThree from "../TableThree.tsx";


function TodoListComponent() {

  const { pageResponse,moveToRead} = useTodoList()

  const listLI = pageResponse.content.map( (todo:ITodo)=> {

    const {mno, title, writer, dueDate} = todo

    return(
      <li key={mno} onClick={() => moveToRead(mno)}>
        {mno} - {title} - {writer} - {dueDate}
      </li>
    )

  })

  return (

    <div>

      <div>
        TodoListComponent
      </div>

      <ul>{listLI}</ul>

    <TableThree pageResponse={pageResponse}/>

    </div>
  );
}

export default TodoListComponent;