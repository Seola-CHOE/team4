import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPageResponse } from "../types/todo.ts";
import { getTodoList } from "../api/todoAPI.ts";

const initialState = {
    dtoList: [], // content를 dtoList로 변경
    first: false,
    last: false,
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
};

const useTodoList = () => {
    const [query] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    // page와 size가 NaN일 때 기본값을 설정
    let page: number = Number(query.get("page")) || 1;
    let size: number = Number(query.get("size")) || 10;

    // NaN 방지용 조건 추가
    if (isNaN(page)) page = 1;
    if (isNaN(size)) size = 10;

    const [loading, setLoading] = useState<boolean>(false);
    // @ts-ignore
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);

    // URL 쿼리 매개변수 설정
    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    // 특정 항목으로 이동하는 함수
    const moveToRead = (mno: number | undefined) => {
        if (mno !== undefined) {
            navigate({
                pathname: `/todo/read/${mno}`,
                search: `?${queryStr}`,
            });
        }
    };

    // query 또는 location.key가 변경될 때마다 실행
    useEffect(() => {
        // URL에 NaN 값이 포함되었을 때 기본값으로 설정하고 URL 수정
        if (Number.isNaN(page) || Number.isNaN(size)) {
            navigate({
                pathname: location.pathname,
                search: `?page=1&size=10`, // 기본값 설정
            });
            return;
        }

        // 데이터 로딩
        setLoading(true);
        getTodoList(page, size)
          .then((data) => {
              setPageResponse(data);
              setLoading(false);
          })
          .catch(() => setLoading(false));
    }, [page, size, query, location.key, navigate]); // 의존성 배열에 page와 size 추가

    return { loading, pageResponse, moveToRead };
};

export default useTodoList;
