import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPageResponse } from "../types/todo";
import { getTodoList } from "../api/todoAPI"; // 할 일 목록을 가져오는 API 함수

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
    const [query] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    let page: number = Number(query.get("page")) || 1;
    let size: number = Number(query.get("size")) || 10;

    if (isNaN(page)) page = 1;
    if (isNaN(size)) size = 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);

    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    const moveToRead = (mno: number | undefined) => {
        if (mno !== undefined) {
            navigate({
                pathname: `/todo/read/${mno}`,
                search: `?${queryStr}`,
            });
        }
    };

    const refreshTodoList = () => {
        setLoading(true);
        getTodoList(page, size)
          .then((data) => {
              setPageResponse(data);
              setLoading(false);
          })
          .catch((error) => {
              console.error("Failed to refresh todo list:", error);
              setLoading(false);
          });
    };

    useEffect(() => {
        refreshTodoList();
    }, [page, size, query, location.key, navigate]);

    return { loading, pageResponse, moveToRead, refreshTodoList };
};

export default useTodoList;
