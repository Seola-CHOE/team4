import {IPageResponse, ITodo} from "../types/todo.ts";
import  axios from "axios";



const host:string ='http://localhost:8088/api/v1/todos';


export const getTodoList = async ( page?:number, size?:number): Promise<IPageResponse> => {

  const pageValue:number = page || 1
  const sizeValue:number = size || 10

  const res = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
  return res.data

}

export const postTodo  = async (todo:ITodo) : Promise<number> => {

  const res = await axios.post(`${host}`, todo)

  return res.data.mno
}

export const getOne = async (mno : number) : Promise<ITodo> => {

  const res = await axios.get(`${host}/${mno}`)

  return res.data
}