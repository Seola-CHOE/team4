export interface ITodo {
    tno?: number,
    title: string,
    writer: string,
    dueDate: string
  complete: boolean
}

export interface IPageRequestDTO {
  page: number,
  size: number
}

export interface IPageResponse {
  dtoList: ITodo[],
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