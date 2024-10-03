export interface ITodo {
    tno?: number;
    title: string;
    writer: string;
    dueDate: string;
}

export interface IPageResponse {
  dtoList: ITodo[],
  totalElements: number,
  number: number,
  first: boolean
  last: boolean
  size: number
  totalPages: number
}