import axios from 'axios';
import { IProduct } from '../types/product.ts';

const host = 'http://localhost:8089/api/products';

const header = {
    headers: {
        'Content-Type': 'multipart/form-data',  // 파일 전송 형식 지정
    }
}

// 상품 추가 API
export const postAdd = async (formData: FormData): Promise<number> => {
    const res = await axios.post(`${host}/`, formData, header);
    return Number(res.data.result);
};

// 상품 목록 조회 API (페이징)
export const getProductList = async (page: number = 1, size: number = 10) => {
    const res = await axios.get(`${host}/list?page=${page}&size=${size}`);
    return res.data;
};

// 상품 상세 조회 API
export const getOne = async (pno: number): Promise<IProduct> => {
    const res = await axios.get(`${host}/${pno}`);
    return res.data;
};

// 상품 업데이트 조회 API
export const updateProduct = async (pno: number, formData: FormData) => {
    try {
        const response = await axios.put(`${host}/${pno}`, formData, header);
        return response.data;
    } catch (error) {
        console.error('Failed to update product:', error);
        throw error; // 에러 발생 시 호출한 쪽에서 처리하도록 예외 던짐
    }
};

// 상품 삭제 API
export const deleteProduct = async (pno: number) => {
    try {
        const response = await axios.delete(`${host}/${pno}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete product:', error);
        throw error; // 에러 발생 시 호출한 쪽에서 처리하도록 예외 던짐
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