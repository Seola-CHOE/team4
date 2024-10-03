import {ITodo} from "../types/todo.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOne} from "../api/todoAPI.ts";
import LoadingComponent from "./common/LoadingComponent.tsx";

const initialState:ITodo ={
  mno:0,
  title:'',
  writer:'',
  dueDate:''
}


function TodoReadComponent() {

  const {mno} = useParams()

  const [todo, setTodo]=useState(initialState)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
      const mnoNum = Number(mno)
      setLoading(true)
      getOne(mnoNum).then(result => {
        setTodo(result)
        setLoading(false)
      })
    },[mno]
  )

  return (
    <div>
      {loading && <LoadingComponent></LoadingComponent>}
      <div>Todo Read Component</div>
      <div>{mno}</div>
      <div>{todo.title}</div>
    </div>
  );

}

export default TodoReadComponent;