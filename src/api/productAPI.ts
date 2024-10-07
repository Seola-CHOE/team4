import axios from 'axios';
import { IProduct } from '../types/product.ts';

const host = 'http://localhost:8089/api/products';

// 공통 헤더 설정
const header = {
    headers: {
        'Content-Type': 'multipart/form-data',  // 파일 전송 형식 지정
    }
};

// 상품 추가 API
export const postAdd = async (formData: FormData): Promise<number> => {
    try {
        const res = await axios.post(`${host}/`, formData, header);
        return Number(res.data.result);
    } catch (error) {
        console.error('Failed to add product:', error);
        throw error;
    }
};

// 상품 목록 조회 API (페이징)
export const getProductList = async (page: number = 1, size: number = 10) => {
    try {
        const res = await axios.get(`${host}/list?page=${page}&size=${size}`, header);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch product list:', error);
        throw error;
    }
};

// 상품 상세 조회 API
export const getOne = async (pno: number): Promise<IProduct> => {
    try {
        const res = await axios.get<IProduct>(`${host}/${pno}`, header);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch product detail:', error);
        throw error;
    }
};

// 상품 업데이트 조회 API
export const updateProduct = async (pno: number, formData: FormData) => {
    try {
        const res = await axios.put(`${host}/${pno}`, formData, header);
        return res.data;
    } catch (error) {
        console.error('Failed to update product:', error);
        throw error;
    }
};

// 상품 삭제 API
export const deleteProduct = async (pno: number) => {
    try {
        const res = await axios.delete(`${host}/${pno}`, header);
        return res.data;
    } catch (error) {
        console.error('Failed to delete product:', error);
        throw error;
    }
};

// 상품 등록 API
export const addProduct = async (formData: FormData) => {
    try {
        const res = await axios.post(`${host}/add`, formData, header);
        return res.data;
    } catch (error) {
        console.error('Failed to add product:', error);
        throw error;
    }
};
