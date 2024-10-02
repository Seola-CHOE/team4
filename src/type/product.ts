
export interface IProduct {
  pno: number;
  pname: string;
  pdesc: string;
  price: number;
  del_flag: boolean;
}

export interface IPageResponse {
  content: IProduct[],
  totalElements: number,
  number: number,
  first: boolean,
  last: boolean,
  size: number,
  totalPages: number
}