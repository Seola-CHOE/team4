import { lazy } from 'react';


const Todo = lazy(() => import("../pages/Todo.tsx"))
const TodoRead = lazy(() => import("../pages/todos/TodoReadPage"))
const TodoAdd = lazy(() => import("../pages/todos/TodoAddPage"))
const Todolist  = lazy(() => import("../pages/todos/TodoListPage"))


const todoRouter = [
  {
    path: '/todo',
    title: 'Todo',
    component: Todo
  },
  {
    path: '/todo/list',
    title: 'TodoIndex',
    component: Todolist
  },
  {
    path: '/todo/read/:tno',
    title: 'TodoRead',
    component: TodoRead
  },
  {
    path: '/todo/add',
    title: 'TodoAdd',
    component: TodoAdd
  }


]

export default todoRouter