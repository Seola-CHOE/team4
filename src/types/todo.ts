// ITodo: 할 일 항목의 타입 정의
export interface ITodo {
  tno: number;         // 할 일 번호
  title: string;       // 할 일 제목
  writer: string;      // 작성자
  complete: boolean;   // 완료 여부
  dueDate: string;     // 마감 날짜
}

// IPageRequestDTO: 페이지 요청 정보를 나타내는 타입 정의
export interface IPageRequestDTO {
  page: number;        // 요청한 페이지 번호
  size: number;        // 한 페이지당 항목 수
}

// IPageResponse: 페이지 응답 정보를 나타내는 타입 정의
export interface IPageResponse {
  dtoList: ITodo[];           // 할 일 목록
  pageNumList: number[];      // 전체 페이지 번호 목록
  pageRequestDTO: IPageRequestDTO;  // 페이지 요청 정보
  prev: boolean;              // 이전 페이지 존재 여부
  next: boolean;              // 다음 페이지 존재 여부
  totalCount: number;         // 전체 항목 수
  prevPage: number;           // 이전 페이지 번호
  nextPage: number;           // 다음 페이지 번호
  totalPage: number;          // 전체 페이지 수
  current: number;            // 현재 페이지 번호
}
