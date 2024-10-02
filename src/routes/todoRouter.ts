import { lazy } from 'react';


const TodoIndex = lazy(() => import("../pages/todos/TodoIndexPage"))
const TodoList = lazy(() => import("../pages/todos/TodoListPage"))
const TodoRead = lazy(() => import("../pages/todos/TodoReadPage"))


const todoRouter = [
  {
    path: '/todo',
    title: 'TodoIndexPage',
    component: TodoIndex
  },
  {
    path: '/todo/list',
    title: 'TodoIndex',
    component: TodoList
  },
  {
    path: '/todo/read',
    title: 'TodoRead',
    component: TodoRead
  },


]

export default todoRouter