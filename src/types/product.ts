
export interface IProductImage{
  uploadFileNames: string;
  ord: number;
  // pno: number;
}

export interface IProduct {
  pno: number;
  pname: string;
  pdesc: string;
  price: number;
  del_flag: boolean;
  uploadFileNames: IProductImage[];
}

export interface IPageResponse {
  dtoList: IProduct[]; // 제품 리스트
  totalElements: number;
  number: number;
  first: boolean;
  last: boolean;
  size: number;
  totalPages: number;
  prev: boolean; // 이전 페이지 존재 여부
  next: boolean; // 다음 페이지 존재 여부
  pageNumList: number[]; // 페이지 번호 리스트
}
