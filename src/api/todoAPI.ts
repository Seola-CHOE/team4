import { IPageResponse, ITodo } from "../types/todo.ts";
import axios from "axios";

// host URL의 슬래시 제거
const host: string = 'http://localhost:8089/api/todo';

export const getTodoList = async (page?: number, size?: number): Promise<IPageResponse> => {
  const pageValue: number = page || 1;
  const sizeValue: number = size || 10;

  // 요청 URL과 응답 로그 확인
  console.log(`Request URL: ${host}/list?page=${pageValue}&size=${sizeValue}`);
  const res = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`);
  console.log(`Response Data:`, res.data);

  return res.data;
};

export const postTodo = async (todo: ITodo): Promise<number> => {
// 등록 경로 확인 및 수정
  const res = await axios.post(`${host}/`, todo); // 필요한 경우 /create, /add로 변경
  return res.data.mno;
};


// Todo 상세보기 API
export const getOne = async (tno: number): Promise<ITodo> => {
  const res = await axios.get<ITodo>(`${host}/${tno}`);
  return res.data;
};

// Todo 업데이트 API
export const updateTodo = async (tno: number, todo: ITodo): Promise<ITodo> => {
  const res = await axios.put<ITodo>(`${host}/${tno}`, todo);
  return res.data;
};

// Todo 삭제 API
export const deleteTodo = async (tno: number): Promise<boolean> => {
  const res = await axios.delete<{ success: boolean }>(`${host}/${tno}`);
  return res.data.success;
};