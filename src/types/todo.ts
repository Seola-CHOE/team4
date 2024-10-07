

export interface ITodo {
  tno?: number; // 할 일 번호 (선택적 속성)
  title: string; // 할 일 제목
  writer: string; // 작성자
  dueDate: string; // 마감 날짜
  complete: boolean; // 완료 여부
}

export interface IPageRequestDTO {
  page: number; // 페이지 번호
  size: number; // 페이지 크기 (한 페이지에 표시할 항목 수)
}

export interface IPageResponse {
  dtoList: ITodo[]; // 할 일 데이터 목록
  current: number; // 현재 페이지 인덱스 (1-based)
  prev: boolean; // 이전 페이지가 있는지 여부
  next: boolean; // 다음 페이지가 있는지 여부
  prevPage: number; // 이전 페이지 번호
  nextPage: number; // 다음 페이지 번호
  pageNumList: number[]; // 전체 페이지 번호 리스트
  totalCount: number; // 전체 항목 수
  totalPage: number; // 총 페이지 수 (1-based)
  pageRequestDTO: IPageRequestDTO; // 페이지 요청 데이터
}
