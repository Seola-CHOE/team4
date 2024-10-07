// useTodoList.tsx

import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPageResponse } from "../types/todo";
import { getTodoList } from "../api/todoAPI";

// 초기 페이지 응답 상태 설정
const initialState: IPageResponse = {
    dtoList: [],
    current: 0, // 페이지 번호를 current로 명명하여 가독성 향상
    prev: false,
    next: false,
    prevPage: 0,
    nextPage: 0,
    totalCount: 0,
    totalPage: 0, // totalPage는 0으로 초기화
    pageNumList: [],
    pageRequestDTO: { page: 0, size: 10 },
};

const useTodoList = () => {
    const [query] = useSearchParams();
    const navigate = useNavigate();

    // 페이지 및 사이즈 값을 query에서 가져오고, 유효하지 않을 경우 기본값 설정
    let page: number = Number(query.get("page")) || 1;
    let size: number = Number(query.get("size")) || 10;

    if (isNaN(page) || page < 1) page = 1; // 페이지 값이 유효하지 않으면 1로 설정
    if (isNaN(size) || size < 1) size = 10; // 사이즈 값이 유효하지 않으면 10으로 설정

    // 상태 관리: 로딩 상태, 페이지 응답 데이터
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);

    // 할 일 읽기 페이지로 이동하는 함수
    const moveToRead = (tno: number | undefined) => {
        if (tno !== undefined) {
            navigate({
                pathname: `/todo/read/${tno}`,
                search: `?page=${page}&size=${size}`, // 현재 페이지와 사이즈를 URL에 유지
            });
        }
    };

    // 할 일 목록을 새로고침하는 함수
    const refreshTodoList = () => {
        setLoading(true);
        getTodoList(page, size)
          .then((data) => {
              // 응답 데이터를 사용하여 총 페이지 수를 계산
              const totalPage = Math.ceil(data.totalCount / size);
              const newPageResponse = { ...data, totalPage }; // totalPage를 계산된 값으로 설정

              setPageResponse(newPageResponse); // API 응답 데이터를 상태로 설정
              setLoading(false);
          })
          .catch((error) => {
              console.error("Failed to refresh todo list:", error);
              setLoading(false); // 에러 발생 시 로딩 상태 해제
          });
    };

    // 페이지 또는 사이즈가 변경될 때마다 할 일 목록을 새로고침
    useEffect(() => {
        refreshTodoList();
    }, [page, size]); // page와 size만 의존성 배열로 지정하여 필요할 때만 재호출

    // 페이지 변경 함수 (페이지 이동 및 목록 새로고침)
    const changePage = (newPage: number) => {
        if (newPage !== page) {
            query.set("page", String(newPage));
            navigate({
                search: `?${createSearchParams(query)}`,
            });
        }
    };

    return { loading, pageResponse, moveToRead, refreshTodoList, changePage };
};

export default useTodoList;
