export interface IProduct {
    pno?: number;
    pdesc: string;
    pname: string;
    price: string;
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