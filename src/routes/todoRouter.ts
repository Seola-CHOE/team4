import { lazy } from 'react';


const TodoIndex = lazy(() => import("../pages/todos/TodoIndexPage"))
const TodoRead = lazy(() => import("../pages/todos/TodoReadPage"))
const TodoAdd = lazy(() => import("../pages/todos/TodoAddPage"))


const todoRouter = [
  {
    path: '/todo',
    title: 'TodoIndexPage',
    component: TodoIndex
  },
  {
    path: '/todo/list',
    title: 'TodoIndex',
    component: TodoIndex
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