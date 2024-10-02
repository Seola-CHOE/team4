import axios from 'axios';
import { IProduct } from '../types/product.ts';

const host = 'http://localhost:8089/api/products';

const header = {
    headers: {
        'Content-Type': 'multipart/form-data',  // 파일 전송 형식 지정
    }
}

export const postAdd = async (formData: FormData): Promise<number> => {

    const res = await axios.post(`${host}/`, formData, header)

    return Number(res.data.result)
}

// page 처리 아직 안 됨
export const getProductList = async () => {

    const res = await axios.get(`${host}/list`)
    return res.data

}

// 이거 아님
export const getList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    return res.data

}

export const getOne = async (pno:number):Promise<IProduct> => {
    const res = await axios.get(`${host}/${pno}`)
    return res.data
}