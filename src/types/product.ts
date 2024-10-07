export interface IProductImage {
  uploadFileNames: string; // 기존 파일명을 나타내는 문자열 타입
  ord: number; // 순서
}

export interface IProduct {
  pno: number; // 제품 번호
  pname: string; // 제품 이름
  pdesc: string; // 제품 설명
  price: number; // 가격
  del_flag: boolean; // 삭제 플래그
  uploadFileNames: IProductImage[]; // 기존 IProductImage 객체 배열
}


export interface IPageRequestDTO {
  page: number,
  size: number
}

export interface IPageResponse {
  dtoList: IProduct[],
  current: number,
  prev: boolean,
  next: boolean,
  prevPage: number,
  nextPage: number,
  pageNumList: number[],
  totalCount: number,
  totalPage: number,
  pageRequestDTO: IPageRequestDTO;
}