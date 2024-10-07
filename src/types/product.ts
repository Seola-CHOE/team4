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