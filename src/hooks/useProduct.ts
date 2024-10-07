import { useEffect, useState } from 'react';
import { IProduct } from '../types/product.ts';
import { getOne } from '../api/productAPI.ts';


const initialState: IProduct = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  uploadFileNames: [],
  del_flag: false,
};

const useProduct = (pno: string | undefined) => {
  const [product, setProduct] = useState<IProduct>(initialState);
  const [loading, setLoading] = useState(true);

  // 제품 정보를 가져오는 비동기 함수
  const fetchProduct = async () => {
    if (!pno) return;
    try {
      const productData = await getOne(parseInt(pno));
      setProduct(productData);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [pno]);

  return { product, loading, fetchProduct };
};

export default useProduct;
