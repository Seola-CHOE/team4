// todo.ts - API 호출 관련 코드
import { IPageResponse, ITodo } from "../types/todo.ts";
import axios from "axios";

// API 서버의 기본 URL
const host: string = 'http://localhost:8089/api/todo';

// 공통 헤더 설정
const header = {
  headers: {
    'Content-Type': 'application/json',
  }
};

// Todo 리스트 조회 API (페이징)
export const getTodoList = async (page: number = 1, size: number = 10): Promise<IPageResponse> => {
  const pageValue: number = page;
  const sizeValue: number = size;

  try {
    // API 요청 URL 확인 (디버깅용)
    console.log(`Request URL: ${host}/list?page=${pageValue}&size=${sizeValue}`);

    // GET 요청으로 Todo 리스트 데이터 가져오기
    const res = await axios.get<IPageResponse>(`${host}/list?page=${pageValue}&size=${sizeValue}`, header);

    // API 응답값 확인 (디버깅용)
    console.log(`Response Data:`, res.data);

    const response = res.data;

    // totalPage가 존재하지 않거나 직접 계산이 필요한 경우 계산 (totalCount와 size로 계산)
    if (!response.totalPage) {
      response.totalPage = Math.ceil(response.totalCount / sizeValue); // 전체 페이지 수 계산
    }

    // 현재 페이지 설정 및 prev, next 값 설정
    response.current = pageValue;
    response.prev = pageValue > 1; // 현재 페이지가 1보다 크면 prev 버튼 활성화
    response.next = pageValue < response.totalPage; // 현재 페이지가 전체 페이지보다 작으면 next 버튼 활성화

    return response;
  } catch (error) {
    console.error('Failed to fetch todo list:', error);
    throw error;
  }
};

// Todo 생성 API
export const postTodo = async (todo: ITodo): Promise<number> => {
  try {
    const res = await axios.post(`${host}/`, todo, header); // POST 요청으로 Todo 생성
    return res.data.mno; // 생성된 Todo의 ID 반환
  } catch (error) {
    console.error('Failed to create todo:', error);
    throw error;
  }
};

// Todo 상세보기 API
export const getOne = async (tno: number): Promise<ITodo> => {
  try {
    const res = await axios.get<ITodo>(`${host}/${tno}`, header);
    return res.data; // Todo 상세 정보 반환
  } catch (error) {
    console.error('Failed to fetch todo detail:', error);
    throw error;
  }
};

// Todo 업데이트 API
export const updateTodo = async (tno: number, todo: ITodo): Promise<ITodo> => {
  try {
    const res = await axios.put<ITodo>(`${host}/${tno}`, todo, header);
    return res.data; // 업데이트된 Todo 정보 반환
  } catch (error) {
    console.error('Failed to update todo:', error);
    throw error;
  }
};

// Todo 삭제 API
export const deleteTodo = async (tno: number): Promise<boolean> => {
  try {
    const res = await axios.delete<{ success: boolean }>(`${host}/${tno}`, header);
    return res.data.success; // 삭제 성공 여부 반환
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw error;
  }
};
