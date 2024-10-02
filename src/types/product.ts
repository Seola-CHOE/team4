
export interface IProductImage{
  uploadFileNames: string;
  ord: number;
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
  content: IProduct[],
  totalElements: number,
  number: number,
  first: boolean
  last: boolean
  size: number
  totalPages: number
}
