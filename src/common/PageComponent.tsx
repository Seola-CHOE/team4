import { ReactElement } from "react";
import { IPageResponse } from "../types/todo.ts";
import { useSearchParams } from "react-router-dom";

interface Props {
    pageResponse: IPageResponse;
    changePage: (page: number) => void;
}

// from에서 to까지의 배열 생성 함수
const makeArr = (from: number, to: number): number[] => {
    let arr: number[] = [];
    for (let i = from; i <= to; i++) {
        arr.push(i);
    }
    return arr;
};

function PageComponent({ pageResponse, changePage }: Props): ReactElement {
    // 현재 페이지와 페이징 관련 변수 계산
    const current: number = pageResponse.current + 1; // 0 기반이 아닌 1 기반으로 설정
    const tempLast: number = Math.ceil(current / 10.0) * 10;
    const startPage: number = tempLast - 9;
    const endPage: number =
      pageResponse.totalPage < tempLast ? pageResponse.totalPage : tempLast;
    const prev: boolean = startPage !== 1;
    const next: boolean = tempLast < pageResponse.totalPage;

    // 페이지 번호 배열 생성
    const pageNums: number[] = makeArr(startPage, endPage);

    const [query, setQuery] = useSearchParams();

    const handleChangePage = (pageNum: number) => {
        query.set("page", String(pageNum));
        setQuery(query);
        changePage(pageNum); // 부모 컴포넌트의 changePage 함수 호출
    };

    // 페이지 번호 리스트 렌더링
    const lis = pageNums.map((num) => (
      <li
        className="px-4 py-2 text-#64748b bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        key={`page-${num}`} // key 값을 문자열로 설정하여 고유성 보장
        onClick={() => handleChangePage(num)}
      >
          {num}
      </li>
    ));

    return (
      <div>
          <ul className="flex justify-center items-center space-x-2 mt-6">
              {/* Prev 버튼 렌더링 */}
              {prev && (
                <li
                  className="px-4 py-2 text-#64748b bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  key="prev" // key를 고유한 문자열로 설정
                  onClick={() => handleChangePage(startPage - 1)}
                >
                    Prev
                </li>
              )}

              {/* 페이지 번호 렌더링 */}
              {lis}

              {/* Next 버튼 렌더링 */}
              {next && (
                <li
                  className="px-4 py-2 text-#64748b bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  key="next" // key를 고유한 문자열로 설정
                  onClick={() => handleChangePage(endPage + 1)}
                >
                    Next
                </li>
              )}
          </ul>
      </div>
    );
}

export default PageComponent;
