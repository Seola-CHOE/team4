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
  const res = await axios.post(`${host}`, todo); // 필요한 경우 /create, /add로 변경
  return res.data.tno; // API 응답 속성명이 tno로 가정
};

export const getOne = async (tno: number): Promise<ITodo> => {
  // 상세 조회 경로 확인 및 수정
  const res = await axios.get(`${host}/view/${tno}`); // 필요한 경우 경로 변경
  return res.data;
};
