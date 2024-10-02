

export interface ITodo {
    mno?: number;
    title: string;
    writer: string;
    dueDate: string;
}

export interface IPageResponse {
    content: ITodo[],
    totalElements: number,
    number: number,
    first: boolean
    last: boolean
    size: number
    totalPages: number
}