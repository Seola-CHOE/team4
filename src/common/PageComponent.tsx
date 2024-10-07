// PageComponent.tsx

import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPageResponse } from "../types/todo";

interface Props {
  pageResponse: IPageResponse;
  changePage: (page: number) => void; // 부모 컴포넌트에서 페이지 변경 함수 전달받음
}

function PageComponent({ pageResponse, changePage }: Props): ReactElement {
  // 페이지네이션 상태를 관리할 변수를 선언
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [totalPageCount, setTotalPageCount] = useState<number>(0); // 총 페이지 수
  const [startPage, setStartPage] = useState<number>(1); // 현재 페이지 그룹의 첫 번째 페이지
  const [endPage, setEndPage] = useState<number>(10); // 현재 페이지 그룹의 마지막 페이지
  const [prevButtonVisible, setPrevButtonVisible] = useState<boolean>(false); // Prev 버튼 활성화 여부
  const [nextButtonVisible, setNextButtonVisible] = useState<boolean>(false); // Next 버튼 활성화 여부
  const [pageNumbers, setPageNumbers] = useState<number[]>([]); // 현재 페이지 그룹의 페이지 번호 리스트

  const [query, setQuery] = useSearchParams();

  // 페이지네이션 관련 상태를 설정하는 함수
  const updatePagination = () => {
    // 현재 페이지와 총 페이지 수 설정
    const current: number = pageResponse.current || 1;
    const totalPage: number = pageResponse.totalPage || 1;

    // 현재 페이지 그룹의 마지막 페이지 계산
    const tempLastPage: number = Math.ceil(current / 10) * 10;

    // 현재 페이지 그룹의 첫 번째 페이지
    const tempStartPage: number = tempLastPage - 9;

    // 마지막 페이지가 총 페이지 수보다 큰 경우 총 페이지 수로 설정
    const finalEndPage: number = totalPage < tempLastPage ? totalPage : tempLastPage;

    // 이전 페이지 그룹으로 이동할 수 있는지 여부 확인
    const showPrevButton: boolean = current > 1;

    // 다음 페이지 그룹으로 이동할 수 있는지 여부 확인
    const showNextButton: boolean = current < totalPage;

    // 현재 페이지 그룹의 페이지 번호 리스트 생성
    const pageNums = Array.from({ length: finalEndPage - tempStartPage + 1 }, (_, index) => tempStartPage + index);

    // 상태 업데이트
    setCurrentPage(current);
    setTotalPageCount(totalPage);
    setStartPage(tempStartPage);
    setEndPage(finalEndPage);
    setPrevButtonVisible(showPrevButton);
    setNextButtonVisible(showNextButton);
    setPageNumbers(pageNums);
  };

  // 페이지네이션 상태 업데이트 (페이지 응답 데이터 변경 시)
  useEffect(() => {
    updatePagination();
  }, [pageResponse]);

  // 페이지 번호 변경 핸들러
  const handleChangePage = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPageCount) return;

    // Query의 page 설정 및 상태 업데이트
    query.set("page", String(pageNum));
    setQuery(query);

    // 부모 컴포넌트의 페이지 변경 함수 호출 (새 데이터 로드)
    changePage(pageNum);
  };

  return (
    <div>
      {/* 페이지네이션 버튼들을 렌더링 */}
      <ul className="flex justify-center items-center space-x-2 mt-6">
        {/* Prev 버튼 렌더링 */}
        {prevButtonVisible && (
          <li
            className="px-4 py-2 text-white bg-primary border border-primary rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all ease-in-out duration-300"
            key="prev" // key 값은 고유한 문자열로 설정
            onClick={() => handleChangePage(currentPage - 1)} // 이전 페이지로 이동
          >
            Prev
          </li>
        )}

        {/* 페이지 번호 리스트 렌더링 */}
        {pageNumbers.map((num) => (
          <li
            className={`px-4 py-2 ${num === currentPage ? 'bg-primary' : 'bg-primary'} text-white border border-primary rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300`}
            key={num}
            onClick={() => handleChangePage(num)} // 각 페이지 번호 클릭 시 해당 페이지로 이동
          >
            {num}
          </li>
        ))}

        {/* Next 버튼 렌더링 */}
        {nextButtonVisible && (
          <li
            className="px-4 py-2 text-white bg-primary border border-primary rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all ease-in-out duration-300"
            key="next" // key 값은 고유한 문자열로 설정
            onClick={() => handleChangePage(currentPage + 1)} // 다음 페이지로 이동
          >
            Next
          </li>
        )}
      </ul>
    </div>
  );
}

export default PageComponent;
