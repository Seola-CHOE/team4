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
export const getProductList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)
    return res.data

}

// 이거 아님
export const getList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    return res.data

}
//read api
export const getOne = async (pno:number):Promise<IProduct> => {
    const res = await axios.get(`${host}/${pno}`)
    return res.data
}

// 업데이트 API
export const updateProduct = async (pno: number, formData: FormData) => {
    try {

        const response = await axios.put(`${host}/update/${pno}`, formData, header);
        return response.data;
    } catch (error) {
        console.error('Failed to update product:', error);
        throw error; // 에러 발생 시 호출한 쪽에서 처리하도록 예외던짐
    }
};

// 삭제API
export const deleteProduct = async (pno: number) => {
    try {
        const response = await axios.delete(`${host}/delete/${pno}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete product:', error);
        throw error; // 에러 발생 시 호출한 쪽에서 처리하도록 예외던짐
    }
};

//상품 등록 API
export const addProduct = async (formData: FormData) => {
    try {
        const response = await axios.post(`${host}/add`, formData, header);
        return response.data;
    } catch (error) {
        console.error('Failed to add product:', error);
        throw error; // 에러 발생 시 호출한 쪽에서 처리하도록 예외 던짐
    }
};