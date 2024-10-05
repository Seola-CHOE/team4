import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPageResponse, ITodo } from "../types/todo";
import { getTodoList, updateTodo } from "../api/todoAPI"; // 서버와 통신하는 API 함수 가져오기

// 초기 상태 정의
const initialState: IPageResponse = {
    dtoList: [],
    first: false,
    last: false,
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
};

const useTodoList = () => {
    const [query] = useSearchParams(); // URL 쿼리 파라미터 가져오기
    const location = useLocation(); // 현재 URL 정보를 가져오는 훅
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    // 쿼리에서 page와 size를 숫자로 변환하여 가져옴, NaN 방지용 기본값 설정
    let page: number = Number(query.get("page")) || 1;
    let size: number = Number(query.get("size")) || 10;

    // NaN 방지 조건 추가
    if (isNaN(page)) page = 1;
    if (isNaN(size)) size = 10;

    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 관리
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState); // 페이지 응답 데이터 상태 관리

    // URL 쿼리 매개변수 설정
    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    // 특정 항목으로 이동하는 함수
    const moveToRead = (mno: number | undefined) => {
        if (mno !== undefined) {
            navigate({
                pathname: `/todo/read/${mno}`, // 선택한 할 일로 이동
                search: `?${queryStr}`, // 현재 페이지와 크기 정보를 유지
            });
        }
    };

    // 할 일 목록 데이터를 다시 불러오는 함수
    const refreshTodoList = () => {
        setLoading(true);
        getTodoList(page, size)
          .then((data) => {
              setPageResponse(data); // API 호출 성공 시 데이터 상태 업데이트
              setLoading(false); // 로딩 종료
          })
          .catch((error) => {
              console.error("Failed to refresh todo list:", error); // 오류 로그 출력
              setLoading(false); // 로딩 종료
          });
    };

    // 페이지나 쿼리 파라미터, 위치 정보가 변경될 때마다 데이터 로드
    useEffect(() => {
        refreshTodoList(); // 데이터 새로고침 시 항상 최신 데이터를 가져옴
    }, [page, size, query, location.key, navigate]); // 의존성 배열에 page와 size, query, location.key 추가

    return { loading, pageResponse, moveToRead, refreshTodoList };
};

export default useTodoList;
